
1) Prepare your data
- Create folder structure:
  data/train/iPSC/seq_01/frame1.png ... frame5.png
  data/train/NPSC/seq_01/frame1.png ... frame5.png

2) Start server
- uvicorn main:app --reload --port 8000

3) Train
- POST to /api/train with JSON body: {"name":"trial1","epochs":5,"time_steps":5}

4) Upload image
- POST to /api/upload-image with form field 'file'

5) Predict
- POST to /api/predict with JSON body: {"file_path":"data/uploads/<file>"}

