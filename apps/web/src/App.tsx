import Header from './components/Header';
import GameGallery from './components/GameGallery';
import { HandOverlay } from './components/HandOverlay';
import { VirtualCursor } from './components/VirtualCursor';

import { useEffect, useState } from 'react';

function App() {

  const [hands, setHands] = useState(null);
  const [cameraStatus, setCameraStatus] = useState(false);
  const [isPinching, setIsPinching] = useState(false);

  const evaluatePinch = (landmarks) => {
    const indexTip = landmarks[8];
    const thumbTip = landmarks[4];
    const distance = Math.sqrt(
      Math.pow(indexTip.x - thumbTip.x, 2) + Math.pow(indexTip.y - thumbTip.y, 2)
    );

    setIsPinching(distance < 0.05)
  }

  useEffect(() => {
    if (!cameraStatus) return;

    const socket = new WebSocket('ws://localhost:8000/ws');
    
    socket.addEventListener("open", () => {
      console.log("Conexión exitosa al servidor.");
    });

    socket.addEventListener("message", (event: MessageEvent) => {
      try{
        const message = JSON.parse(event.data);
        setHands(message);
        evaluatePinch(message);
      } catch (error) {
        console.error("Fallo al parsear las coordenadas de tus manos", error)
      }
    })

    return () => {
      socket.close();
      setHands(null)
    }
  }, [cameraStatus])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans selection:bg-indigo-500/30">
      <VirtualCursor x={hands?.[8]?.x} y={hands?.[8]?.y} isPinching={isPinching} />
      <HandOverlay landmarks={hands} />
      <Header cameraStatus={cameraStatus} setCameraStatus={setCameraStatus}/>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight">Game Library</h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400 max-w-2xl">
            Select a classic arcade game to play using real-time hand gesture controls.
          </p>
        </div>
        <GameGallery />
      </main>
    </div>
  )
}

export default App
