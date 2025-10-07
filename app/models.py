
from pydantic import BaseModel
from typing import Optional

class TrainRequest(BaseModel):
    name: str
    epochs: int = 10
    batch_size: int = 16
    learning_rate: float = 0.001

class PredictRequest(BaseModel):
    # path to uploaded image(s) or base64 encoded image
    file_path: str

class ModelInfo(BaseModel):
    id: int
    name: str
    path: str
    metadata: Optional[str]

