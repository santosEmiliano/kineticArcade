import React from 'react';

// 21 MediaPipe HandLandmarks connections, the "Bones"
const HAND_CONNECTIONS = [
  // Thumb
  [0, 1], [1, 2], [2, 3], [3, 4],
  // Index
  [0, 5], [5, 6], [6, 7], [7, 8],
  // Middle
  [9, 10], [10, 11], [11, 12],
  // Ring
  [13, 14], [14, 15], [15, 16],
  // Pinky
  [0, 17], [17, 18], [18, 19], [19, 20],
  // Palm (Connecting the base of the fingers)
  [5, 9], [9, 13], [13, 17]
];

export interface Landmark {
  x: number;
  y: number;
  z: number;
}

interface HandOverlayProps {
  landmarks: Landmark[];
}

export const HandOverlay: React.FC<HandOverlayProps> = ({ landmarks }) => {
  if (!landmarks || landmarks.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <svg className="w-full h-full">
        {/* Draw the lines (bones) so they are below the points */}
        {HAND_CONNECTIONS.map(([startIdx, endIdx], i) => {
          const start = landmarks[startIdx];
          const end = landmarks[endIdx];
          
          if (!start || !end) return null;

          return (
            <line
              key={`bone-${i}`}
              x1={`${start.x * 100}%`}
              y1={`${start.y * 100}%`}
              x2={`${end.x * 100}%`}
              y2={`${end.y * 100}%`}
              stroke="rgba(147, 197, 253, 0.6)" // Subtle blue
              strokeWidth="4"
              strokeLinecap="round"
            />
          );
        })}

        {/* Draw the circles (joints) on top */}
        {landmarks.map((landmark, i) => {
          // Highlight the fingertips (4, 8, 12, 16, 20) with another color
          const isFingertip = [4, 8, 12, 16, 20].includes(i);
          
          return (
            <circle
              key={`joint-${i}`}
              cx={`${landmark.x * 100}%`}
              cy={`${landmark.y * 100}%`}
              r={isFingertip ? "8" : "5"}
              fill={isFingertip ? "rgba(59, 130, 246, 0.9)" : "rgba(255, 255, 255, 0.8)"}
              stroke="rgba(37, 99, 235, 0.5)"
              strokeWidth="2"
            />
          );
        })}
      </svg>
    </div>
  );
};
