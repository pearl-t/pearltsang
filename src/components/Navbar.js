import './css/Navbar.css';
import React from 'react';
import NavbarLink from './NavbarLink';

// set this to false now since it doesnt work
const waveDetail = false
const waveDetailCode = (
    <div className="col-span-1 navbar box">
        <img src="layered-waves-haikei.svg"></img>
    </div>
)
const Navbar = () => {
    return (<>
<aside className={`grid self-start sticky top-0 navbar justify-center flex-col ${waveDetail ? 'col-span-3' : 'col-span-4'}`}>
        <div className="grid row-span-1 justify-center content-center">
            <img src="image.png" className="me-icon" alt="logo" />
        </div>
        <ul className="content-center">
            <NavbarLink to="/" name="Home"></NavbarLink>
            {/* <NavbarLink to="/about" name="About"></NavbarLink> */}
            {/* <NavbarLink to="/contact" name="Contact"></NavbarLink> */}
            
        </ul>
    </aside>
    
    {waveDetail && waveDetailCode}

    </>
    )
};

export default Navbar;