import React from 'react';
import './Footer.css';
import Link from '../Shared/Link/Link';

function Footer() {
    return (
        <footer className="Footer">
            <ul>
                <Link to="/">Posts</Link>
                <Link to="/create-post">New Post</Link>
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
                <Link to="/profile">View Profile</Link>
               <img id="blue-origami" src="blue-origami-bird-flipped.png" alt="blue-origami" />
            </ul>
            <p>Software University &copy; 2019</p>
        </footer>
    );
}

export default Footer;