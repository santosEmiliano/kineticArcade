import React from 'react';

interface VirtualCursorProps {
  x: number; // X coordinate of the cursor
  y: number; // Y coordinate of the cursor
  isPinching: boolean; // Is the user pinching?
}

export const VirtualCursor: React.FC<VirtualCursorProps> = ({ x, y, isPinching }) => {
  // If no valid coordinates, don't render the cursor
  if (typeof x !== 'number' || typeof y !== 'number') return null;

  return (
    <div
      className="fixed pointer-events-none z-[9999] transition-transform duration-75"
      style={{
        // Convert the normalized coordinates to screen percentages
        left: `${x * 100}vw`,
        top: `${y * 100}vh`,
        // Center the cursor exactly on the tip of the finger
        transform: 'translate(-50%, -50%)'
      }}
    >
      {/* The design of the cursor that changes when you pinch */}
      <div 
        className={`
          flex items-center justify-center rounded-full border-2 
          transition-all duration-200 ease-out shadow-[0_0_15px_rgba(0,0,0,0.2)]
          ${isPinching 
            ? 'w-6 h-6 border-green-400 bg-green-500/50 scale-90' 
            : 'w-10 h-10 border-indigo-400 bg-indigo-500/20 scale-100'
          }
        `}
      >
        {/* A small center point for precision */}
        <div 
          className={`
            rounded-full transition-colors duration-200
            ${isPinching ? 'w-2 h-2 bg-green-300' : 'w-1 h-1 bg-indigo-300'}
          `}
        />
      </div>
    </div>
  );
};
