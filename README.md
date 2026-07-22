# KineticArcade

> A modern, interactive web-based game gallery where you are the controller. Play classic arcade games using nothing but your hands and computer vision.

<!-- Placeholder for future banner  ![KineticArcade Banner](https://via.placeholder.com/1200x400?text=KineticArcade+-+Gesture+Controlled+Gaming) -->

## 🚀 About The Project

KineticArcade is an experimental web application that bridges the gap between classic arcade gaming and modern computer vision. Instead of using a keyboard or mouse, players control games using hand gestures captured by a webcam.
The project uses **MediaPipe** to detect 21 3D landmarks on the player's hands in real-time. These coordinates are streamed instantly via **WebSockets** to a **React** frontend, translating physical movements into in-game actions seamlessly.

### ✨ Features

- **Zero-Touch Control:** Play games entirely through hand tracking.
- **Real-Time Responsiveness:** Powered by WebSockets for ultra-low latency between gestures and game actions.
- **Modern UI/UX:** A sleek, animated game gallery built with React, Vite, and TailwindCSS.
- **Privacy-First Approach:** The raw video feed is processed locally; only coordinate data is sent to the game interface to render virtual hands/pointers.

## 🏗️ Architecture

The project is decoupled into a robust Backend for AI processing and a lightning-fast Frontend for rendering.

- **Frontend:**
  - React + Vite
  - TailwindCSS
  - Framer Motion
  - HTML5 Canvas
- **Backend:**
  - Python 3
  - FastAPI
  - OpenCV
  - MediaPipe

## 🗺️ Roadmap

- [ ] Project Setup & Architecture Boilerplate
- [ ] Backend: Webcam integration & MediaPipe Hand Tracking setup
- [ ] Backend: WebSocket Server implementation
- [ ] Frontend: WebSocket Client & Virtual Hand (Landmarks) rendering
- [ ] Frontend: UI/UX Gallery implementation
- [ ] **Game 1:** Pong (Vertical/Horizontal hand movement)
- [ ] **Game 2:** Space Invaders (Pinch to shoot, move hand to steer)
- [ ] **Game 3:** Tetris (Swipe gestures to move/rotate blocks)

## 🛠️ Installation & Setup

_(Instructions coming soon as the project is developed)_
