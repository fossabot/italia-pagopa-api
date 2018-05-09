import * as fetch from "node-fetch";
import * as promise from "es6-promise";
import * as fs from "file-system";

const host = "https://acardste.vaservices.eu:1443";
const basePath = "/pp-restapi/v1";
var SESSION_TOKEN: string;

class UsersController {

  startSession(email: string) {
    //ssr: StartSessionRequest
    const url = host + basePath + "/users/actions/start-session";

    let form = {
      data: {
        email: email //ssr.data.email
        //"idPayment": ssr.data.idPayment
      }
    };

    return new Promise(function(resolve, reject) {
      fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Cache: "no-cache"
        },
        body: JSON.stringify(form),
        credentials: "include"
      })
        .then(response => response.json())
        .then(function(data) {
          SESSION_TOKEN = data["data"]["sessionToken"];
          if (SESSION_TOKEN != "undefined") {
            resolve(SESSION_TOKEN);
          } else {
            reject("token non valido");
          }
        })
        .catch(error => console.error(error));
    });
  }

  login(username: string, password: string) {
    const url = host + basePath + "/users/actions/login";
    return new Promise(function(resolve, reject) {
      let form = {
        data: {
          // "loginFromSSO": l.loginFromSSO,
          username: username, //l.username
          password: password //l.password
        }
      };

      fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + SESSION_TOKEN,
          Cache: "no-cache"
        },
        body: JSON.stringify(form),
        credentials: "include"
      })
        .then(response => response.json())
        .then(function(data) {
          SESSION_TOKEN = data["data"]["sessionToken"];
          console.log(data["data"]["user"]["cellphone"]);
          fs.writeFileSync("sessionToken.txt", SESSION_TOKEN, function(err) {
            console.log(err);
          });
          if (SESSION_TOKEN != "undefined") {
            resolve(String(SESSION_TOKEN));
          } else {
            reject("token non valido");
          }
        })
        .catch(error => console.error(error));
    });
  }

  loginAnonymus(email: string, idPayment: string) {
    const url = host + basePath + "/users/actions/start-session";

    let form = {
      data: {
        email: email, //ssr.data.email
        idPayment: idPayment //ssr.data.idPayment
      }
    };

    return new Promise(function(resolve, reject) {
      fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          //"Authorization": "Bearer " + this.token,
          Cache: "no-cache"
        },
        body: JSON.stringify(form),
        credentials: "include"
      })
        .then(response => response.json())
        .then(function(data) {
          SESSION_TOKEN = data["data"]["sessionToken"];
          if (SESSION_TOKEN != "undefined") {
            //console.log(sessionToken);
            resolve();
          } else {
            reject("token non valido");
          }
        })
        .catch(error => console.error(error));
    });
  }

  approveTermsRequest(privacy: boolean, terms: boolean) {
    const url = host + basePath + "/users/actions/approve-terms";

    let form = {
      data: {
        privacy: true, //ssr.data.email
        terms: true //ssr.data.idPayment
      }
    };

    return new Promise(function(resolve, reject) {
      fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + SESSION_TOKEN,
          Cache: "no-cache"
        },
        body: JSON.stringify(form),
        credentials: "include"
      })
        .then(response => response.json())
        .then(function(data) {
          console.log(data);
          if (data != "undefined") {
            resolve(data);
          } else {
            reject("ERROR ERROR");
          }
        })
        .catch(error => console.error(error));
    });
  }

  getUserInfo() {
    console.log("*** USER INFO ***");

    const url = host + basePath + "/users";

    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + SESSION_TOKEN,
        Cache: "no-cache"
      },
      credentials: "include"
    })
      .then(response => response.json())
      .then(function(data) {
        console.log(data);
        return data;
      })
      .catch(error => console.error(error));
  }

  logout() {
    console.log("*** LOGOUT ***");

    const url = host + basePath + "/users/actions/logout";

    //return new Promise(function (resolve, reject) {
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + SESSION_TOKEN,
        Cache: "no-cache"
      },
      credentials: "include"
    }).catch(error => console.error(error));
  }
}


export = UsersController;

//startSession("davidedimeco@gmail.com").then(login.bind("", "DavideDM01", "cocacolaenjoy")).then(function(data){console.log(data)});
//approveTermsRequest(true, true);

let uc: UsersController = new UsersController();

uc.startSession("davidedimeco@gmail.com").
then(uc.login.bind("", "DavideDM01", "cocacolaenjoy")).then(function(data){console.log(String(data));})

  //.then(uc.getUserInfo.bind(""));
