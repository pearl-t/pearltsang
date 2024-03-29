import './App.css';
import Navbar from './components/Navbar';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import './styles/Fonts.css';
 

function App() {
  return (
    <>
      <div className="grid grid-cols-12 container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />         
          <Route path="/contact" element={<Contact />} />          
        </Routes>
      </div>      
    </>
  )
}

export default App;
