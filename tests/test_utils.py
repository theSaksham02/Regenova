
import os
import shutil
import pytest
import numpy as np
import cv2
from app.utils import load_and_preprocess, load_sequence, IMG_SIZE

@pytest.fixture(scope="module")
def test_image_files():
    test_dir = "/Users/sakshammishra/Regenova/tests/test_images"
    os.makedirs(test_dir, exist_ok=True)
    
    img_paths = []
    for i in range(5):
        path = os.path.join(test_dir, f"img_{i}.png")
        img = np.random.randint(0, 256, (100, 100, 3), dtype=np.uint8)
        cv2.imwrite(path, img)
        img_paths.append(path)
        
    yield img_paths
    
    shutil.rmtree(test_dir)

def test_load_and_preprocess(test_image_files):
    img_path = test_image_files[0]
    img = load_and_preprocess(img_path)
    
    assert isinstance(img, np.ndarray)
    assert img.shape == (IMG_SIZE[0], IMG_SIZE[1], 3)
    assert img.dtype == np.float32
    assert np.max(img) <= 1.0
    assert np.min(img) >= 0.0

def test_load_sequence(test_image_files):
    sequence = load_sequence(test_image_files)
    
    assert isinstance(sequence, np.ndarray)
    assert sequence.shape == (len(test_image_files), IMG_SIZE[0], IMG_SIZE[1], 3)
    assert sequence.dtype == np.float32
