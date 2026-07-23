import cv2
import mediapipe as mp
import os
import time

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
            running_mode = self.VisionRunningMode.VIDEO,
            num_hands = 2,
            min_hand_detection_confidence = 0.7,
            min_hand_presence_confidence = 0.5,
            min_tracking_confidence = 0.5
        )
        # Instantiate the landmarker once to preserve the computation graph
        self.landmarker = self.HandLandmarker.create_from_options(self.options)

    def start_camera(self):
        # Camera activation
        self.cap = cv2.VideoCapture(0)

        if not self.cap.isOpened():
            raise ValueError("No se pudo abrir la cámara")
            

    def stop_camera(self):
        # Camera deactivation
        self.cap.release()
        self.landmarker.close()

    def process_frame(self):
        # Frame processing and returns landmarks
        ret, frame = self.cap.read()
        if not ret:
            raise ValueError("No se pudo leer el frame")

        # Required on macOS to prevent the OpenCV camera buffer from freezing
        cv2.waitKey(1) 

        frame = cv2.flip(frame, 1)

        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        mp_image = mp.Image(image_format = mp.ImageFormat.SRGB, data = frame_rgb)

        # VIDEO mode requires monotonically increasing timestamps
        timestamp_ms = int(time.time() * 1000)
        results = self.landmarker.detect_for_video(mp_image, timestamp_ms)
        
        return results
