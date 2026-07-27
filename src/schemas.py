from pydantic import BaseModel
from enum import Enum

class PapelUsuario(str, Enum):
    ADMIN = "admin"
    USUARIO = "usuario"

class UsuarioSchema(BaseModel):
    nome: str
    email: str
    senha: str
    papel: PapelUsuario = PapelUsuario.USUARIO
    
class LoginSchema(BaseModel):
    email: str
    senha: str
    
class OrdersSchema(BaseModel):
    email: str
    nome: str
    jogos: list[str]
    total: float