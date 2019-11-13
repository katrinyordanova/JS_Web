import React from 'react';
import './Footer.css';
import Link from '../Shared/Link/Link';

function Footer() {
    return (
        <footer className="Footer">
            <ul>
                <Link url="#">Going to 1</Link>
                <Link url="#">Going to 2</Link>
                <Link url="#">Going to 3</Link>
                <Link url="#">Going to 4</Link>
                <Link url="#">Going to 5</Link>
                <Link url="#">Going to 6</Link>
                <Link url="#">Going to 7</Link>
                <Link url="#">Going to 8</Link>
                <Link url="#">Going to 9</Link>
               <img id="blue-origami" src="blue-origami-bird-flipped.png"/>
            </ul>
            <p>Software University &copy; 2019</p>
        </footer>
    );
}

export default Footer;