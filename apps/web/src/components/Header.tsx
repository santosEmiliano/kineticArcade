interface HeaderProps {
  cameraStatus: boolean;
  setCameraStatus: (status: boolean) => void;
}

export default function Header({ cameraStatus, setCameraStatus }: HeaderProps) {

  const toggleCameraStatus = () => {
    setCameraStatus(!cameraStatus);
  }

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
          <button
            onClick={toggleCameraStatus}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span
                className={`absolute inline-flex h-full w-full rounded-full ${cameraStatus
                  ? 'bg-green-400 opacity-75 animate-ping'
                  : 'bg-red-400 opacity-75'
                  }`}
              ></span>
              <span
                className={`relative inline-flex rounded-full h-2.5 w-2.5 ${cameraStatus ? 'bg-green-500' : 'bg-red-500'
                  }`}
              ></span>
            </span>
            <span
              className={`text-xs font-medium uppercase tracking-wider transition-colors duration-300 ${
                cameraStatus
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}
            >
              {cameraStatus ? 'Camera Online' : 'Camera Offline'}
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}
