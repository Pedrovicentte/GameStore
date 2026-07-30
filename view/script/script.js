const apiUrl = "http://127.0.0.1:8000/jogos";   

let indiceBanner = 0;

async function carregarLoja() {
    try {

        const resposta = await fetch(apiUrl);
        const dados = await resposta.json();
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
                <p>${jogo.genres.map(g => g.name).join(", ")}</p>
            </div>
        `;

        container.appendChild(card);

    });

}

function comprarJogo(id) {
    alert(`Jogo ID: ${id} adicionado ao carrinho!`);
}


async function verificarLogin() {
    const token = localStorage.getItem('meu_token');

    if (token) {
        try {
            const resposta = await fetch('http://127.0.0.1:8000/auth/me', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const dados = await resposta.json();

            if (resposta.ok) {
                // Sucesso! Esconde o botão e mostra o perfil
                document.getElementById('btn-login').style.display = 'none';
                document.getElementById('circulo-perfil').style.display = 'flex';
                
                // Coloca a inicial do nome do usuário no círculo
                document.getElementById('letra-perfil').innerText = dados.nome.charAt(0).toUpperCase();
            } else {
                // Se der Erro 401, limpa o token quebrado
                localStorage.removeItem('meu_token');
            }
        } catch (erro) {
            console.error("Erro ao validar token:", erro);
        }
    }
}

// 2. Mandamos a função executar assim que o arquivo for lido
carregarLoja();
verificarLogin();

