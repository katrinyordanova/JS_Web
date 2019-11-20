import React from 'react';
import './Aside.css';
import Link from '../Shared/Link/Link';

function Aside() {
    return (
        <aside className="Aside">
            <ul>
                <Link to="/">Posts</Link>
                <Link to="/create-post">New Post</Link>
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
                <Link to="/profile">View Profile</Link>
            </ul>
        </aside>
    );
}

export default Aside;