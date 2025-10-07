
import os
import shutil
import pytest
from fastapi.testclient import TestClient
from app.main import app
import cv2
import numpy as np

client = TestClient(app)

@pytest.fixture(scope="module")
def test_data_dir():
    test_dir = "/Users/sakshammishra/Regenova/tests/test_data"
    os.makedirs(test_dir, exist_ok=True)
    
    # Create dummy image files
    img = np.zeros((100, 100, 3), dtype=np.uint8)
    cv2.imwrite(os.path.join(test_dir, "test_img.png"), img)
    
    yield test_dir
    
    shutil.rmtree(test_dir)

def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Regenova Backend Running"}

def test_upload_image(test_data_dir):
    img_path = os.path.join(test_data_dir, "test_img.png")
    with open(img_path, "rb") as f:
        response = client.post("/api/upload-image", files={"file": ("test_img.png", f, "image/png")})
    
    assert response.status_code == 200
    json_response = response.json()
    assert "file_path" in json_response
    assert os.path.exists(json_response["file_path"])
    os.remove(json_response["file_path"])

def test_list_models():
    response = client.get("/api/models")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
