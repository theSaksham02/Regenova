
import cv2
import numpy as np
from pathlib import Path
from typing import List
from tensorflow.keras.utils import img_to_array

IMG_SIZE = (224, 224)

def load_and_preprocess(img_path: str):
    img = cv2.imread(img_path, cv2.IMREAD_COLOR)
    if img is None:
        raise ValueError(f'Image not found: {img_path}')
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img = cv2.resize(img, IMG_SIZE)
    img = img.astype('float32') / 255.0
    return img

def load_sequence(image_paths: List[str]):
    # returns numpy array shape (time_steps, H, W, C)
    frames = [load_and_preprocess(p) for p in image_paths]
    return np.stack(frames, axis=0)

