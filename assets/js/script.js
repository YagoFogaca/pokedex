const baseAPI = {
    page: "0",
    url_pokemon: `https://pokeapi.co/api/v2/pokemon?offset=${this.page}&limit=20`,
    // https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0.
};

async function buscaAPI() {
    const resp = await fetch(baseAPI.url_pokemon);

    const data = await resp.json();

    // console.log(data.results); // Todos os pokemon dessa page.

    data.results.forEach(async function (item) {
        // item é todos os pokemos da lista
        const respPoke = await fetch(item.url); // Pega todas as urls dos pokemons, onde estão as informações

        const dataPoke = await respPoke.json();

        const name = dataPoke.name;

        const nameUp = name[0].toUpperCase() + name.substring(1);

        const imagem = dataPoke.sprites.other["official-artwork"].front_default;

        const numero = dataPoke.id;

        const tipo = dataPoke.types;

        const descricao = dataPoke.species.url;

        const descricaoResp = await fetch(descricao);

        const descricaoData = await descricaoResp.json();

        const personagemDescricao = descricaoData.flavor_text_entries[1].flavor_text;

        const personagemDescricaoFix = personagemDescricao.replace("", "");

        if (tipo[1] === undefined) {
            document.querySelector("#pokedex_apresentacao").insertAdjacentHTML(
                "beforeend",
                `<div class="pokedex_cards">
                            <h3 class="pokedex_titulo">${nameUp}</h3>
                            <p class="pokedex_numero">${numero}º</p>
                            <figure>
                                <img
                                    class="pokedex_img"
                                    src="${imagem}"
                                    alt=""
                                />
                            </figure>
        
                            <div class="tipos_container">
                            <div class="pokedex_tipos">
                                    <p class="pokedex_tipos-pokemos">${tipo[0].type.name}</p>
                                </div>
                            </div>
                            <p class="pokedex_descricao">${personagemDescricaoFix}</p>
                        </div>`
            );
        } else {
            document.querySelector("#pokedex_apresentacao").insertAdjacentHTML(
                "beforeend",
                `<div class="pokedex_cards">
                            <h3 class="pokedex_titulo">${nameUp}</h3>
                            <p class="pokedex_numero">${numero}º</p>
                            <figure>
                                <img
                                    class="pokedex_img"
                                    src="${imagem}"
                                    alt=""
                                />
                            </figure>

                            <div class="tipos_container">
                                <div class="pokedex_tipos">
                                    <p class="pokedex_tipos-pokemos">${tipo[0].type.name}</p>
                                </div>
                                <div class="pokedex_tipos">
                                    <p class="pokedex_tipos-pokemos">${tipo[1].type.name}</p>
                                </div>
                            </div>
                            <p class="pokedex_descricao">${personagemDescricaoFix}</p>
                        </div>`
            );
        }
    });

    return data;
}

buscaAPI();

const btn = document.querySelector("#pokedex_abrir");

btn.addEventListener("click", function () {
    document.querySelector("#pokedex_apresentacao").style.display = "flex";

    document.querySelector("#pokedex_meio").style.top = "270px";

    btn.innerText = "";
});
