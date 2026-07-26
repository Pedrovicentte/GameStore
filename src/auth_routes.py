from fastapi import APIRouter, HTTPException
from src.schemas import UsuarioSchema, LoginSchema

auth_router = APIRouter(prefix="/auth", tags=["auth"])

usuarios_db = []

@auth_router.get("/")
async def home():
    return{"mensagem": "Você acessou a rota padrão de autenticação"}

@auth_router.post("/cadastro")
async def cadastro(usuario_schema: UsuarioSchema):
        usuario = next((u for u in usuarios_db if u.email == usuario_schema.email), None) 
        if usuario:
            raise HTTPException(status_code=400, detail="E-mail do usuário já cadastrado!")
        else:
            usuarios_db.append(usuario_schema)
            return{"mensagem": "Usuário Cadastrado com Sucesso!"}

@auth_router.post("/login")
async def login(login_schema: LoginSchema):
    usuario = next((u for u in usuarios_db if u.email == login_schema.email), None)
    if not usuario or usuario.senha != login_schema.senha:
        raise HTTPException(status_code=400, detail="Usuário não encontrado.")
    else:
        return {"mensagem": f"Bem-vindo de volta, {usuario.nome}!", "papel": usuario.papel}