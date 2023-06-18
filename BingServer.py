# BingAI - Client Server

# Version : 1.0.0
# Author : highbuyer
# GitHub : https://github.com/highbuyer/BingAI
# License : MIT
# Powered by EdgeGPT, FastAPI, Angular and Microsoft New Bing

import json
import requests

from fastapi import ( FastAPI, WebSocket, WebSocketDisconnect, Request )
from fastapi.middleware.cors import CORSMiddleware
from typing import List

app = FastAPI()

origins = [
    "http://localhost:4200",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# manager class
class SocketManager:
    def __init__(self):
        self.active_connections: List[(WebSocket, str)] = []

    async def connect(self, websocket: WebSocket, user: str):
        await websocket.accept()
        self.active_connections.append((websocket, user))
        response = {
            "sender": user,
            "message": "got connected"
        }
        await self.broadcast(response)

    async def disconnect(self, websocket: WebSocket, user: str): # added async here
        self.active_connections.remove((websocket, user))
        response = {
            "sender": user,
            "message": "left"
        }
        await self.broadcast(response)

    async def broadcast(self, data):
        for connection in self.active_connections:
            await connection[0].send_json(data)

manager = SocketManager()

@app.get("/")
def index():
    return "BingAI - Client Server is running."

@app.post("/chat")
def chat(request: Request):
    data = request.json()
    message = data["message"]
    token = data["token"]
    cookie = json.load(open("./config/cookie.json", "r"))
    headers = {
        "Cookie": cookie,
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36"
    }
    url = "https://www.bing.com/chat/api/v1/conversation"
    payload = {
        "text": message,
        "token": token
    }
    response = requests.post(url, headers=headers, data=payload)
    return response.json()

@app.websocket("/api/chat")
async def chat(websocket: WebSocket):
    sender = websocket.cookies.get("X-Authorization")
    if sender:
        await manager.connect(websocket, sender)
        try:
            while True:
                data = await websocket.receive_json()
                await manager.broadcast(data)
        except WebSocketDisconnect:
            await manager.disconnect(websocket, sender) # added await here

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app)
