import './App.css';
import { NavLink, Route, Routes } from 'react-router-dom';
import Contact from './components/Contact';
import shellLogo from './assets/shell-logo-transparent.png';
import portrait from './assets/pearl-portrait.jpg';

function App() {
  return (
    <div className="gradient-background">
      <header className="site-header">
        <img className="site-logo" src={shellLogo} alt="Pearl Tsang — pearl shell logo" />
        <nav aria-label="Main navigation">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/about">About Me</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
      </header>
      <main className="intro">
        <div className="intro-copy">
          <Routes>
            <Route path="/" element={
              <h1 className="greeting">
                <span className="greeting-intro">Hi, my name is</span>
                <span className="greeting-name">Pearl.</span>
              </h1>
            } />
            <Route path="/about" element={<section className="content-panel"><h1>About Me</h1></section>} />
            <Route path="/contact" element={<section className="content-panel"><Contact /></section>} />
          </Routes>
        </div>
        <div className="portrait-frame">
          <svg className="portrait" viewBox="0 0 600 620" role="img" aria-labelledby="portrait-title">
            <title id="portrait-title">Pearl smiling with her arms crossed against a purple background</title>
            <defs>
              <clipPath id="portrait-blob">
                <path d="M340 24 C256 7 193 28 179 93 C164 158 124 178 80 185 C18 195 7 254 25 333 C49 443 130 551 260 586 C384 619 528 569 563 473 C601 371 542 324 550 261 C559 199 591 157 566 103 C540 45 437 44 340 24 Z" />
              </clipPath>
            </defs>
            <image href={portrait} width="600" height="620" preserveAspectRatio="xMidYMid slice" clipPath="url(#portrait-blob)" />
          </svg>
        </div>
      </main>
    </div>
  );
}

export default App;
