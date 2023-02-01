import { FindAllApi } from "../api/api.js";

async function Machine() {
  const sectionCards = document.getElementById("card-presentation");
  console.log(sectionCards);
  const pokemonsFindAll = await FindAllApi(0, 12);

  pokemonsFindAll.results.map(async (item) => {
    const pokemonFetch = await fetch(item.url);
    const pokemon = await pokemonFetch.json();
    console.log(pokemon);

    const name = pokemon.name;
    let img = pokemon.sprites.other["official-artwork"].front_default;
    if (!img) {
      img = "./assets/img/pokemon_sem_img.png";
    }

    const cards = `
    <div class="card-pokemon">
      <figure>
        <img
          class="card-pokemon--img"
          src=${img}
        />
        </figure>
        <p class="card-pokemon--name">${name}</p>
    </div>
    `;

    sectionCards.insertAdjacentHTML("beforeend", cards);
  });
}

Machine();
