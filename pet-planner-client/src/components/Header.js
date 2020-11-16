import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from './images/pepper.svg'

function Header() {
    return(
        <header className="header">
            <h1>PetPlanner</h1>
            <Logo className="logo"/>
            <nav className="menu">
                <p><Link to="/dashboard">Home</Link></p>
                <p><Link to="/dashboard/create-pet">Create Pet</Link></p>
            </nav>
        </header>
    )
}

export default Header;