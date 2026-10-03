# 🐄 Image-Based Indian Cattle & Buffalo Breed Recognition System

An AI-powered web application that identifies Indian cattle and buffalo breeds from images using Deep Learning. The system provides accurate breed prediction along with detailed breed information through a modern web interface.

---

## 📌 Features

- AI-powered breed prediction
- Upload image using drag & drop
- Image preview before prediction
- Top prediction with confidence score
- Detailed breed information
- Breed characteristics
- Prediction history
- Download prediction report (PDF)
- Responsive UI
- Modern dashboard
- REST API integration
- Deep Learning model
- Fast prediction

---

## 🛠 Tech Stack

### Frontend
- React.js
- HTML5
- CSS3
- JavaScript
- Axios
- React Router
- jsPDF
- html2canvas

### Backend
- FastAPI
- Python
- Uvicorn

### Machine Learning
- PyTorch
- EfficientNet-B0
- timm
- torchvision
- NumPy
- Pillow

### Tools
- VS Code
- Google Colab
- Git
- GitHub

---

## 📂 Project Structure

```text
project-root/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── app.py
│   ├── routes/
│   └── requirements.txt
│
├── ml/
│   ├── model/
│   ├── inference.py
│   └── train.ipynb
│
├── data/
│
├── output/
│
├── Cattle_Resized/
│
└── README.md
```

---

## Supported Breeds

- Gir
- Sahiwal
- Red Sindhi
- Tharparkar
- Ongole
- Kankrej
- Murrah
- Nili Ravi
- etc.


---

## Workflow

1. Upload an image
2. Image preprocessing
3. Deep Learning model prediction
4. Confidence calculation
5. Display predicted breed
6. Display detailed breed information
7. Download PDF report

---



## Dataset

The model is trained using Indian cattle and buffalo breed images collected from publicly available datasets and curated image sources.

---

## Future Improvements

- Mobile App
- Multi-language support
- Breed comparison
- Grad-CAM visualization
- Disease detection
- Animal health recommendations
- Cloud deployment

---

## Performance

| Metric | Value |
|---------|-------|
| Model | EfficientNet-B0 |
| Framework | PyTorch |
| Image Size | 224×224 |
| Prediction Time | <1 second (approx.) |

(Add your actual accuracy if you know it.)

---

## License

This project is developed for educational and academic purposes.

---

## Authors

**Vaibhav Badgujar**

Final Year Computer Engineering

R. C. Patel Institute of Technology

---

## Acknowledgements

- PyTorch
- FastAPI
- React
- Google Colab
- Kaggle Datasets