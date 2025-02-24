import Link from "next/link";
import MovesSection from "@/components/MovesSection";
import '../../globals.css'

interface PokemonDetail {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  abilities: { ability: { name: string } }[];
  types: { type: { name: string } }[];
  stats: { stat: { name: string }; base_stat: number }[];
  moves: { move: { name: string } }[];
}

interface PokemonDetailPageProps {
  params: {
    id: string;
  };
}

export default async function PokemonDetailPage({ params }: PokemonDetailPageProps) {
  const { id } = params;

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemon: PokemonDetail = await res.json();

  const hpStat = pokemon.stats.find((stat) => stat.stat.name === "hp");
  const hp = hpStat ? hpStat.base_stat : "N/A";

  // Determine the primary type from the Pokémon's types (if none, use "normal")
  const primaryType = pokemon.types[0]?.type.name || "normal";

  // Define a mapping of Pokémon types to special effect classes
  const typeEffects: { [key: string]: string } = {
    fire: "text-red-500 animate-pulse",
    water: "text-blue-500 animate-pulse",
    grass: "text-green-500 animate-bounce",
    electric: "text-yellow-500",
    psychic: "text-purple-500",
    normal: "text-gray-700",
    rock: "text-gray-600",
    ground: "text-yellow-700",
    ice: "text-blue-200 animate-spin",
    fighting: "text-red-700",
    poison: "text-purple-700",
    bug: "text-green-400",
    ghost: "text-indigo-500",
    dragon: "text-indigo-700",
    dark: "text-gray-800",
    steel: "text-gray-400",
    fairy: "text-pink-500"
  };

  // Get the effect class based on the primary type
  const effectClass = typeEffects[primaryType] || "text-gray-800";

  return (
    <div className="min-h-screen p-6">
      <Link href="/">
        <button className="mb-4 text-blue-600 hover:underline">← Back</button>
      </Link>

      {/* The header now includes extra classes based on the Pokémon's primary type */}
      <p className={`text-3xl font-bold capitalize text-center mb-6 ${effectClass}`}>
        {pokemon.name} (HP: {hp})
      </p>

      {/* Image Section */}
      <section className="mb-6">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-60 h-60 mx-auto"
        />
      </section>

      {/* Abilities Section */}
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">Abilities</h2>
        <p className="text-base">
          {pokemon.abilities.map((ability) => ability.ability.name).join(", ")}
        </p>
      </section>

      {/* Types Section */}
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">Types</h2>
        <div className="flex flex-wrap gap-2">
          {pokemon.types.map((type, idx) => (
            <span
              key={idx}
              className="bg-white text-black rounded-full px-3 py-1 text-sm font-medium capitalize"
            >
              {type.type.name}
            </span>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">Stats</h2>
        <ul className="space-y-4">
          {pokemon.stats.map((stat, idx) => {
            // Clamp the value to 100 for the progress bar
            const progress = Math.min(stat.base_stat, 100);
            return (
              <li key={idx}>
                <div className="flex justify-between mb-1 capitalize text-sm font-medium">
                  <span>{stat.stat.name}</span>
                  <span>{stat.base_stat}</span>
                </div>
                <div className="w-full bg-gray-300 h-4 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-500 h-4 rounded-full transition-all duration-1000"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Moves Section */}
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">Moves</h2>
        <MovesSection moves={pokemon.moves} />
      </section>
    </div>
  );
}