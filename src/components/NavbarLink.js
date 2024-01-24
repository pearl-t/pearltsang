import React from 'react';
import { Link } from "react-router-dom";

const NavbarLink = (props) => {
    const { to, name, fontSize } = props;

    const linkStyle = {
        fontSize: fontSize || '1.25rem', // Default to 1.25rem if fontSize is not provided
        color: "#FEFAE0"
    };

    return (
        <li className="text-center m-5">
            <Link style={linkStyle} className="nav-link hover-underline-animation" to={to}>{name}</Link>
        </li>
    );
};

export default NavbarLink;