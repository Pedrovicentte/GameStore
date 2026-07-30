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
                // Esconde o botão de login original
                document.getElementById('btn-login').style.display = 'none';

                // Agora nós mostramos o ENVELOPE inteiro (que contém o círculo e o menu oculto)
                document.getElementById('menu-usuario').style.display = 'block';

                // A letra continua igual
                document.getElementById('letra-perfil').innerText = dados.nome.charAt(0).toUpperCase();
            }
            else {
                // Se der Erro 401, limpa o token quebrado
                localStorage.removeItem('meu_token');
            }
        } catch (erro) {
            console.error("Erro ao validar token:", erro);
        }
    }
}

async function LogOut() {
    localStorage.removeItem("meu_token")
    document.getElementById("circulo-perfil").style.display = 'none';
    document.getElementById("btn-login").style.display = 'block';

    window.location.reload()

    document.getElementById('btn-sair').addEventListener('click', function() {
});
}

function abrirMenu() {
    document.getElementById('caixa-menu').classList.toggle('aberta');
}

// Fecha o menu se o usuário clicar em qualquer lugar fora dele
document.addEventListener('click', function(evento) {
    const menu = document.getElementById('caixa-menu');
    const circulo = document.getElementById('circulo-perfil');

    // Garante que os elementos existem na tela antes de rodar (evita erros em páginas que não têm o menu)
    if (menu && circulo) {
        // Se o clique NÃO foi dentro do menu E NÃO foi no círculo de perfil
        if (!menu.contains(evento.target) && !circulo.contains(evento.target)) {
            menu.classList.remove('aberta'); // Recolhe o menu suavemente
        }
    }
});

carregarLoja();
verificarLogin();

