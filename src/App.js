import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [getData, setData] = useState([]);
  const [getNext, setNext] = useState(
    "https://content.newtonschool.co/v1/pr/64ccef982071a9ad01d36ff6/pokemonspages1"
  );
  async function initial() {
    try {
      let response = await fetch(getNext);
      let data = await response.json();
      setNext(data[0].next);
      let list = data[0].results;
      for await (let obj of list) {
        let responsePokemon = await fetch(obj.url);
        let pokemonData = await responsePokemon.json();
        console.log(pokemonData);
        setData((prevData) => [...prevData, pokemonData[0]]);
      }
    } catch (err) {}
  }
  useEffect(() => {
    initial();
  }, []);
  return (
    <div className="App">
      <div className="container">
        {getData.map((obj, index) => {
          return (
            <div key={index} className="thumb-container">
              <div className="number">
                {" "}
                <small> #{obj.id} </small>{" "}
              </div>
              <img src={obj.image} alt={obj.name} />
              <div className="detail-wrapper">
                <h3> {obj.name} </h3> <small>Type: {obj.type} </small>
                <button className="pokeInfo">Know more</button>
              </div>
            </div>
          );
        })}
        <button onClick={initial} className="load-more">
          More Pokemon
        </button>
      </div>
    </div>
  );
}

export default App;
