import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { petActions } from '../store/actions/pets.actions';
// import { useParams } from 'react-router-dom';

function EditPet(props) {
    const [localPet, setLocalPet] = useState('');
    const [edited, setEdited] = useState(false);
    // using react-router-dom useParams to get id from url to fetch pet data
    // let { id } = useParams();
    let id = props.match.params.id;

    const fetchPet = (id) => {
        props.fetchSinglePet(id)
        if (props.pet) {
            setLocalPet({
                id: props.pet.id,
                name: props.pet.name,
                favorites: props.pet.favorites
            })
        }
    }

    useEffect(() => {
        fetchPet(id)
    }, [])

    const handleOnChange = (e) => {
        setLocalPet({
            ...localPet,
            [e.target.name]: e.target.value
        })
        setEdited(false)
    }

    const handleOnClick = (pet) => {
        console.log(pet)
        props.editPet(pet)
        setEdited(true)
    }

    if (props.pet) {
        return(
            <div className="editPet">
                {edited && <h1>Pet edited!</h1>}
                <input onChange={handleOnChange} name="name" type="text" defaultValue={props.pet.name}></input>
                <input onChange={handleOnChange} name="favorites" type="text" defaultValue={props.pet.favorites}></input>
                <button onClick={() => handleOnClick(localPet)}>Edit</button>
            </div>
        )
    } else {
        return(
            <div className="editPet">
                {edited && <h1>Pet edited!</h1>}
                <input name="name" type="text" ></input>
                <input name="favorites" type="text" ></input>
                <button>Edit</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        pet: state.singlePet.pet
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSinglePet: (id) => dispatch(petActions.fetchSinglePet(id)),
        editPet: (pet) => dispatch(petActions.editPet(pet))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPet);