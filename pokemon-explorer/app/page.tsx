import PokemonExplorer from "../components/PokemonExplorer";

export default async function Page() {
  // Fetch the first 151 Pokémon on the server.
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151", {
    // Optionally use caching for static rendering:
    cache: "force-cache"
  });
  const data = await res.json();

  return <PokemonExplorer pokemons={data.results} />;
}