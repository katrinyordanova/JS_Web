import React from 'react';
import './Navigation.css';
import Link from '../Shared/Link/Link';

function Navigation() {
    return (
        <nav className="Navigation">
            <ul>
                <Link><img id="white-origami" src="white-origami-bird.png" alt="white-origami" /></Link>
                <Link to="/">Posts</Link>
                <Link to="/create-post">New Post</Link>
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
                <Link to="/profile">View Profile</Link>
            </ul>
        </nav>
        
    );
}

export default Navigation;