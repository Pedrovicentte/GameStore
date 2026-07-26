const API_KEY = "74e5b81f13b8438e9c12d03f200cb616";

const parametros = new URLSearchParams(window.location.search);

const id = parametros.get("id");

async function carregarJogo(){

    const resposta = await fetch(

        `https://api.rawg.io/api/games/${id}?key=${API_KEY}`

    );

    const jogo = await resposta.json();

    mostrarJogo(jogo);

}

function mostrarJogo(jogo){

    document.querySelector(".banner").style.backgroundImage =
        `url(${jogo.background_image})`;

    document.getElementById("capa").src =
        jogo.background_image;

    document.getElementById("nome").innerText =
        jogo.name;

    document.getElementById("rating").innerText =
        jogo.rating;

    document.getElementById("descricao").innerHTML =
        jogo.description_raw;

    const preco = ((jogo.id % 180) + 20).toFixed(2);

    document.getElementById("preco").innerText =
        preco;

}

carregarJogo();