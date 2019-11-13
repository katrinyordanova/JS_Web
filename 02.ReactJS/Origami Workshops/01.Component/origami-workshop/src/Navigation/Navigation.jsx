import React from 'react';
import './Navigation.css';
import Link from '../Shared/Link/Link';

function Navigation() {
    return (
        <nav className="Navigation">
            <ul>
                <Link><img id="white-origami" src="white-origami-bird.png"></img></Link>
                <Link url="#">Link 1</Link>
                <Link url="#">Link 2</Link>
                <Link url="#">Link 3</Link>
                <Link url="#">Link 4</Link>
                <Link url="#">Link 5</Link>
                <Link url="#">Link 6</Link>
                <Link url="#">Link 7</Link>
                <Link url="#">Link 8</Link>
                <Link url="#">Link 9</Link>
                <Link url="#">Link 10</Link>
                <Link url="#">Link 11</Link>
                <Link url="#">Link 12</Link>
            </ul>
        </nav>
        
    );
}

export default Navigation;