# 🧠 EEG Signal-Based Stress Level Detection and Analysis

## 📌 Overview

This project focuses on detecting human stress levels using EEG (Electroencephalogram) signals. By analyzing brainwave patterns such as Alpha, Beta, and Theta waves, we classify stress levels using machine learning techniques.

The system integrates MATLAB-based signal processing with a web interface to display results in a simple and user-friendly way.

---

## 🎯 Objectives

* Analyze EEG signals to detect stress levels
* Extract meaningful features from brainwave data
* Classify stress levels using machine learning models
* Display results on a web-based interface

---

## 📂 Dataset

We used the EEGMAT dataset from PhysioNet:

🔗 https://physionet.org/content/eegmat/1.0.0/

### Dataset Details:

* EEG recordings during mental arithmetic tasks
* 36 participants (Age: 18–26)
* 23-channel EEG (10–20 system)
* Labels:

  * Relaxed (Background)
  * Stress (Arithmetic Task)

---

## ⚙️ Methodology

### 1. Data Acquisition

* EEG signals collected using 10–20 electrode placement system

### 2. Preprocessing

* Band-pass filtering (0.5–45 Hz)
* Noise and artifact removal
* Signal normalization

### 3. Feature Extraction

* Power Spectral Density (PSD)
* Band Ratios (Alpha, Beta, Theta)
* Statistical features

### 4. Classification

* Machine Learning models:

  * SVM (Support Vector Machine)
  * KNN (K-Nearest Neighbors)

### 5. Output

* Stress Level (Low / Medium / High)
* Confidence Score
* EEG feature values

---

## 🌐 Web Interface

A simple web application is developed to display MATLAB outputs.

### Features:

* Displays stress level
* Shows confidence percentage
* Visualizes EEG band values
* Clean and minimal UI

---

## 🔗 MATLAB to Web Integration

MATLAB processes EEG data and exports results as a JSON file:

```json
{
  "stress_level": "High",
  "confidence": 87,
  "alpha": 0.32,
  "beta": 0.67,
  "theta": 0.21
}
```

The website reads this JSON file and displays results dynamically.

---

## 🚀 Deployment

The website is hosted using GitHub Pages.

### Steps:

1. Upload project files to GitHub repository
2. Enable GitHub Pages in settings
3. Access the live website via provided link

---

## 📁 Project Structure

```
stress-detection-website/
│
├── index.html
├── style.css
├── script.js
├── output.json
└── README.md
```

---

## 🛠️ Tools & Technologies

* MATLAB (Signal Processing & ML)
* HTML, CSS, JavaScript (Frontend)
* GitHub Pages (Deployment)

---

## 📊 Results

* Accurate classification of stress levels using EEG signals
* Real-time-like visualization through web interface
* Demonstrates integration of biomedical signal processing and web technologies

---

## 🔮 Future Scope

* Real-time EEG data acquisition
* Integration with wearable devices
* Deep learning models (CNN, LSTM)
* Mobile application for stress monitoring

---

## 👨‍💻 Team Members

* Shaik Anees Ahamed
* Chireddy Madhava Reddy
* D Divya Reddy

---

## 👩‍🏫 Guide

Prof. Keerthana HM

---

## 📜 Conclusion

EEG-based stress detection provides a reliable and non-invasive method to monitor mental health. This project demonstrates how machine learning and signal processing can be combined with web technologies for practical applications.

---
