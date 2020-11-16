import './App.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { generatePath } from "react-router";

function App() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    getAllPets()
  }, [])

  // keeping this outside useEffect means you can call it from wherever
  const getAllPets = () => {
    fetch('http://localhost:8080/dashboard/community')
    .then(response => response.json())
    .then(results => {
      // setting the state will call render
      setPets(results)
    })
  }

  const handleDelete = (pet) => {
    fetch(`http://localhost:8080/pet/delete/${pet.id}`, {
      method: "DELETE"
    })
    .then(response => response.json())
    .then((response) => {
      if (response > 0) {
        console.log(response)
        getAllPets()
      }
    })
    .catch((error) => console.log(error))
  }

  let petItems = pets.map(pet => {

    return (
    <li key={pet.id} className="pet">
      <h3>{pet.name}</h3>
      <p>Favorites: {pet.favorites}</p>
      <button onClick={() => {handleDelete(pet)}}>Delete</button>
      <Link to={generatePath("/dashboard/pet/edit/:id", {id: pet.id})}><button>Edit</button></Link>
    </li>
    )
  })

  return (
    <ul className="App">
      {petItems}
    </ul>
  );
}

export default App;
