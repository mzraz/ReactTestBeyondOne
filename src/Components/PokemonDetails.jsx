import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PokemonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemon(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching Pokemon details:', err);
        setError('Failed to fetch Pokemon details. Please try again later.');
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  const handleNavigate = () => {
    navigate('/');
  };

  const capitalize = (str) => {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
  };

  if (loading) {
    return (
      <div>
        <p>Loading Pokemon data...</p>
        <button onClick={handleNavigate}>Back to Main</button>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={handleNavigate}>Back to Main</button>
      </div>
    );
  }

  if (!pokemon) return null;

  return (
    <div>
      <h1>Pokemon Details</h1>  
      <button onClick={handleNavigate}>
        Back to Main
      </button>   
      <div>
        <h2>{capitalize(pokemon.name)}</h2>
        <div>
          <img 
            src={pokemon.sprites.front_default} 
            alt={pokemon.name}
            style={{
                width:'200px',
                height:'200px'
            }}
          />
        </div>       
        <div>
          <h3>Types:</h3>
          {pokemon.types.map((type) => (
            <span key={type.type.name}>
              {capitalize(type.type.name)}
            </span>
          ))}
        </div>       
        <div>
          <p><strong>Height:</strong> {pokemon.height / 10} m</p>
          <p><strong>Weight:</strong> {pokemon.weight / 10} kg</p>
        </div>   
        <div>
          <h3>Abilities:</h3>
          <ul>
            {pokemon.abilities.map((ability, index) => (
              <li key={index}>
                {capitalize(ability.ability.name)}
                {ability.is_hidden && " (Hidden)"}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Base Stats:</h3>
          <ul>
            {pokemon.stats.map((stat) => (
              <li key={stat.stat.name}>
                <strong>{capitalize(stat.stat.name)}:</strong> {stat.base_stat}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>First Five Moves:</h3>
          <ul>
            {pokemon.moves.slice(0, 5).map((move, index) => (
              <li key={index}>
                {capitalize(move.move.name.replace('-', ' '))}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;