import * as fetch from "node-fetch";
import * as promise from "promise";
import * as fs from "file-system";

const host = "https://acardste.vaservices.eu:1443";
const basePath = "/pp-restapi/v1";
var SESSION_TOKEN: string = fs.readFileSync("sessionToken.txt", (err, data) => {
  if (err) throw err;
  console.log(data);
  return data;
});

class WalletsController {
  getWallets(SESSION_TOKEN: string) {
    console.log(SESSION_TOKEN);
    const url = host + basePath + "/wallet";
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
      })
      .catch(error => console.error(error));
  }

  getWallet(SESSION_TOKEN: string, idWallet: number) {
    console.log(SESSION_TOKEN);
    const url = host + basePath + "/wallet/" + idWallet;
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
        console.log("ritorono solo 1434");
        console.log(data);
      })
      .catch(error => console.error(error));
  }

  favouriteWallet(SESSION_TOKEN: string, idWallet: number) {
    console.log(SESSION_TOKEN);
    const url = host + basePath + "/wallet/"+idWallet+"/actions/favourite";
    fetch(url, {
      method: "POST",
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
        console.log("ritorno il migliore");
        console.log(data);
      })
      .catch(error => console.error(error));
  }
}

let wc: WalletsController = new WalletsController();
wc.favouriteWallet(SESSION_TOKEN, 1434);