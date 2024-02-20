import './css/Navbar.css';
import React from 'react';
import NavbarLink from './NavbarLink';
import { redirect } from 'react-router-dom';
import styled from 'styled-components'

// Trying out styled components? 
const NavBarIcon = styled.a`
  margin-left: .5rem;
  margin-right: .5rem;
  fill: black;

  &:hover {
     fill:white;
    }
`;

const Navbar = () =>  (
  <>
    <div className="navbar h-screen col-span-4">
      <div className="flex flex-col h-full" style={{maxWidth:"200px", paddingLeft: "1rem"}}>
        {/* Top Item */}
        <div className="top-nav">
          <img src="https://pearltsang.s3.us-east-2.amazonaws.com/pearl_tsang.png" className="me-icon" alt="logo" />
        </div>

        {/* Middle Item */}
        <div className="h-20 pt-3 pb-3">
          <div className="flex flex-col items-center justify-center">
              <span style={{ fontSize: "1.75rem", fontFamily: 'TheSeasonsBD' }}>Pearl Tsang</span>
              <span style={{ fontSize: ".75rem" }}>Human</span>            
          </div>
        </div>

        {/* Bottom Item */}
        <div className="bottom-nav">
          <ul className="flex-auto content-center align-center">
              <NavbarLink to="/" name="Home"></NavbarLink>
              <NavbarLink to="/about" name="About"></NavbarLink>            
              <NavbarLink to="/contact" name="Contact"></NavbarLink>
          </ul>
          <div className="flex flex-row content-between align-between pb-3">
            <NavBarIcon href="https://www.linkedin.com/in/pearl-tsang/" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/></svg>          
            </NavBarIcon>
            <NavBarIcon href="https://www.facebook.com/peearlteaa/" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z"/></svg>
            </NavBarIcon>
          </div>      
        </div>
      </div>

    </div>
    <div className="mobile-navbar col-span-12">

        <ul className="flex align-items-center justify-content-center w-full">
              <NavbarLink to="/" name="Home"></NavbarLink>
              <NavbarLink to="/about" name="About"></NavbarLink>            
              <NavbarLink to="/contact" name="Contact"></NavbarLink>
          </ul>

    </div>

  </>
    )


export default Navbar;

