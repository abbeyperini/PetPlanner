import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { generatePath, withRouter } from "react-router";
import { petActions } from '../store/actions/pets.actions';


function Dashboard(props) {

    useEffect(() => {
        props.fetchPets(props.user)
    }, [])

    // const handleDelete = (pet) => {
    //     fetch(`http://localhost:8080/pet/delete/${pet.id}`, {
    //     method: "DELETE"
    //     })
    //     .then(response => response.json())
    //     .then((response) => {
    //     if (response > 0) {
    //         console.log(response)
    //         getPets()
    //     }
    //     })
    //     .catch((error) => console.log(error))
    // }

    if (!props.pets) {
        return (
            <ul className="App">
                <Link to="/dashboard/create-pet"><h1>Create a pet!</h1></Link> 
            </ul>
        )
    }

    let petItems = props.pets.map(pet => {
        return(
            <div>
                <li key={pet.id} className="pet">
                    <h3>{pet.name}</h3>
                    <p>Favorites: {pet.favorites}</p>
                    {/* <button onClick={() => {handleDelete(pet)}}>Delete</button> */}
                    <Link to={generatePath("/dashboard/pet/edit/:id", {id: pet.id})}><button>Edit</button></Link>
                </li>
            </div>
        )
    })

    return (
        <ul>
            {petItems}
        </ul>
        )
}

const mapStateToProps = (state) => {
    return {
        user: state.userR.user,
        pets: state.petsR.pets
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPets: (user) => dispatch(petActions.fetchPets(user))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));