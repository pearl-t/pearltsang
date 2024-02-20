import './css/Navbar.css';
import React from 'react';
import NavbarLink from './NavbarLink';


const NavBarLinks = () => {
  return (
    <>
        <NavbarLink to="/" name="Home"></NavbarLink>
        <NavbarLink to="/about" name="About"></NavbarLink>            
        <NavbarLink to="/contact" name="Contact"></NavbarLink>
    </>

    )
};

export default NavBarLinks;