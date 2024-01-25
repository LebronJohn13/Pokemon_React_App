import { useEffect, useState } from "react";
import "./PokemonComponent.css";

function MyComponent() {
  const [pokemonList, setPokemonList] = useState([]);
  const [renderedPokemon, setRenderedPokemon] = useState(null);
  let startingIndex = 0;
  let endingIndex = 10;
  const index = 151;

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
        console.log(pokemonArray);

        // Call the function to display Pokémon
        displayPokemon(pokemonArray.slice(startingIndex, endingIndex));
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

  function handleLoadMore() {
    // Increase the starting and ending index by 10
    startingIndex += 10;
    endingIndex += 10;

    // Display the next 10 Pokémon
    displayPokemon(pokemonList.slice(startingIndex, endingIndex));
  }

  return (
    <>
      <h1>Pokémon</h1>
      {/* Render the stored JSX elements */}
      {renderedPokemon}
      <button onClick={handleLoadMore}>Load More</button>
    </>
  );
}

export default MyComponent;
