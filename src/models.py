from sqlalchemy import Column, Integer, String
from src.database import Base

class UsuarioDB(Base):
    __tablename__ = "usuários"
    
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String)
    email = Column(String, unique=True, index=True)
    senha = Column(String)
    papel = Column(String, default="cliente")