import React, { useState } from 'react';
import { connect } from 'react-redux';
import { petActions } from '../store/actions/pets.actions';

function CreatePet(props) {
  const [pet, setPet] = useState([]);
  const [added, setAdded] = useState(false);

  const handleOnChange = (e) => {
    setAdded(false);
    setPet({
      ...pet,
      [e.target.name]: e.target.value
    });
  };

  const handleOnClick = () => {
    let petItem = {
      name: pet.name,
      favorites: pet.favorites,
      user: props.user
    }
    props.addPet(petItem)
    setAdded(true)
  }

  return (
    <div className="createPet">
      {added && <h1>Pet created!</h1>}
      <input onChange={handleOnChange} type="text" placeholder="Pet Name" name="name"/>
      <input onChange={handleOnChange} type="text" placeholder="favorites" name="favorites"/>
      <button onClick={handleOnClick}>Submit</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userR.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPet: (pet) => dispatch(petActions.addPet(pet))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePet);