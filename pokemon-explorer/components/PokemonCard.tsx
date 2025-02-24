"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";

interface PokemonCardProps {
  name: string;
  url: string;
  viewMode: "grid" | "list";
}

function getIdFromUrl(url: string): string {
  const segments = url.split("/").filter(Boolean);
  return segments[segments.length - 1];
}

export default function PokemonCard({ name, url, viewMode }: PokemonCardProps) {
  const id = getIdFromUrl(url);
  // Use the official artwork image for the front background
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  const cardInnerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    gsap.to(cardInnerRef.current, {
      rotationY: 180,
      duration: 0.8,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardInnerRef.current, {
      rotationY: 0,
      duration: 0.8,
      ease: "power2.out"
    });
  };

  return (
    <Link href={`/pokemon/${id}`} className="block">
      {/* We add perspective so that the inner card renders in 3D */}
      <div
        className={`relative w-full ${viewMode === "grid" ? "h-[350px]" : "h-[100px]"} border rounded p-4 hover:shadow-lg transition-shadow flex flex-col items-center overflow-hidden`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ perspective: "1000px" }}
      >
        {/* The cardInner container is animated for the flip */}
        <div
          ref={cardInnerRef}
          className="w-full h-full relative"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front Face - shows the Pokémon artwork and name */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ backfaceVisibility: "hidden" }}
          >

            {viewMode === "grid" ? (
              <img
                src={imageUrl}
                alt={name}
                className="absolute inset-0 object-cover opacity-20"
              />
            ) : (
              <></>
            )}
            <h2 className="z-10 text-xl font-bold capitalize">{name}</h2>
          </div>

          {/* Back Face - shows additional basic information */}
          {viewMode === "grid" ? (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-purple-500 to-blue-500 p-4"
              style={{
                backfaceVisibility: "hidden",
              transform: "rotateY(180deg)"
            }}
          >
            <h2 className="z-10 text-2xl font-bold capitalize mb-2">{name}</h2>
            <p className="text-lg">ID: {id}</p>
              <p className="mt-2 text-sm">Click for Detailed Stats & Abilities</p>
            </div>
          ) : (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-purple-500 to-blue-500 p-4"
              style={{
                backfaceVisibility: "hidden",
              transform: "rotateY(180deg)"
            }}
          >
            <h2 className="z-10 text-2xl font-bold capitalize mb-2">{name}</h2>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}