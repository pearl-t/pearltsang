import React from 'react';
import {  Link } from "react-router-dom";

const NavbarLink = (prop) => {
    return (
        <li className="text-center m-5">
            <Link className="nav-link hover-underline-animation" to={prop.to}>{prop.name}</Link>
        </li>
    )

};

export default NavbarLink;