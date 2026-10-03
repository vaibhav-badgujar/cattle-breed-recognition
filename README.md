# 🐄 Indian Cattle & Buffalo Breed Recognition

An AI-based web application that identifies **Indian cattle and buffalo breeds from images** using deep learning and computer vision.

## 🚀 Features

- 🐄 Detects whether the uploaded image contains cattle or buffalo.
- 🤖 Predicts the breed using **EfficientNet-B0**.
- 📊 Provides prediction confidence.
- 🔥 Uses **Grad-CAM** for model explainability.
- 🌐 FastAPI backend with React + Vite frontend.
- 📚 Displays breed-related information.

## 🛠️ Tech Stack

- **Frontend:** React, Vite
- **Backend:** FastAPI, Python
- **ML:** PyTorch, EfficientNet-B0
- **Object Detection:** YOLO-World
- **Dataset:** Indian Bovine Breeds
- **Tools:** Google Colab, Git, GitHub

## 🧠 Model

- Architecture: **EfficientNet-B0**
- Classes: **41 Indian cattle and buffalo breeds**
- Input Size: **224 × 224**
- Training: Transfer Learning
- Validation Accuracy: **53.46%**

## 🔄 How It Works

```text
Upload Image
     ↓
YOLO-World Bovine Validation
     ↓
EfficientNet-B0
     ↓
Breed Prediction
     ↓
Confidence + Breed Information
```

## ▶️ Run Locally

### Backend

```bash
pip install -r requirements.txt
uvicorn backend.app.main:app --reload
```

API:

```text
http://127.0.0.1:8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## 📁 Project Structure

```text
backend/       → FastAPI backend
frontend/      → React frontend
ml/            → Machine learning code
models/        → Trained model
colab_run_all.ipynb → Training notebook
requirements.txt
```

## 🎯 Objective

To develop an AI-based system that can automatically recognize Indian cattle and buffalo breeds from images and provide an easy-to-use web interface for prediction.

## 👨‍💻 Project

**Indian Cattle & Buffalo Breed Recognition System**