const formLogin = document.getElementById('login-page');

formLogin.addEventListener('submit', async function(evento) {
    
    evento.preventDefault(); 
    
    const emailDigitado = document.getElementById('email').value;
    const senhaDigitada = document.getElementById('senha').value;
    const divErro = document.getElementById('mensagem-erro');

    try {
        const resposta = await fetch('http://127.0.0.1:8000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                email: emailDigitado,
                senha: senhaDigitada
            })
        });

        const dados = await resposta.json();

        if (resposta.ok) {
            alert(dados.mensagem); 
            
            localStorage.setItem('meu_token', dados.access_token);
            
            window.location.href = '/loja.html'; 
        } else {
            divErro.innerText = dados.detail; 
        }

    } catch (erro) {
        divErro.innerText = "Erro ao conectar com o servidor. Tente novamente.";
        console.error("Erro no fetch:", erro);
    }
});