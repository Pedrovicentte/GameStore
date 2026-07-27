const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");

async function carregarJogo() {
    try {
        const resposta = await fetch(`http://127.0.0.1:8000/api/jogos/${id}`);
        
        if (!resposta.ok) {
            throw new Error("Erro ao buscar o jogo");
        }

        const jogo = await resposta.json();
        mostrarJogo(jogo);
    } catch (erro) {
        console.error("Falha de conexão:", erro);
    }
}

function mostrarJogo(jogo) {
    document.querySelector(".banner").style.backgroundImage =
        `url(${jogo.background_image})`;

    document.getElementById("capa").src =
        jogo.background_image;

    document.getElementById("nome").innerText =
        jogo.name;

    document.getElementById("rating").innerText =
        jogo.rating;

    // description_raw é melhor aqui para evitar injeção de HTML indesejado da API
    document.getElementById("descricao").innerHTML =
        jogo.description_raw;

    const preco = ((jogo.id % 180) + 20).toFixed(2);

    document.getElementById("preco").innerText =
        preco;
}

carregarJogo();