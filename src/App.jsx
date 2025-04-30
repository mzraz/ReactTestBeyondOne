import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import PokemonsList from "./Components/PokemonsList";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PokemonDetails from "./Components/PokemonDetails";
function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=50";

    axios
      .get(apiUrl)
      .then((response) => {
        setData(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
     <Router>
      

      <Routes>
        <Route path="/" element={<PokemonsList />} />
        <Route path="/pokemonDetail/:id" element={<PokemonDetails />} />
      </Routes>
    </Router>

    
    </>
  );
}

export default App;
