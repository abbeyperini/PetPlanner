import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { userActions } from '../store/actions/user.actions';

function RegisterPage(props) {
    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    const dispatch = useDispatch();

    const handleOnChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    function handleOnClick() {
        if (user.username && user.password) {
            dispatch(userActions.register(user))
        }
    }

    return(
        <div>
            <input onChange={handleOnChange} type="text" placeholder="username" name="username"></input>
            <input onChange={handleOnChange} type="text" placeholder="password" name="password"></input>
            <button onClick={handleOnClick}>Register</button>
            <p>Already have a username? <NavLink to="/index">Login</NavLink></p>
        </div>
    )
}

export default withRouter(RegisterPage);