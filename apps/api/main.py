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

    # Task 1: Continuously read camera frames and send landmarks to client
    async def camera_loop():
        while True:
            results = tracker.process_frame()    

            if results.hand_landmarks:
                for hand_landmarks in results.hand_landmarks:
                    await websocket.send_text(str(hand_landmarks))
            
            await asyncio.sleep(0.01) # Yield control to the event loop

    # Task 2: Listen for client disconnection to trigger shutdown
    async def watch_disconnect():
        try:
            while True:
                await websocket.receive()
        except WebSocketDisconnect:
            pass
    
    camera_task = asyncio.create_task(camera_loop())
    watch_task = asyncio.create_task(watch_disconnect())

    try:
        # Wait until either the client disconnects or the camera fails
        done, pending = await asyncio.wait(
            {camera_task, watch_task},
            return_when = asyncio.FIRST_COMPLETED
        )
        for task in pending:
            task.cancel()
    finally:
        tracker.stop_camera()