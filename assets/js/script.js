const baseAPI = {
    page: "0",
    url_pokemon: `https://pokeapi.co/api/v2/pokemon?offset=${this.page}&limit=100`,
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

        // const personagemDescricao = descricaoData.flavor_text_entries[1].flavor_text;
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
        for (let i = 0; i < divsTipos.length; i++) {
            switch (divsTipos[i].innerText.trim()) {
                case "grass":
                    divsTipos[i].classList.add("bg_color-glass");
                    break;
                case "poison":
                    divsTipos[i].classList.add("bg_color-poison");
                    break;
                case "fire":
                    divsTipos[i].classList.add("bg_color-fire");
                    break;
                case "flying":
                    divsTipos[i].classList.add("bg_color-flying");
                    break;
                case "water":
                    divsTipos[i].classList.add("bg_color-water");
                    break;
                case "bug":
                    divsTipos[i].classList.add("bg_color-bug");
                    break;
                case "normal":
                    divsTipos[i].classList.add("bg_color-normal");
                    break;
                case "electric":
                    divsTipos[i].classList.add("bg_color-electric");
                    break;
                case "ground":
                    divsTipos[i].classList.add("bg_color-ground");
                    break;
                case "fairy":
                    divsTipos[i].classList.add("bg_color-fairy");
                    break;
                case "fighting":
                    divsTipos[i].classList.add("bg_color-fighting");
                    break;
                case "psychic":
                    divsTipos[i].classList.add("bg_color-psychic");
                    break;
                case "rock":
                    divsTipos[i].classList.add("bg_color-rock");
                    break;
                case "steel":
                    divsTipos[i].classList.add("bg_color-steel");
                    break;
                case "ice":
                    divsTipos[i].classList.add("bg_color-ice");
                    break;
                case "ghost":
                    divsTipos[i].classList.add("bg_color-ghost");
                    break;
                case "dragon":
                    divsTipos[i].classList.add("bg_color-dragon");
                    break;
                case "dark":
                    divsTipos[i].classList.add("bg_color-dark");
                    break;
            }
        }
    });

    return data;
}

buscaAPI();

const btn = document.querySelector("#pokedex_abrir");

btn.addEventListener("click", function () {
    // buscaAPI();

    document.querySelector("#container_apresentacao").style.height = "995px";

    document.querySelector("#container_apresentacao").style.backgroundColor = "var(--cor-preto-claro)";

    document.querySelector("#pokedex_inicar").style.display = "flex";

    document.querySelector("#pokedex_apresentacao").style.display = "flex";

    btn.style.display = "none";
});

// const types = [
//     'normal', 'fire', 'fighting',
//     'water', 'flying', 'grass',
//     'poison', 'electric', 'ground',
//     'psychic', 'rock', 'ice',
//     'bug', 'dragon', 'ghost',
//     'dark', 'steel', 'fairy'
// ];
// Passar no for uma função async
