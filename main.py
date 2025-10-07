
from fastapi import FastAPI
from app.api import router as api_router

app = FastAPI(title='Regenova Backend', version='0.1')
app.include_router(api_router, prefix='/api')

@app.get('/')
def root():
    return {"message": "Regenova Backend Running"}
