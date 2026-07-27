from fastapi import APIRouter, Depends
from src.schemas import OrdersSchema
from src.security import usuario_logado

order_router = APIRouter(prefix="/order", tags=["orders"])

orders_db = []

@order_router.post("/")
async def criar_pedido(pedido: OrdersSchema, email_usuario: str =Depends(usuario_logado)):
    orders_db.append(pedido)
    return {
        "mensagem": f"Pedido criado com sucesso para {pedido.nome}!",
        "comprador_verificado": email_usuario,
        "jogos": pedido.jogos,
        "total": f"R$ {pedido.total}"
    }