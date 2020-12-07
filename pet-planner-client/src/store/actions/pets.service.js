import Axios from "axios";

export const petService = {
    fetchPets,
    addPet,
    deletePet,
    fetchSinglePet,
    editPet
};

function fetchPets(user) {
    return Axios.get(`http://localhost:8080/dashboard/${user}`)
}

function fetchSinglePet(id) {
    return fetch(`http://localhost:8080/pet/edit/${id}`)
    .then(handleResponse)
}

function addPet(pet) {

    let requestOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            name: pet.name,
            favorites: pet.favorites,
            user: pet.user
        })
    }

    return fetch('http://localhost:8080/pet/create-pet', requestOptions)
    .then(handleResponse)
}

function deletePet(pet) {
    let requestOptions = {
        method: "DELETE"
    }

    return fetch(`http://localhost:8080/pet/delete/${pet.id}`, requestOptions)
    .then(handleResponse)
}

function editPet(pet) {
    let requestOptions = {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            id: pet.id,
            name: pet.name,
            favorites: pet.favorites
        })
    }

    return fetch('http://localhost:8080/pet/edit-pet', requestOptions)
    .then(handleResponse)
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if(response.state === 401) {
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error)
        }

        return data;
    })
}