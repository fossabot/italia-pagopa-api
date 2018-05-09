import * as fetch from "node-fetch";
import * as promise from "promise";
import * as fs from "file-system";

const host = "https://acardste.vaservices.eu:1443";
const basePath = "/pp-restapi/v1";
var SESSION_TOKEN: string = fs.readFileSync("sessionToken.txt", (err, data) => {
  if (err) throw err;
  console.log(data);
});

class TransactionsController {

  getTransactions(SESSION_TOKEN: string) {
    console.log(SESSION_TOKEN);
    const url = host + basePath + "/transactions";
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

  getTransaction(SESSION_TOKEN: string, idTransaction: number) {
    console.log(SESSION_TOKEN);
    const url = host + basePath + "/transactions/" + idTransaction;
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

  checkStatus(SESSION_TOKEN: string, idTransaction: number, esito: string, paRes: string) {
    console.log(SESSION_TOKEN);
    const url = host + basePath + "/transactions/"+idTransaction+"/actions/check";

    let form = {
        data: {
          esito: esito, //ssr.data.email
          paRes: paRes //ssr.data.idPayment
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