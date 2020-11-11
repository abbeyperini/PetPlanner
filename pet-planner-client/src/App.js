import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/dashboard/community')
    .then(response => response.json())
    .then(results => {
      setPets(results)
    })
  }, [])

  let petItems = pets.map(pet => {
    return (
      <li key={pet.id}>{pet.name}</li>
    )
  })

  return (
    <ul className="App">
      {petItems}
    </ul>
  );
}

export default App;
