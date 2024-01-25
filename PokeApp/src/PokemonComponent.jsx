import { useEffect, useState } from "react";
import "./PokemonComponent.css";

function MyComponent() {
  const [pokemonList, setPokemonList] = useState([]);
  const [renderedPokemon, setRenderedPokemon] = useState(null);
  const index = 300;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${index}`
        );
        const data = await response.json();
        const pokemonArray = [];

        // Log information about each Pokémon
        for (const pokemon of data.results) {
          const pokemonResponse = await fetch(pokemon.url);
          const pokemonData = await pokemonResponse.json();
          pokemonArray.push(pokemonData);
        }

        // Set the entire Pokémon list to state
        setPokemonList(pokemonArray);

        // Call the function to display Pokémon
        displayPokemon(pokemonArray);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  function displayPokemon(pokemonArray) {
    // Create an array of JSX elements
    const pokemonElements = pokemonArray.map((pokemon) => {
      const typesArray = pokemon.types;
      const typesElements = typesArray.map((type, index) => (
        <div key={index} className={type.type.name}>
          <p>{type.type.name}</p>
        </div>
      ));

      return (
        <div key={pokemon.id} className="pokemon-container">
          <p className="name">{pokemon.name}</p>
          <p className="id">ID: {pokemon.id}</p>
          {typesElements}
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="sprite"
          />
        </div>
      );
    });

    // Set the array of JSX elements to state
    setRenderedPokemon(pokemonElements);
  }

  return (
    <>
      <h1>Pokémon</h1>
      {/* Render the stored JSX elements */}
      {renderedPokemon}
    </>
  );
}

export default MyComponent;
