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
    <div className="sticky top-0 h-screen col-span-4">
      <div className="flex flex-col h-full" style={{maxWidth:"200px", paddingLeft: "1rem"}}>
        {/* Top Item */}
        <div className="top-nav">
        <img src="image.png" className="me-icon" alt="logo" />
        </div>

        {/* Middle Item */}
        <div className="flex-initial h-20 pt-3 pb-3">
          <div className="flex flex-col items-center justify-center">
              <span style={{ fontSize: "1.75rem", fontFamily: 'TheSeasonsBD' }}>Pearl Tsang</span>
              <span style={{ fontSize: ".75rem" }}>Person</span>            
          </div>
        </div>

        {/* Bottom Item */}
        <div className="bottom-nav">
          <ul className="flex-auto content-center align-center">
              <NavbarLink to="/" name="Home"></NavbarLink>
              {/* <NavbarLink to="/about" name="About"></NavbarLink> */}
              <NavbarLink to="/contact" name="Contact"></NavbarLink>
          </ul>
          <div className="flex flex-row content-between align-between pb-3">
            <NavBarIcon href="https://www.linkedin.com/in/pearl-tsang/" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/></svg>          
            </NavBarIcon>
            <NavBarIcon href="https://www.facebook.com/peearlteaa/" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z"/></svg>
            </NavBarIcon>
            {/* <NavBarIcon href="lol.com" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M14.829 6.302c-.738-.034-.96-.04-2.829-.04s-2.09.007-2.828.04c-1.899.087-2.783.986-2.87 2.87-.033.738-.041.959-.041 2.828s.008 2.09.041 2.829c.087 1.879.967 2.783 2.87 2.87.737.033.959.041 2.828.041 1.87 0 2.091-.007 2.829-.041 1.899-.086 2.782-.988 2.87-2.87.033-.738.04-.96.04-2.829s-.007-2.09-.04-2.828c-.088-1.883-.973-2.783-2.87-2.87zm-2.829 9.293c-1.985 0-3.595-1.609-3.595-3.595 0-1.985 1.61-3.594 3.595-3.594s3.595 1.609 3.595 3.594c0 1.985-1.61 3.595-3.595 3.595zm3.737-6.491c-.464 0-.84-.376-.84-.84 0-.464.376-.84.84-.84.464 0 .84.376.84.84 0 .463-.376.84-.84.84zm-1.404 2.896c0 1.289-1.045 2.333-2.333 2.333s-2.333-1.044-2.333-2.333c0-1.289 1.045-2.333 2.333-2.333s2.333 1.044 2.333 2.333zm-2.333-12c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.958 14.886c-.115 2.545-1.532 3.955-4.071 4.072-.747.034-.986.042-2.887.042s-2.139-.008-2.886-.042c-2.544-.117-3.955-1.529-4.072-4.072-.034-.746-.042-.985-.042-2.886 0-1.901.008-2.139.042-2.886.117-2.544 1.529-3.955 4.072-4.071.747-.035.985-.043 2.886-.043s2.14.008 2.887.043c2.545.117 3.957 1.532 4.071 4.071.034.747.042.985.042 2.886 0 1.901-.008 2.14-.042 2.886z"/></svg>
            </NavBarIcon> */}
          </div>      
        </div>
      </div>

    </div>
  </>
    )


export default Navbar;

