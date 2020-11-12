import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function EditPet() {
    const [pet, setPet] = useState('');
    const [edited, setEdited] = useState(false)
    let { id } = useParams();

    useEffect(() => {
        fetchPet()
    }, [])

    const fetchPet = () => {
        fetch(`http://localhost:8080/pet/edit/${id}`)
        .then(response => response.json())
        .then(results => {
            setPet(results)
        })
    }

    const handleOnChange = (e) => {
        setPet({
            ...pet,
            [e.target.name]: e.target.value
        })
        setEdited(false)
    }

    const handleOnClick = () => {
        fetch('http://localhost:8080/pet/edit-pet', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                id: pet.id,
                name: pet.name,
                favorites: pet.favorites
            })
        }).then(result => {
            console.log(result)
            setEdited(true)
        })
    }

    return(
        <div className="editPet">
            {edited && <h1>Pet edited!</h1>}
            <input onChange={handleOnChange} name="name" type="text" defaultValue={pet.name}></input>
            <input onChange={handleOnChange} name="favorites" type="text" defaultValue={pet.favorites}></input>
            <button onClick={handleOnClick}>Edit</button>
        </div>
    )
}

export default EditPet;