from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

app = FastAPI()

# Rota para a página inicial
@app.get("/")
def read_root():
    return {"message": "Bem-vindo ao AnswerAI!"}

# Configuração para servir arquivos estáticos (como o favicon)
app.mount("/static", StaticFiles(directory="static"), name="static")

# Se você quiser, pode adicionar mais rotas, como a de responder às perguntas:
@app.post("/responder/")
async def responder(pergunta: dict):
    import openai
    openai.api_key = "SEU_API_AQUI"  # Substitua pela sua chave da OpenAI
    
    resposta = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": pergunta["pergunta"]}]
    )
    return {"resposta": resposta['choices'][0]['message']['content']}
