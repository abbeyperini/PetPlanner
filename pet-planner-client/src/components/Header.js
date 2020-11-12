import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from './images/pepper.svg'

function Header() {
    return(
        <header className="header">
            <Logo className="logo"/>
            <nav className="menu">
                <p><Link to="/">Home</Link></p>
                <p><Link to="/create-pet">Create Pet</Link></p>
            </nav>
        </header>
    )
}

export default Header;