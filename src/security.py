import jwt
import os
from datetime import datetime, timedelta, timezone
from dotenv import load_dotenv
from fastapi import HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
TEMPO_EXPIRACAO_MINUTOS = 60

def criar_token(email: str):
    playload = {
        "sub": email,
        "exp":datetime.now(timezone.utc) + timedelta(minutes=TEMPO_EXPIRACAO_MINUTOS)
    }
    token_codificado = jwt.encode(playload, SECRET_KEY, algorithm=ALGORITHM)
    return token_codificado

oauth2_scheme = HTTPBearer()

def usuario_logado(credenciais: HTTPAuthorizationCredentials = Depends(oauth2_scheme)):
    token = credenciais.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Token Inválido")
        return email
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Sua sessão expirou. Faça login novamente.")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Credenciais inválidas.")