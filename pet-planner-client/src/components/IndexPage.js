import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userActions } from '../store/actions/user.actions';

function IndexPage(props) {
    const [user, setUser] = useState({});
    const dispatch = useDispatch();
    

    const handleOnChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    const handleOnClick = () => {
        if (user.username && user.password) {
            dispatch(userActions.login(user))
        }  
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