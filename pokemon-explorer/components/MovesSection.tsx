"use client";
import { useState } from "react";

interface Move {
  move: {
    name: string;
  };
}

interface MovesSectionProps {
  moves: Move[];
}

export default function MovesSection({ moves }: MovesSectionProps) {
  const [showAll, setShowAll] = useState(false);
  const toggleShow = () => setShowAll((prev) => !prev);

  // Display only the top 4 moves initially
  const topMoves = moves.slice(0, 4);
  const extraMoves = moves.slice(4);

  return (
    <div>
      {/* Flex container to display moves side by side */}
      <div className="flex flex-wrap gap-2 mt-1 text-xs">
        {topMoves.map((moveObj, idx) => (
          <span key={idx} className="capitalize">
            {moveObj.move.name} ||
          </span>
        ))}
        {showAll &&
          extraMoves.map((moveObj, idx) => (
            <span key={idx + 4} className="capitalize">
              {moveObj.move.name} ||
            </span>
          ))}
      </div>
      {moves.length > 4 && (
        <button
          onClick={toggleShow}
          className="mt-2 text-blue-500 hover:underline text-xs"
        >
          {showAll ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
} 