let paginacao = {
  offset: 0,
  limit: 100,
  botao_voltar: 0,
  botao_avancar: 2,
};

export async function buscaAPI(offset, limit) {
  const resp = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
  );

  const data = await resp.json();
  console.log(data);

  return data;
}
