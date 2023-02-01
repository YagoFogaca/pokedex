import { FindAllApi } from "../api/api.js";
import { CreateCard } from "./create-card.js";

export async function InputFilter() {
  const input = document.querySelector("input");
  const cards = document.querySelectorAll(".card-pokemon");

  if (input.value) {
    cards.forEach((card) => {
      card.remove();
    });
  }

  const pokemonsFindAll = await FindAllApi(0, 10000);
  await pokemonsFindAll.results.map(async (item) => {
    const pokemonFetch = await fetch(item.url);
    const pokemon = await pokemonFetch.json();

    if (pokemon.name.toLowerCase().includes(input.value.toLowerCase())) {
      let img = pokemon.sprites.other["official-artwork"].front_default;
      if (!img) {
        img = "./assets/img/pokemon_sem_img.png";
      }

      CreateCard(img, pokemon.name);
    }
  });
}
