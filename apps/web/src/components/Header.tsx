export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Simple yet formal logo */}
          <span className="text-xl font-extrabold tracking-tight">
            Kinetic<span className="text-slate-500 font-light">Arcade</span>
          </span>
        </div>
        
        {/* Camera status indicator (Default Design) */}
        <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
          </span>
          <span className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
            Camera Offline
          </span>
        </div>
      </div>
    </header>
  )
}
