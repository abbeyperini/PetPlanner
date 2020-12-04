import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { userActions } from '../store/actions/user.actions';
import { withRouter } from 'react-router';

function IndexPage(props) {
    const [user, setUser] = useState({});
    //rewrite as dispatch to props
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
            <p>Need a username? <NavLink to="/register">Register</NavLink></p>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        login: state.userR.login
    }
}


export default withRouter(connect(mapStateToProps)(IndexPage));