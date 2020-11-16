import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function IndexPage() {
    const [user, setUser] = useState({});
    const [login, setLogin] = useState("");

    const handleOnChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    const handleOnClick = () => {
        let userName = user.username;
        let pass = user.password;

        fetch('http://localhost:8080/index/login', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                username: userName,
                password: pass
            })
        }).then(response => response.json())
        .then(result => {
            setLogin(result.login)
            setUser({
                ...user,
                id: result.user
            })
        })
    }

    return(
        <div>
            <input onChange={handleOnChange} type="text" placeholder="username" name="username"></input>
            <input onChange={handleOnChange} type="text" placeholder="password" name="password"></input>
            <button onClick={handleOnClick}>Login</button>
            <p>Need a username? <Link to="/register">Register</Link></p>
        </div>
    )
}

export default IndexPage;