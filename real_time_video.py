from flask import Flask, jsonify
from keras.models import load_model
from keras.preprocessing.image import img_to_array
import cv2
import numpy as np

app = Flask(__name__)


face_detection = cv2.CascadeClassifier("C:/Users/Maheen/Desktop/emotion_recog/haarcascade_frontalface_default.xml")
emotion_classifier = load_model("C:/Users/Maheen/Desktop/emotion_recog/_mini_XCEPTION.102-0.66.hdf5", compile=False)


EMOTIONS = ["angry", "disgust", "scared", "happy", "sad", "surprised", "Mewing"]

@app.route('/detect', methods=['GET'])
def detect_emotion():

    cap = cv2.VideoCapture(0)
    ret, frame = cap.read()
    cap.release()

    if not ret:
        return jsonify({
            "dominant_emotion": "None",
            "error": "Could not access webcam"
        }), 500

   
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_detection.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

    if len(faces) == 0:
        return jsonify({
            "dominant_emotion": "None",
            "probabilities": {e: 0.0 for e in EMOTIONS},
            "message": "No face detected"
        })

    
    (fX, fY, fW, fH) = sorted(faces, key=lambda x: x[2]*x[3], reverse=True)[0]
    roi = gray[fY:fY+fH, fX:fX+fW]
    roi = cv2.resize(roi, (64, 64))
    roi = roi.astype("float") / 255.0
    roi = img_to_array(roi)
    roi = np.expand_dims(roi, axis=0)

  
    preds = emotion_classifier.predict(roi)[0]
    dominant_emotion = EMOTIONS[np.argmax(preds)]

   
    response = {
        "dominant_emotion": dominant_emotion,
        "probabilities": {
            emotion: float(round(prob, 4)) for emotion, prob in zip(EMOTIONS, preds)
        }
    }

    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
