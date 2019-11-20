import React from 'react';
import './Link.css';
import { Link as ReactLinkDomLink } from 'react-router-dom';

function Link({ children, to }) {
    return (
        <li className="listItem">
            <ReactLinkDomLink to={to}>{children}</ReactLinkDomLink>
        </li>
    );
}

export default Link;