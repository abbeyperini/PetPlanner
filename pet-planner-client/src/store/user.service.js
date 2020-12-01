export const userService = {
    register,
    login,
    logout
};

function register(user) {

    const requestOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(user)
    };

    return fetch('http://localhost:8080/index/register/user', requestOptions)
    .then(handleResponse)
}

function login(user) {

    const requestOptions = {
        method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user)
    };

    return fetch('http://localhost:8080/index/login', requestOptions)
    .then(handleResponse)
}

function logout() {
    localStorage.removeItem('user');
}

// uses redux-thunk middleware to get around "Error: Actions must be plain objects. Use custom middleware for async actions."
function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if(response.state === 401) {
                logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.satusText;
            return Promise.reject(error)
        }

        return data;
    })
}