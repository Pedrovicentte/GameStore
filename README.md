# GameStore

Um sistema de loja digital de jogos desenvolvido em Python, focado na aplicação de conceitos de Programação Orientada a Objetos (POO) e integração de dados.

## 🚀 Sobre o Projeto

O GameStore é uma aplicação web completa que permite explorar um catálogo de jogos digitais. O sistema integra-se diretamente com a **RAWG API** para extrair, processar e exibir informações precisas e atualizadas sobre os jogos. O projeto conta com um backend modular em Python para lidar com a lógica e autenticação, aliado a um frontend responsivo e interativo.

## 🛠️ Tecnologias Utilizadas

- **Backend:** Python (Rotas modulares e schemas de validação)
- **Frontend:** HTML5, CSS3, JavaScript
- **Integração de Dados:** RAWG API (Extração de dados sobre jogos)
- **Segurança e Validação:** Autenticação de usuários (`auth_routes.py`) e estruturação de dados (`schemas.py`)

## 📁 Estrutura do Repositório

```text
GameStore/
├── .env                # Configurações de ambiente 
├── README.md           # Documentação do projeto
├── src/                # Backend da aplicação
│   ├── main.py         # Arquivo principal para inicializar o servidor
│   ├── auth_routes.py  # Rotas de gerenciamento e autenticação de usuários
│   └── schemas.py      # Modelos e schemas para validação de dados
└── view/               # Interface do usuário (Frontend)
    ├── index.html      # Página inicial (Catálogo)
    ├── jogo.html       # Página de detalhes do jogo
    ├── imagens/        # Recursos visuais (banners, logos, favicon)
    ├── script/         # Lógica do frontend (script.js, jogo.js)
    └── style/          # Folhas de estilo (style.css, jogo.css)