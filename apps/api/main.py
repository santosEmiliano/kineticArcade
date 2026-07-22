from fastapi import FastAPI, WebSocket, WebSocketDisconnect
import asyncio

from services.tracker import HandTracker

app = FastAPI()

@app.get('/')
def read_root():
    return {"message": "FastAPI Running"}

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    
    tracker = HandTracker()
    tracker.start_camera()

    try:
        while True:
            handLandmarkers = tracker.process_frame()
            
            if handLandmarkers is not None:
                for hand_landmarks in handLandmarkers.hand_landmarks:
                    print(hand_landmarks, flush=True)
            
            await asyncio.sleep(0.01)

    except WebSocketDisconnect:
        tracker.stop_camera()
    finally:
        tracker.stop_camera()