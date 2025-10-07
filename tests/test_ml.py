
import pytest
import numpy as np
from app.ml import build_cnn_feature_extractor, build_cnn_lstm, predict_sequence
from tensorflow.keras.models import Model

def test_build_cnn_feature_extractor():
    input_shape = (224, 224, 3)
    feature_dim = 256
    model = build_cnn_feature_extractor(input_shape=input_shape, feature_dim=feature_dim)
    
    assert isinstance(model, Model)
    
    dummy_input = np.random.rand(1, *input_shape)
    output = model.predict(dummy_input)
    
    assert output.shape == (1, feature_dim)

def test_build_cnn_lstm():
    time_steps = 5
    input_shape = (224, 224, 3)
    model = build_cnn_lstm(time_steps=time_steps, input_shape=input_shape)
    
    assert isinstance(model, Model)
    
    dummy_input = np.random.rand(1, time_steps, *input_shape)
    output = model.predict(dummy_input)
    
    assert output.shape == (1, 2)  # 2 classes: iPSC, NPSC

def test_predict_sequence():
    time_steps = 5
    input_shape = (224, 224, 3)
    model = build_cnn_lstm(time_steps=time_steps, input_shape=input_shape)
    
    dummy_sequence = np.random.rand(1, time_steps, *input_shape)
    
    cls, probs = predict_sequence(model, dummy_sequence)
    
    assert isinstance(cls, np.int64)
    assert isinstance(probs, np.ndarray)
    assert probs.shape == (1, 2)
