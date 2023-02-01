export async function FindAllApi(offset, limit) {
  const resp = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
  );

  const data = await resp.json();

  return data;
}
