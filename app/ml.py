
# Simple CNN + LSTM model using TensorFlow/Keras
import os
from typing import List
import numpy as np
from tensorflow.keras.models import Model, load_model
from tensorflow.keras.layers import (Input, Conv2D, MaxPooling2D, Flatten,
                                     Dense, TimeDistributed, LSTM)
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.callbacks import ModelCheckpoint

MODEL_DIR = os.path.join(os.getcwd(), 'saved_models')
os.makedirs(MODEL_DIR, exist_ok=True)

def build_cnn_feature_extractor(input_shape=(224,224,3), feature_dim=256):
    inp = Input(shape=input_shape)
    x = Conv2D(32, (3,3), activation='relu', padding='same')(inp)
    x = MaxPooling2D((2,2))(x)
    x = Conv2D(64, (3,3), activation='relu', padding='same')(x)
    x = MaxPooling2D((2,2))(x)
    x = Conv2D(128, (3,3), activation='relu', padding='same')(x)
    x = MaxPooling2D((2,2))(x)
    x = Flatten()(x)
    x = Dense(feature_dim, activation='relu')(x)
    model = Model(inputs=inp, outputs=x, name='cnn_feature_extractor')
    return model


def build_cnn_lstm(time_steps=5, input_shape=(224,224,3)):
    # TimeDistributed CNN -> LSTM -> Dense
    cnn = build_cnn_feature_extractor(input_shape=input_shape)

    seq_inp = Input(shape=(time_steps,)+input_shape)
    td = TimeDistributed(cnn)(seq_inp)  # (batch, time, features)
    x = LSTM(128)(td)
    x = Dense(64, activation='relu')(x)
    out = Dense(2, activation='softmax')(x)
    model = Model(inputs=seq_inp, outputs=out, name='cnn_lstm')
    model.compile(optimizer=Adam(1e-4), loss='sparse_categorical_crossentropy', metrics=['accuracy'])
    return model


def train_model(train_sequences: np.ndarray, train_labels: np.ndarray,
                val_sequences: np.ndarray, val_labels: np.ndarray,
                name: str = 'regenova_model', epochs: int = 10, batch_size: int = 8):
    # train_sequences: shape (N, time_steps, H, W, C)
    model = build_cnn_lstm(time_steps=train_sequences.shape[1])
    ckpt = ModelCheckpoint(os.path.join(MODEL_DIR, name + '.h5'), save_best_only=True, monitor='val_accuracy', mode='max')
    model.fit(train_sequences, train_labels, validation_data=(val_sequences, val_labels), epochs=epochs, batch_size=batch_size, callbacks=[ckpt])
    return os.path.join(MODEL_DIR, name + '.h5')


def load_trained_model(path: str):
    return load_model(path)


def predict_sequence(model, seq: np.ndarray):
    # seq shape (1, time_steps, H, W, C)
    preds = model.predict(seq)
    return np.argmax(preds, axis=1)[0], preds

