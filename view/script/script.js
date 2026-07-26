const apiUrl = "http://127.0.0.1:8000/jogos";   

let indiceBanner = 0;

async function carregarLoja() {
    try {

        const resposta = await fetch(apiUrl);
        const dados = await resposta.json();
        console.log("Dados recebidos da API:", dados);
        const jogos = dados.results;

        // Banner
       atualizarBanner(jogos);
       setInterval(() => {

        atualizarBanner(jogos);

}, 5000);

        renderizarVitrine(jogos, "vitrine-super");

    } catch (erro) {

        console.error(erro);

    }
}

function atualizarBanner(jogos){

    const banner = document.getElementById("banner-destaque");

    banner.style.opacity = 0;

    setTimeout(() => {

        const jogo = jogos[indiceBanner];

        banner.style.backgroundImage = `url(${jogo.background_image})`;

        document.getElementById("hero-titulo").innerText = jogo.name;

        banner.style.opacity = 1;

        indiceBanner++;

        if(indiceBanner >= jogos.length){
            indiceBanner = 0;
        }

    },500);

}

// Criamos uma função separada para desenhar os cards para não repetir código
function renderizarVitrine(listaJogos, idContainer) {

    const container = document.getElementById(idContainer);

    container.innerHTML = "";

    listaJogos.forEach(jogo => {

        const card = document.createElement("div");
        card.classList.add("card-jogo");

        const preco = ((jogo.id % 180) + 20).toFixed(2);

        card.onclick = () => {
            window.location.href = `jogo.html?id=${jogo.id}`;
        };

        card.innerHTML = `

            <img src="${jogo.background_image}" alt="${jogo.name}">

            <div class="info-jogo">

                <h3>${jogo.name}</h3>

                <p>⭐ ${jogo.rating}</p>

                <p class="preco">R$ ${preco}</p>

                <button class="btn-comprar">

                    Ver detalhes

                </button>

            </div>

        `;

        container.appendChild(card);

    });

}

function comprarJogo(id) {
    alert(`Jogo ID: ${id} adicionado ao carrinho!`);
}

// Inicia a loja
carregarLoja();