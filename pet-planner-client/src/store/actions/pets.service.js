export const petService = {
    fetchPets,
    addPet
};

function fetchPets(user) {
    return fetch(`http://localhost:8080/dashboard/${user}`)
        .then(handleResponse)
}

function addPet(pet) {
    let requestOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            name: pet.name,
            favorite: pet.favorites,
            user: pet.user
        })
    }

    return fetch('http://localhost:8080/pet/create-pet', requestOptions)
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