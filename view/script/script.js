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

document.addEventListener("DOMContentLoaded", async function() {
    
    const btnLogin = document.getElementById("btn-login");
    const circuloPerfil = document.getElementById("circulo-perfil");

    // 1. Pegamos a "pulseira VIP" que salvamos na hora do login
    const token = localStorage.getItem("meu_token");

    if (token) {
        try {
            // 2. Batemos na nova rota do FastAPI apresentando o token
            const resposta = await fetch('http://127.0.0.1:8000/auth/me', {
                method: 'GET',
                headers: {
                    // O padrão 'Bearer ' indica que estamos "portando" uma credencial de acesso
                    'Authorization': `Bearer ${token}` 
                }
            });

            if (resposta.ok) {
                // 3. O FastAPI reconheceu o token e devolveu os dados do usuário!
                const dadosUsuario = await resposta.json();
                
                if (btnLogin) btnLogin.style.display = "none"; // Esconde o botão
                
                if (circuloPerfil) {
                    circuloPerfil.style.display = "flex"; // Mostra o círculo
                    
                    // Extrai a primeira letra do nome e força para maiúscula
                    const inicial = dadosUsuario.nome.charAt(0).toUpperCase();
                    
                    // Injeta a letra dentro do círculo no HTML
                    circuloPerfil.innerHTML = `<span>${inicial}</span>`;
                    
                    // Um charme extra: quando passar o mouse em cima, mostra o nome completo
                    circuloPerfil.title = dadosUsuario.nome;
                }
            } else {
                // Se a resposta não for OK (ex: token venceu após 60 min), limpamos o navegador
                localStorage.removeItem("meu_token");
                if (btnLogin) btnLogin.style.display = "block";
                if (circuloPerfil) circuloPerfil.style.display = "none";
            }
        } catch (erro) {
            console.error("Erro ao verificar o perfil do usuário:", erro);
        }
    } else {
        // Se não existir token nenhum salvo no PC, mostra o botão de login normal
        if (btnLogin) btnLogin.style.display = "block";
        if (circuloPerfil) circuloPerfil.style.display = "none";
    }
});
carregarLoja();