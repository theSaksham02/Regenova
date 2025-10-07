
from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from app import db
from app import utils, ml
import os
import uuid
import numpy as np

router = APIRouter()

# Initialize DB on import
db.init_db()

DATA_DIR = os.path.join(os.getcwd(), 'data')
UPLOAD_DIR = os.path.join(DATA_DIR, 'uploads')
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post('/upload-image')
async def upload_image(file: UploadFile = File(...)):
    ext = os.path.splitext(file.filename)[1]
    if ext.lower() not in ['.jpg', '.jpeg', '.png', '.tif']:
        raise HTTPException(status_code=400, detail='Unsupported file type')
    uid = str(uuid.uuid4())
    save_path = os.path.join(UPLOAD_DIR, uid + ext)
    with open(save_path, 'wb') as f:
        content = await file.read()
        f.write(content)
    return {'file_path': save_path}

@router.post('/train')
async def train_model(request: dict):
    # Expect request to contain: name, epochs, batch_size, and a directory path under data/train with subfolders 'iPSC' and 'NPSC'
    name = request.get('name', 'regenova')
    epochs = int(request.get('epochs', 10))
    batch_size = int(request.get('batch_size', 8))
    train_dir = request.get('train_dir', os.path.join(DATA_DIR, 'train'))

    # Very simple loader: expects sequences of fixed length saved in subfolders
    time_steps = int(request.get('time_steps', 5))
    X = []
    y = []
    label_map = {'iPSC':0, 'NPSC':1}

    for label_name, lbl in label_map.items():
        class_dir = os.path.join(train_dir, label_name)
        if not os.path.exists(class_dir):
            continue
        # assume each sequence in a subfolder
        for seq_folder in os.listdir(class_dir):
            seq_path = os.path.join(class_dir, seq_folder)
            if not os.path.isdir(seq_path):
                continue
            frames = sorted([os.path.join(seq_path, p) for p in os.listdir(seq_path)])
            if len(frames) < time_steps:
                continue
            frames = frames[:time_steps]
            seq = utils.load_sequence(frames)
            X.append(seq)
            y.append(lbl)

    if len(X) == 0:
        raise HTTPException(status_code=400, detail='No training sequences found. Place sequences under data/train/{iPSC,NPSC}/{sequence_folder}/frame1.png...')

    X = np.stack(X, axis=0)
    y = np.array(y)
    # simple split
    split = int(0.8 * len(X))
    train_X, val_X = X[:split], X[split:]
    train_y, val_y = y[:split], y[split:]

    model_path = ml.train_model(train_X, train_y, val_X, val_y, name=name, epochs=epochs, batch_size=batch_size)

    # store record in DB
    session = db.SessionLocal()
    rec = db.ModelRecord(name=name, path=model_path)
    session.add(rec)
    session.commit()
    session.refresh(rec)
    session.close()

    return {'status': 'trained', 'model_path': model_path}

@router.post('/predict')
async def predict(file_path: str):
    # expects uploaded file path (single sequence folder or a single image)
    if os.path.isdir(file_path):
        frames = sorted([os.path.join(file_path, p) for p in os.listdir(file_path)])
        seq = utils.load_sequence(frames[:5])
        seq = np.expand_dims(seq, axis=0)
    else:
        # treat single image as sequence length 1 -> pad to 5 by repeating
        img = utils.load_and_preprocess(file_path)
        seq = np.stack([img]*5, axis=0)
        seq = np.expand_dims(seq, axis=0)

    # load latest model
    session = db.SessionLocal()
    rec = session.query(db.ModelRecord).order_by(db.ModelRecord.created_at.desc()).first()
    session.close()
    if not rec:
        raise HTTPException(status_code=400, detail='No model available. Train a model first.')
    model = ml.load_trained_model(rec.path)
    cls, probs = ml.predict_sequence(model, seq)
    label_map = {0:'iPSC',1:'NPSC'}
    return {'prediction': label_map.get(cls, 'unknown'), 'probs': probs.tolist()}

@router.get('/models')
def list_models():
    session = db.SessionLocal()
    recs = session.query(db.ModelRecord).order_by(db.ModelRecord.created_at.desc()).all()
    session.close()
    out = [{'id': r.id, 'name': r.name, 'path': r.path, 'created_at': r.created_at.isoformat()} for r in recs]
    return JSONResponse(content=out)

