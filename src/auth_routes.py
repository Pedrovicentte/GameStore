from fastapi import APIRouter, HTTPException, Depends
from src.schemas import UsuarioSchema, LoginSchema
from src.security import criar_token, usuario_logado
from sqlalchemy.orm import Session
from src.database import get_db
from src import models

auth_router = APIRouter(prefix="/auth", tags=["auth"])

@auth_router.get("/")
async def home():
    return{"mensagem": "Você acessou a rota padrão de autenticação"}

@auth_router.post("/cadastro")
async def cadastro(usuario_schema: UsuarioSchema, db: Session = Depends(get_db)):
        usuario = db.query(models.UsuarioDB).filter(models.UsuarioDB.email == usuario_schema.email).first()
        if usuario:
            raise HTTPException(status_code=400, detail="E-mail do usuário já cadastrado!")
        # Cria novo usuario no banco de dados
        novo_usuario = models.UsuarioDB(
            nome = usuario_schema.nome,
            email = usuario_schema.email,
            senha = usuario_schema.senha
        )
        # Salva os dados do novo Usuario
        db.add(novo_usuario)
        db.commit()
        db.refresh(novo_usuario)
        # Cria Token
        token = criar_token(usuario_schema.email)

        return{
            "access_token": token,
            "token_type": "bearer",
            "mensagem": f"Bem-vindo, {usuario_schema   .nome}!"
    }

@auth_router.post("/login")
async def login(login_schema: LoginSchema, db: Session = Depends(get_db)):
    usuario = db.query(models.UsuarioDB).filter(models.UsuarioDB.email == login_schema.email).first()
    if not usuario or usuario.senha != login_schema.senha:
        raise HTTPException(status_code=400, detail="Usuário não encontrado.")
    else:
        token = criar_token(usuario.email)
        return {
                    "access_token": token,
                    "token_type": "bearer",
                    "mensagem": f"Bem-vindo de volta, {usuario.nome}!", 
                    "papel": usuario.papel
                }

@auth_router.get("/me")
async def perfil_usuario(email_usuario: str = Depends(usuario_logado), db: Session = Depends(get_db)):
    usuario = db.query(models.UsuarioDB).filter(models.UsuarioDB.email == email_usuario).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuário não encontrado no banco de dados.")
        
    return {
        "nome": usuario.nome, 
        "email": usuario.email,
        "papel": usuario.papel 
    }