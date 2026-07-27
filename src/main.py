from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import requests
import os

from src.auth_routes import auth_router

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

API_KEY = os.getenv("RAWG_API_KEY")

@app.get("/jogos")
def listar_jogos():
    url = f"https://api.rawg.io/api/games?key={API_KEY}&page_size=20&ordering=-rating"
    resposta = requests.get(url)
    return resposta.json()

@app.get("/api/jogos/{jogo_id}")
def buscar_jogo(jogo_id: int):
    url = f"https://api.rawg.io/api/games/{jogo_id}?key={API_KEY}"
    resposta = requests.get(url)
    return resposta.json()

app.include_router(auth_router)