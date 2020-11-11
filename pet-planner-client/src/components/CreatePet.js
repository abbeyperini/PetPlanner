import React, { useState } from 'react';

function CreatePet() {
  const [name, setName] = useState('');
  const [favorites, setFavorites] = useState('');

  const handleOnChangeName = (e) => {
    setName(e.target.value)
    console.log("name set")
  }

  const handleOnChangeFav = (e) => {
    setFavorites(e.target.value)
    console.log("favorite set")
  }

  const handleOnClick = () => {
    fetch('http://localhost:8080/pet/create-pet', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        name: name,
        favorites: favorites
      })
    }).then(result => {
      console.log(result)
    })
  }

  return (
    <div>
      <input onChange={handleOnChangeName} type="text" placeholder="Pet Name" name="name"/>
      <input onChange={handleOnChangeFav} type="text" placeholder="favorites" name="favorites"/>
      <button onClick={handleOnClick}>Submit</button>
    </div>
  );
}

export default CreatePet;