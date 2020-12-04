import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ReactComponent as Logo } from './images/pepper.svg';

// code for when authentication works
// {props.login ? <p><Link to="/dashboard">Home</Link></p> : null}
// {props.login ? <p><Link to="/dashboard/create-pet">Create Pet</Link></p> : null}

function Header(props) {
    return(
        <header className="header">
            <h1>PetPlanner</h1>
            <Logo className="logo"/>
            <nav className="menu">
                <p><NavLink to="/dashboard">Home</NavLink></p>
                <p><NavLink to="/dashboard/create-pet">Create Pet</NavLink></p>
            </nav>
        </header>
    )
}

const mapStateToProps = (state) => {
    return {
        login: state.userR.login
    }
}

export default withRouter(connect(mapStateToProps)(Header));