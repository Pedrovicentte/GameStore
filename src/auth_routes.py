from fastapi import APIRouter

auth_router = APIRouter(prefix="/auth", tags="auth")

@auth_router.get("/")
async def home():
    return{"mensagem": "Você acessou a rota padrão de autenticação"}