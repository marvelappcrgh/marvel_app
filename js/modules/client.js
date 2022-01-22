const APIKEY = "28cecaff81d366d7d1d6700384ce4532"; // PUBLIC KEY
const HASH = "8b397a997e7907535428c333f4150a99"; // md5(ts+privatekey+publickey)
const TS = "1";
const URL = "https://gateway.marvel.com/v1/public/";
const URL_LOCAL = "data/";

const CLIENT = {
  sendRequest: async (path) => {
    // 1. Hacer Peticion
    const response = await fetch(
      URL + path + "?ts=" + TS + "&apikey=" + APIKEY + "&hash=" + HASH
    );
    // Validar la respuesta
    if (!response.ok) throw Error(response.statusText);
    // Extraer la información
    const json = await response.json();
    return json.data.results;
  },
  sendRequestlocal: async (path) => {
    // 1. Hacer Peticion
    const response = await fetch(
      URL + path + "?ts=" + TS + "&apikey=" + APIKEY + "&hash=" + HASH
    );
    // Validar la respuesta
    if (!response.ok) throw Error(response.statusText);
    // Extraer la información
    const json = await response.json();
    return json.data.results;
  },
};

export default CLIENT;
