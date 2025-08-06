// Emotion Recognition App
class EmotionRecognitionApp {
  constructor() {
    this.isDetecting = false;
    this.detectionInterval = null;
    this.webcamStream = null;
    
    this.emotionColors = {
      angry: '#ff4757',
      disgust: '#2ed573',
      scared: '#5352ed',
      happy: '#ffa502',
      sad: '#3742fa',
      surprised: '#ff6b81',
      mewing: '#a4b0be'
    };
    
    this.init();
  }
  
  async init() {
    await this.setupWebcam();
    this.setupEventListeners();
    this.setupMockData();
  }
  
  async setupWebcam() {
    try {
      const video = document.getElementById('webcam');
      this.webcamStream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480 } 
      });
      video.srcObject = this.webcamStream;
      this.updateStatus('Webcam ready', 'success');
    } catch (error) {
      console.error('Error accessing webcam:', error);
      this.updateStatus('Webcam access denied', 'error');
    }
  }
  
  setupEventListeners() {
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    
    startBtn.addEventListener('click', () => this.startDetection());
    stopBtn.addEventListener('click', () => this.stopDetection());
  }
  
  setupMockData() {
    // Mock data for demonstration when backend is not available
    this.mockEmotions = [
      {
        dominant_emotion: "Happy",
        probabilities: {
          angry: 0.02,
          disgust: 0.01,
          scared: 0.10,
          happy: 0.72,
          sad: 0.05,
          surprised: 0.08,
          mewing: 0.02
        }
      },
      {
        dominant_emotion: "Surprised",
        probabilities: {
          angry: 0.05,
          disgust: 0.02,
          scared: 0.15,
          happy: 0.20,
          sad: 0.08,
          surprised: 0.45,
          mewing: 0.05
        }
      },
      {
        dominant_emotion: "Sad",
        probabilities: {
          angry: 0.08,
          disgust: 0.03,
          scared: 0.12,
          happy: 0.15,
          sad: 0.52,
          surprised: 0.07,
          mewing: 0.03
        }
      }
    ];
    this.mockIndex = 0;
  }
  
  async startDetection() {
    this.isDetecting = true;
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    
    startBtn.disabled = true;
    stopBtn.disabled = false;
    
    this.updateStatus('Detecting emotions...', 'detecting');
    
    // Start polling every second
    this.detectionInterval = setInterval(() => {
      this.fetchEmotionData();
    }, 1000);
    
    // Initial fetch
    this.fetchEmotionData();
  }
  
  stopDetection() {
    this.isDetecting = false;
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    
    startBtn.disabled = false;
    stopBtn.disabled = true;
    
    if (this.detectionInterval) {
      clearInterval(this.detectionInterval);
      this.detectionInterval = null;
    }
    
    this.updateStatus('Detection stopped', 'stopped');
  }
  
  async fetchEmotionData() {
    try {
      // Try to fetch from backend API
      const response = await fetch('/detect', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        this.updateEmotionDisplay(data);
      } else {
        throw new Error('Backend not available');
      }
    } catch (error) {
      // Use mock data when backend is not available
      console.log('Using mock data - backend not available');
      const mockData = this.mockEmotions[this.mockIndex];
      this.mockIndex = (this.mockIndex + 1) % this.mockEmotions.length;
      this.updateEmotionDisplay(mockData);
    }
  }
  
  updateEmotionDisplay(data) {
    // Update dominant emotion
    const dominantEmotion = document.getElementById('dominantEmotion');
    dominantEmotion.textContent = data.dominant_emotion;
    dominantEmotion.style.color = this.emotionColors[data.dominant_emotion.toLowerCase()] || '#ffffff';
    
    // Add pulse animation for high confidence
    const maxProb = Math.max(...Object.values(data.probabilities));
    if (maxProb > 0.5) {
      dominantEmotion.classList.add('high-confidence');
    } else {
      dominantEmotion.classList.remove('high-confidence');
    }
    
    // Update emotion bars
    const emotionBars = document.getElementById('emotionBars');
    const bars = emotionBars.querySelectorAll('.emotion-bar');
    
    bars.forEach(bar => {
      const emotion = bar.dataset.emotion;
      const probability = data.probabilities[emotion] || 0;
      const percentage = Math.round(probability * 100);
      
      const barFill = bar.querySelector('.bar-fill');
      const valueSpan = bar.querySelector('.emotion-value');
      
      // Update bar height and color
      barFill.style.height = `${percentage}%`;
      barFill.style.backgroundColor = this.emotionColors[emotion];
      
      // Update percentage text
      valueSpan.textContent = `${percentage}%`;
      
      // Add shimmer effect for active emotions
      if (percentage > 10) {
        barFill.classList.add('shimmer');
      } else {
        barFill.classList.remove('shimmer');
      }
    });
  }
  
  updateStatus(message, type) {
    const status = document.getElementById('status');
    status.textContent = message;
    status.className = `status-indicator ${type}`;
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new EmotionRecognitionApp();
});