import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { generatePath, withRouter } from "react-router";
import { petActions } from '../store/actions/pets.actions';


function Dashboard(props) {
    let deleted = props.deleted;

    useEffect(() => {
        props.fetchPets(props.user)
    }, [deleted])

    if (!props.pets || !props.pets[0]) {
        return (
            <div className="dashboard_empty_pets">
                <NavLink to="/dashboard/create-pet"><h1>Create a pet!</h1></NavLink> 
            </div>
        )
    } else {
        let petItems = props.pets.map(pet => {
            return(
                <li key={pet.id} className="pet">
                    <h3>{pet.name}</h3>
                    <p>Favorites: {pet.favorites}</p>
                    <button onClick={() => {props.deletePet(pet)}}>Delete</button>
                    <NavLink to={generatePath("/dashboard/pet/edit/:id", {id: pet.id})}><button>Edit</button></NavLink>
                </li>
            )
        })
    
        return (
            <ul>
                {petItems}
            </ul>
            )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userR.user,
        pets: state.pets.pets,
        deleted: state.deletePet.deleted
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPets: (user) => dispatch(petActions.fetchPets(user)),
        deletePet: (pet) => dispatch(petActions.deletePet(pet))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));