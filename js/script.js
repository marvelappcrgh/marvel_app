const APIKEY = "28cecaff81d366d7d1d6700384ce4532"; // PUBLIC KEY
const HASH = "8b397a997e7907535428c333f4150a99"; // md5(ts+privatekey+publickey)
const TS = "1";

const URL = "https://gateway.marvel.com/v1/public/";

async function sendRequest(path) {
  // 1. Hacer peticion
  const response = await fetch(
    URL + path + "?ts=" + TS + "&apikey=" + APIKEY + "&hash=" + HASH
  );
  // 2. validar la respuesta
  if (!response.ok) throw Error(response.statusText);

  // 3. extraer la informacion
  const json = await response.json();
  return json.data.results;
}

//function itemClick() {
//  alert("Producto añadido");
//}

// Crear la funcion main para consumir el recurso...
async function main() {
  const comics = await sendRequest("comics");
  console.log(comics);
  //PROCESAR INFORMACION

  const container = document.getElementById("card_container");

  comics.forEach((comic) => {
    const template = document.querySelector("#card_template");
    const clone = template.cloneNode(true);
    clone.removeAttribute("style"); // removiendo el diplay:none
    // console.log(clone.children[0].children[1].children[0]);// H5

    //image_not_available
    //validacion de comics sin imagen
    if (comic.thumbnail.path.includes("image_not_available")) {
      return;
    }
    // CARGAR IMAGEN
    clone
      .querySelector(".comic_img")
      .setAttribute(
        "src",
        `${comic.thumbnail.path}.${comic.thumbnail.extension}`
      );
    // SETEAR TITULO
    clone.querySelector(".comic_name").textContent = comic.title;

    //SETEAR PRECIO

    let original_price =
      comic.prices[0].price == 0 ? 2.99 : comic.prices[0].price; // TERNARIO

    // SETEAR PRECIO ORIGINAL
    clone.querySelector(".comic_ori_price").textContent = original_price;

    // SETEAR PRECIO TOTAL
    clone.querySelector(".price").textContent = (original_price - 2.0).toFixed(
      2
    ); // 1.0

    // Acción al botón
    clone.querySelector(".comic_button").addEventListener("click", () => {
      localStorage.setItem("product_id", comic.id);
      //window.location.href = "product.html";
      window.open("/52_marvel/produc.html");
    });

    container.appendChild(clone);
  });
}
main();
