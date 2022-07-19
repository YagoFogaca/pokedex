const baseAPI = {
    page: "0",
    url_pokemon: `https://pokeapi.co/api/v2/pokemon?offset=${this.page}&limit=10`,
    // https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0.
};

async function buscaAPI() {
    const resp = await fetch(baseAPI.url_pokemon);

    const data = await resp.json();

    return data;
}
async function criaElementos() {
    const data = await buscaAPI();

    data.results.forEach(async function (item) {
        const respPoke = await fetch(item.url);

        const dataPoke = await respPoke.json();

        const name = dataPoke.name;

        const nameUp = name[0].toUpperCase() + name.substring(1);

        const imagem = dataPoke.sprites.other["official-artwork"].front_default;

        const numero = dataPoke.id;

        const tipo = dataPoke.types;

        const descricao = dataPoke.species.url;

        const descricaoResp = await fetch(descricao);

        const descricaoData = await descricaoResp.json();

        let personagemDescricao = "";

        for (let i = 0; i <= 5; i++) {
            if (descricaoData.flavor_text_entries[i].language.name == "en") {
                personagemDescricao = descricaoData.flavor_text_entries[i].flavor_text;

                break;
            }
        }

        const personagemDescricaoFix = personagemDescricao.replace("", "");

        if (tipo[1] === undefined) {
            document.querySelector("#pokedex_apresentacao").insertAdjacentHTML(
                "beforeend",
                `<div class="pokedex_cards">
                    <div class="pokedex_cards-cabecalho">
                        <h3 class="pokedex_titulo">${nameUp}</h3>
                        <p class="pokedex_numero">${numero}º</p>
                    </div>
    
                    <figure>
                        <img class="pokedex_img" src="${imagem}" alt="" />
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
                    <div class="pokedex_cards-cabecalho">
                        <h3 class="pokedex_titulo">${nameUp}</h3>
                        <p class="pokedex_numero">${numero}º</p>
                    </div>
                            <figure>
                                <img
                                    class="pokedex_img"
                                    src="${imagem}"
                                    alt=""
                                />
                            </figure>

                            <div class="tipos_container">
                                <div class="pokedex_tipos">
                                    <p class="pokedex_tipos-pokemos" id="tipo_1">${tipo[0].type.name}</p>
                                </div>
                                <div class="pokedex_tipos">
                                    <p class="pokedex_tipos-pokemos" id="tipo_2">${tipo[1].type.name}</p>
                                </div>
                            </div>
                            <p class="pokedex_descricao">${personagemDescricaoFix}</p>
                        </div>`
            );
        }

        const divsTipos = document.querySelectorAll(".pokedex_tipos");

        const tipos = [
            "normal",
            "fire",
            "fighting",
            "water",
            "flying",
            "grass",
            "poison",
            "electric",
            "ground",
            "psychic",
            "rock",
            "ice",
            "bug",
            "dragon",
            "ghost",
            "dark",
            "steel",
            "fairy",
        ];

        divsTipos.forEach(async function (item) {
            for (let i of tipos) {
                if (item.innerText.trim() === i) {
                    item.classList.add(`bg_color-${i}`);
                    break;
                }
            }
        });
    });
}
criaElementos();

const btn = document.querySelector("#pokedex_abrir");

btn.addEventListener("click", function () {
    document.querySelector("#container_apresentacao").style.height = "995px";

    document.querySelector("#container_apresentacao").style.backgroundColor = "var(--cor-preto-claro)";

    document.querySelector("#pokedex_apresentacao").style.display = "flex";

    document.querySelector("#menu_pokedex").style.display = "flex";

    btn.style.display = "none";
});
