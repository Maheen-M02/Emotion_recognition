# 🎭 Emotion Recognition in Video Calls

## 📖 Overview  
This project detects and classifies **human emotions in real-time during video calls** using computer vision and deep learning.  
It captures facial expressions from live video streams, processes them frame by frame, and predicts emotions such as:  
**Happy 😄, Sad 😢, Angry 😠, Surprised 😲, Neutral 😐, Disgust 🤢, and Fear 😨.**

Emotion recognition enhances **virtual communication**, **mental health monitoring**, **customer support**, and **interactive education** by allowing systems to better interpret human emotions.

---

## 🧠 Features  
- 🎥 **Real-Time Emotion Detection:** Recognizes facial emotions continuously during live video calls.  
- 🤖 **Facial Expression Analysis:** Uses face detection and CNN-based emotion classification.  
- 🔊 **Emotion Overlay:** Displays emotion labels or emojis on participants’ video feeds.  
- 🧩 **Integration Ready:** Can be embedded into platforms like Zoom, Google Meet, or custom WebRTC apps.  
- 📊 **Analytics Dashboard (optional):** Visualizes emotional trends throughout a session.

---

## ⚙️ Tech Stack  
| Component | Technology Used |
|------------|-----------------|
| **Frontend** | HTML, CSS, JavaScript / React |
| **Backend** | Python (Flask / FastAPI) |
| **AI Model** | CNN / DeepFace / FER2013 |
| **Video Processing** | OpenCV, MediaPipe, WebRTC |
| **Visualization** | Matplotlib / Plotly |

---

## 🧩 Model Pipeline  
1. **Face Detection:** Detect faces in live video frames using OpenCV or MediaPipe.  
2. **Preprocessing:** Crop, resize, and normalize detected faces.  
3. **Emotion Classification:** Predict emotion using a trained CNN or DeepFace model.  
4. **Overlay:** Display emotion label or emoji in real-time on the video stream.  
5. **Logging (optional):** Save emotional data for analytics or future insights.

---

## 🚀 Installation & Setup  

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/your-username/emotion-recognition-video-calls.git
cd emotion-recognition-video-calls
```
### 2️⃣ Install Dependencies
```bash
pip install -r requirements.txt
```
### 3️⃣ Run the Application
```bash
python app.py
```
### 4️⃣ Access in Browser
Go to http://localhost:5000
 or your deployed server URL.

### 🧪 Datasets Used

FER2013 Dataset
AffectNet
 (optional)
CK+ (Cohn-Kanade)


## 👨‍💻 Contributors

Maheen Meshram – Project Lead & Developer

##🪪 License

This project is licensed under the MIT License.
You are free to use, modify, and distribute it for educational or research purposes.

##🌟 Acknowledgements

Special thanks to the open-source community and libraries like:
OpenCV, DeepFace, MediaPipe, and TensorFlow/PyTorch for enabling real-time emotion recognition.
