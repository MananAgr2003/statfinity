"use client";
import { useState, ChangeEvent } from "react";
import PokemonCard from "./PokemonCard";

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonExplorerProps {
  pokemons: Pokemon[];
}

export default function PokemonExplorer({ pokemons }: PokemonExplorerProps) {
  const [searchText, setSearchText] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold mb-8 text-center">
        Pokémon Explorer
      </h1>
      <div className="flex flex-col sm:flex-row items-center justify-center mb-8 space-y-4 sm:space-y-0 sm:space-x-4">
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={searchText}
          onChange={handleSearch}
          className="border rounded px-4 py-2 w-full max-w-md text-black"
        />
        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`px-4 py-2 rounded ${
              viewMode === "grid"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`px-4 py-2 rounded ${
              viewMode === "list"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            List
          </button>
        </div>
      </div>
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPokemons.map((pokemon) => (
            <PokemonCard key={pokemon.name} name={pokemon.name} url={pokemon.url} viewMode={viewMode} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredPokemons.map((pokemon) => (
            <div key={pokemon.name}>
              <PokemonCard name={pokemon.name} url={pokemon.url} viewMode={viewMode} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}