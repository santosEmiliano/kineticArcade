import cv2
import mediapipe as mp
import os

class HandTracker:
    def __init__(self):
        # Initial configuration of MediaPipe when HandTracker class is instantiated.
        self.BaseOptions = mp.tasks.BaseOptions
        self.HandLandmarker = mp.tasks.vision.HandLandmarker
        self.HandLandmarkerOptions = mp.tasks.vision.HandLandmarkerOptions
        self.VisionRunningMode = mp.tasks.vision.RunningMode

        current_dir = os.path.dirname(os.path.abspath(__file__))
        model_path = os.path.join(current_dir, 'models', 'hand_landmarker.task')

        self.options = self.HandLandmarkerOptions(
            base_options = self.BaseOptions(model_asset_path = model_path),
            running_mode = self.VisionRunningMode.IMAGE,
            num_hands = 2,
            min_hand_detection_confidence = 0.7,
            min_hand_presence_confidence = 0.5,
            min_tracking_confidence = 0.5
        )
        self.landmarker = self.HandLandmarker.create_from_options(self.options)

    def start_camera(self):
        # Camera activation
        self.cap = cv2.VideoCapture(0)

        if not self.cap.isOpened():
            raise ValueError("No se pudo abrir la cámara")
            

    def stop_camera(self):
        # Camera deactivation
        self.cap.release()

    def process_frame(self):
        # Frame processing and returns landmarks
        with self.landmarker:
            ret, frame = self.cap.read()
            if not ret:
                raise ValueError("No se pudo leer el frame")
        
            frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            mp_image = mp.Image(image_format = mp.ImageFormat.SRGB, data = frame_rgb)

            results = self.landmarker.detect(mp_image)
            return results
