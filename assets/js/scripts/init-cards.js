import { FindAllApi } from "../api/api.js";
import { CreateCard } from "./create-card.js";

export async function InitCards() {
  const pokemonsFindAll = await FindAllApi(0, 12);

  await pokemonsFindAll.results.map(async (item) => {
    const pokemonFetch = await fetch(item.url);
    const pokemon = await pokemonFetch.json();

    const name = pokemon.name;
    let img = pokemon.sprites.other["official-artwork"].front_default;
    if (!img) {
      img = "./assets/img/pokemon_sem_img.png";
    }

    CreateCard(img, name);
  });
}
