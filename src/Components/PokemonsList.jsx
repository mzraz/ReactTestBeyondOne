import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import { useNavigate } from "react-router-dom";
function PokemonsList() {
  const navigate = useNavigate()
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageNo, setPageNumber] = useState(0)
  const [nextBtnDisable, setNextBtnDisable] = useState(false)
  const [page, setPage] = useState(0)
  useEffect(() => {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/?offset=${pageNo}&limit=50`;

    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response.data.results)
        if(response.data.results.length === 0){
        setLoading(false);
        setNextBtnDisable(true)
        }else {
          setData(response.data.results);
          setLoading(false);
        }
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [pageNo]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }



  const handlePagination = (type) => {
    if(type === "previous"){
      if(pageNo === 0) {
        return setNextBtnDisable(false);
      }
      else {
        setPageNumber((prev)=> 
          prev - 50 
        )
        setNextBtnDisable(false)
      }
    } else {
      setPageNumber((prev)=> 
        prev + 50 
      )
    }
  }


  const handleChange = (event) => {
    const value  = event.target.value
    if(value ==='0'){
    console.log('data', typeof(value))
      setPage(value)
      setPageNumber((prev)=> Number(value) * 50)
    }else {
      setPage(value)
      setPageNumber((prev)=> Number(value) * 50)
    }
  }



  const checkDetails=(details)=> {
    

    navigate(`/pokemonDetail/${details.url.split('/')[6]}`)
  }
  return (
    <div>
      <h1>Pokemons</h1>
      <ul>
        {data.map((post) => (
          <li key={post.name} onClick={()=> checkDetails(post)} style={{
            cursor:'pointer'
          }} className="tableContainer">
            <p>{post.name}</p>
          </li>
        ))}
      </ul>
<div>
      <button onClick={()=> handlePagination("previous")} disabled={pageNo === 0}>
        Previous
      </button>
      <input type="number" onChange={(e)=> handleChange(e)} value={page} min={0}></input>
      <button onClick={()=> handlePagination("next")} disabled={nextBtnDisable}>
        Next
      </button>
      </div>
    </div>
  );
}

export default PokemonsList;
