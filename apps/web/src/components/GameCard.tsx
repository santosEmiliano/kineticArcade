import { useNavigate } from "react-router-dom";

interface GameCardProps {
  title: string;
  id: string;
  image: string;
}

export default function GameCard({ title, id, image }: GameCardProps) {
  const navigate = useNavigate()

  return (
    <div className="group flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden hover:shadow-xl hover:shadow-slate-200/10 dark:hover:shadow-black/50 hover:-translate-y-1 transition-all duration-300">
      
      {/* Image container */}
      <div className="aspect-[16/9] w-full bg-slate-100 dark:bg-slate-800 overflow-hidden relative border-b border-slate-100 dark:border-slate-800">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        {/* Subtle overlay when mouse-hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      {/* Text and button container */}
      <div className="p-6 flex items-center justify-between flex-1">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Gesture controlled
          </p>
        </div>
        
        <button 
          className="px-5 py-2.5 bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-sm font-medium rounded-xl hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-sm active:scale-95"
          onClick={() => navigate(`/game/${id}`)}
        >
          Play
        </button>
      </div>
    </div>
  )
}
