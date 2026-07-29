const formCadastro = document.getElementById('form-cadastro');

formCadastro.addEventListener('submit', async function(evento) {
    evento.preventDefault(); // Impede a página de recarregar
    
    // Captura os valores que o usuário digitou
    const nomeDigitado = document.getElementById('nome').value;
    const emailDigitado = document.getElementById('email').value;
    const senhaDigitada = document.getElementById('senha').value;

    try {
        // Envia os dados para a rota POST de cadastro
        const resposta = await fetch('http://127.0.0.1:8000/auth/cadastro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // Converte os dados para o formato JSON que o FastAPI espera
            body: JSON.stringify({
                nome: nomeDigitado,
                email: emailDigitado,
                senha: senhaDigitada
            })
        });

        const dados = await resposta.json();

        if (resposta.ok) {
            alert(dados.mensagem); 
            
            // A rota já devolve o token no cadastro, salvamos ele:
            localStorage.setItem('meu_token', dados.access_token);
            
            // Redireciona direto para a vitrine da loja
            window.location.href = 'index.html'; 
        } else {
            // Se o e-mail já existir, o FastAPI manda o erro 400
            alert("Erro no cadastro: " + dados.detail);
        }

    } catch (erro) {
        console.error("Erro na conexão:", erro);
        alert("Não foi possível conectar ao servidor. O FastAPI está rodando?");
    }
});