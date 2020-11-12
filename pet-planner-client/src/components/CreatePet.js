import React, { useState } from 'react';

function CreatePet() {
  const [pet, setPet] = useState([]);
  const [added, setAdded] = useState('');

  const handleOnChange = (e) => {
    setAdded(false);
    setPet({
      ...pet,
      [e.target.name]: e.target.value
    });
  };

  const handleOnClick = () => {

    fetch('http://localhost:8080/pet/create-pet', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        name: pet.name,
        favorites: pet.favorites
      }) 
    }).then(result => {
      setAdded(true)
    });
  };

  return (
    <div className="createPet">
      {added && <h1>Pet created!</h1>}
      <input onChange={handleOnChange} type="text" placeholder="Pet Name" name="name"/>
      <input onChange={handleOnChange} type="text" placeholder="favorites" name="favorites"/>
      <button onClick={handleOnClick}>Submit</button>
    </div>
  );
};

export default CreatePet;