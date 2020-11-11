import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
    return(
        <header>
            <nav>
                <p><NavLink to="/">Home</NavLink></p>
                <p><NavLink to="/create-pet">Create Pet</NavLink></p>
            </nav>
        </header>
    )
}

export default Header;