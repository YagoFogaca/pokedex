let paginacao = {
    offset: 0,
    botao_voltar: 1,
    botao_avancar: 2,
};

async function buscaAPI(offset) {
    const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=50`);

    const data = await resp.json();

    return data;
}

async function criaElementos(offset) {
    const data = await buscaAPI(offset);

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
                if (item.innerText.trim().toUpperCase() === i.toUpperCase()) {
                    item.classList.add(`bg_color-${i}`);

                    break;
                }
            }
        });
    });
}
criaElementos(paginacao.offset);

const btnInicar = document.querySelector("#pokedex_abrir");

const btnVoltarPage = document.querySelector("#pokedex_page-voltar");

const btnAvancarPage = document.querySelector("#pokedex_page-avancar");

const btnMenu = document.querySelector("#pokedex_menu");

const menu = document.querySelector("#menu");

btnInicar.addEventListener("click", function () {
    document.querySelector("#container_apresentacao").style.height = "995px";

    document.querySelector("#container_apresentacao").style.backgroundColor = "var(--cor-branco)";

    document.querySelector("#pokedex_apresentacao").style.display = "flex";

    btnMenu.style.display = "flex";

    btnVoltarPage.style.display = "flex";

    btnAvancarPage.style.display = "flex";

    btnInicar.style.display = "none";
});

btnMenu.addEventListener("click", function () {
    if (menu.style.display == "flex") {
        menu.style.display = "none";
        btnMenu.innerText = "Menu";
    } else {
        menu.style.display = "flex";
        btnMenu.innerText = "X";
    }
});

btnAvancarPage.addEventListener("click", function () {
    const pokedexCards = document.querySelectorAll(".pokedex_cards");

    pokedexCards.forEach(function (item) {
        item.remove();
    });

    paginacao.botao_avancar++;

    paginacao.botao_voltar++;

    btnAvancarPage.innerText = paginacao.botao_avancar;

    btnVoltarPage.innerText = paginacao.botao_voltar;

    paginacao.offset += 100;

    criaElementos(paginacao.offset);
});

btnVoltarPage.addEventListener("click", function () {
    if (paginacao.offset != 0) {
        const pokedexCards = document.querySelectorAll(".pokedex_cards");

        pokedexCards.forEach(function (item) {
            item.remove();
        });

        paginacao.botao_avancar--;

        paginacao.botao_voltar--;

        btnAvancarPage.innerText = paginacao.botao_avancar;

        btnVoltarPage.innerText = paginacao.botao_voltar;

        paginacao.offset -= 100;

        criaElementos(paginacao.offset);
    }
});
