import Header from './components/Header';
import { HandOverlay } from './components/HandOverlay';
import { VirtualCursor } from './components/VirtualCursor';
import Home from './pages/Home'
import GameScreen from './pages/GameScreen'

import { useEffect, useState, useRef } from 'react';
import { Routes, Route } from 'react-router-dom'

function App() {

  const [hands, setHands] = useState<any>(null);
  const [cameraStatus, setCameraStatus] = useState(false);
  const [isPinching, setIsPinching] = useState(false);
  
  const scrollStartY = useRef<number | null>(null);


  const evaluatePinch = (landmarks) => {
    const indexTip = landmarks[8];
    const thumbTip = landmarks[4];
    const distance = Math.sqrt(
      Math.pow(indexTip.x - thumbTip.x, 2) + Math.pow(indexTip.y - thumbTip.y, 2)
    );

    setIsPinching(distance < 0.05)
  }

  useEffect(() => {
    if (!hands) return;

    const isFist = (
      hands[8].y > hands[6].y &&   
      hands[12].y > hands[10].y && 
      hands[16].y > hands[14].y && 
      hands[20].y > hands[18].y    
    );

    if (isFist) {
      if (scrollStartY.current === null) {
        scrollStartY.current = hands[9].y;
      } else {
        const deltaY = hands[9].y - scrollStartY.current;
        window.scrollBy(0, deltaY * -500);
        scrollStartY.current = hands[9].y;
      }
    } else {
      scrollStartY.current = null;
      evaluatePinch(hands);
    }
  }, [hands]);

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
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:gameId" element={<GameScreen />} />
      </Routes>
    </div>
  )
}

export default App
