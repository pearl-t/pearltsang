import './css/Navbar.css';
import React from 'react';
import NavbarLink from './NavbarLink';

// set this to false now since it doesnt work

const Navbar = () => {
    return (<>
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
        {/* <div className="flex-auto flex-row pb-3">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/></svg>
          </div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/></svg>
          </div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/></svg>
          </div>
        </div>       */}
      </div>
    </div>

    </div>
    </>
    )
};

export default Navbar;

