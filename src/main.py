from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import requests
import os

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
print("🚨 CHAVE LIDA PELO PYTHON:", API_KEY) # Adicione esta linha!
@app.get("/jogos")
def listar_jogos():
    url = f"https://api.rawg.io/api/games?key={API_KEY}&page_size=20&ordering=-rating"
    resposta = requests.get(url)
    return resposta.json()