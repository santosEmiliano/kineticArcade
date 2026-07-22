import GameCard from './GameCard';

export default function GameGallery() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Temporal mock props for games */}
      <GameCard title="Tetris" image="/assets/tetris.jpeg" />
      <GameCard title="Pong" image="/assets/pong.png" />
      <GameCard title="Space Invaders" image="/assets/invaders.jpeg" />
    </div>
  )
}
