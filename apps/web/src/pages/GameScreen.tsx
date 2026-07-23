import { useParams, useNavigate } from 'react-router-dom';

export default function GameScreen() {
  const { gameId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] animate-in fade-in zoom-in duration-500">
      <h1 className="text-5xl font-bold uppercase tracking-widest text-indigo-500">{gameId}</h1>
      <p className="mt-4 text-slate-400">El motor del juego se cargará aquí...</p>
      
      <button 
        onClick={() => navigate('/')}
        className="mt-10 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-colors"
      >
        ← Volver a la Galería
      </button>
    </div>
  );
}