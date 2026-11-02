import { useEffect, useState } from 'react';
import './App.css';
import portrait from './assets/pearl-portrait.jpg';
import Contact from './components/Contact';

function WindowsMark({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 80 76" aria-hidden="true">
      <defs>
        <linearGradient id="red" x2="1" y2="1"><stop stopColor="#ff9c38" /><stop offset="1" stopColor="#e33920" /></linearGradient>
        <linearGradient id="green" x2="1" y2="1"><stop stopColor="#b5e94e" /><stop offset="1" stopColor="#42a51d" /></linearGradient>
        <linearGradient id="blue" x2="1" y2="1"><stop stopColor="#43b9f6" /><stop offset="1" stopColor="#1264cc" /></linearGradient>
        <linearGradient id="yellow" x2="1" y2="1"><stop stopColor="#fff05a" /><stop offset="1" stopColor="#f6ae16" /></linearGradient>
      </defs>
      <g transform="skewX(-12) translate(12 0)">
        <path fill="url(#red)" d="M6 8 Q20 0 36 8 V34 Q20 26 6 34Z" />
        <path fill="url(#green)" d="M40 9 Q55 17 70 9 V35 Q55 43 40 35Z" />
        <path fill="url(#blue)" d="M6 39 Q20 31 36 39 V65 Q20 57 6 65Z" />
        <path fill="url(#yellow)" d="M40 40 Q55 48 70 40 V66 Q55 74 40 66Z" />
      </g>
    </svg>
  );
}

function DesktopIcon({ kind = 'folder' }) {
  if (kind === 'computer') return (
    <svg viewBox="0 0 48 48" aria-hidden="true"><path fill="#c9d7e5" stroke="#30436a" d="M7 3h32v27H7z" /><path fill="#167ed6" stroke="#fff" d="M11 7h24v18H11z" /><path fill="#87caef" d="m12 8 22 0-22 16z" /><path fill="#b7bfd1" stroke="#30436a" d="M19 30h10v5H19zM5 36h38v8H5z" /><path stroke="#fff" d="M8 38h31" /><path fill="#45a744" d="M35 39h4v2h-4z" /></svg>
  );
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true"><path fill="#eaa22c" stroke="#ad791e" d="M3 10h17l4 5h20v27H3z" /><path fill="#ffe394" stroke="#b58a37" d="M3 17h42l-5 25H3z" /><path fill="#fff0be" d="M4 18h39l-1 3H4z" />{kind === 'contact' && <><path fill="#fff" stroke="#7386a7" d="M19 25h23v14H19z" /><path fill="none" stroke="#7386a7" d="m19 25 11.5 8L42 25" /></>}</svg>
  );
}

const sections = { home: 'Home', about: 'About Me', contact: 'Contact' };

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [activeWindow, setActiveWindow] = useState('home');
  const [minimized, setMinimized] = useState(false);
  const [maximized, setMaximized] = useState(false);
  const [startOpen, setStartOpen] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  function openWindow(section) {
    setActiveWindow(section);
    setMinimized(false);
    setStartOpen(false);
  }

  function logOff() {
    setLoggedIn(false);
    setStartOpen(false);
    setActiveWindow('home');
    setMinimized(false);
    setMaximized(false);
  }

  if (!loggedIn) return (
    <main className="xp-login">
      <div className="login-top" />
      <div className="login-body">
        <div className="login-content">
          <section className="login-brand" aria-label="Windows XP inspired portfolio">
            <div className="xp-wordmark">
              <WindowsMark className="login-windows-mark" />
              <span className="microsoft">Microsoft</span>
              <div className="windows-word">Windows<span className="xp-suffix">xp</span></div>
            </div>
            <p>To begin, click your user name</p>
          </section>
          <div className="login-divider" />
          <section className="login-users" aria-label="Choose a profile">
            <button className="profile-button" onClick={() => setLoggedIn(true)} aria-label="Enter Pearl's portfolio">
              <span className="profile-avatar"><img src={portrait} alt="" /></span>
              <span className="profile-name">Pearl</span>
              <span className="profile-arrow" aria-hidden="true">➜</span>
            </button>
          </section>
        </div>
      </div>
      <footer className="login-bottom"><span className="login-hint">A little nostalgia. A little about me.</span><span className="login-caption">Pearl's portfolio</span></footer>
    </main>
  );

  return (
    <main className="xp-desktop" aria-label="Pearl's portfolio desktop">
      <div className="desktop-wallpaper" aria-hidden="true"><div className="cloud cloud-one" /><div className="cloud cloud-two" /><div className="hill hill-back" /><div className="hill hill-front" /></div>
      <nav className="desktop-icons" aria-label="Portfolio folders">
        {Object.entries(sections).map(([key, name]) => (
          <button className="desktop-icon" key={key} onClick={() => openWindow(key)}>
            <DesktopIcon kind={key === 'home' ? 'computer' : key === 'contact' ? 'contact' : 'folder'} />
            <span>{name}</span>
          </button>
        ))}
      </nav>

      {activeWindow && !minimized && <section className={`xp-window ${maximized ? 'maximized' : ''}`} aria-labelledby="window-title">
        <header className="window-titlebar">
          <div className="window-title"><DesktopIcon kind={activeWindow === 'home' ? 'computer' : 'folder'} /><h1 id="window-title">{sections[activeWindow]} — Pearl's portfolio</h1></div>
          <div className="window-controls">
            <button aria-label="Minimize window" onClick={() => setMinimized(true)}>_</button>
            <button aria-label={maximized ? 'Restore window' : 'Maximize window'} onClick={() => setMaximized(!maximized)}>□</button>
            <button className="close-window" aria-label="Close window" onClick={() => setActiveWindow(null)}>×</button>
          </div>
        </header>
        <div className="window-menubar"><span>File</span><span>Edit</span><span>View</span><span>Favorites</span><span>Tools</span><span>Help</span></div>
        <div className="window-address"><span>Address</span><div><DesktopIcon kind="folder" /><span>C:\Pearl\{sections[activeWindow]}</span></div><span className="address-go">➜ Go</span></div>
        <div className="window-content">
          {activeWindow === 'home' && <div className="desktop-home"><span className="welcome-label">Welcome to my desktop</span><h2>Hi, I'm Pearl.</h2><p>Make yourself at home.</p><div className="home-shortcuts"><button onClick={() => openWindow('about')}><DesktopIcon /><span>About Me</span></button><button onClick={() => openWindow('contact')}><DesktopIcon kind="contact" /><span>Contact</span></button></div></div>}
          {activeWindow === 'about' && <div className="desktop-about"><h2>About Me</h2><p>This folder is a work in progress.</p></div>}
          {activeWindow === 'contact' && <Contact />}
        </div>
        <footer className="window-status">{activeWindow === 'home' ? '2 objects' : '1 object'}<span>My Computer</span></footer>
      </section>}

      {startOpen && <nav className="start-menu" aria-label="Start menu"><header><span className="start-avatar"><img src={portrait} alt="" /></span>Pearl</header><div className="start-menu-items">{Object.entries(sections).map(([key,name])=><button key={key} onClick={()=>openWindow(key)}><DesktopIcon kind={key==='home'?'computer':key==='contact'?'contact':'folder'} />{name}</button>)}</div><footer><button onClick={logOff}><span aria-hidden="true">↪</span> Log Off</button></footer></nav>}
      <footer className="taskbar"><button className={`start-button ${startOpen ? 'pressed' : ''}`} aria-expanded={startOpen} onClick={() => setStartOpen(!startOpen)}><WindowsMark />start</button><div className="taskbar-tasks">{activeWindow && <button className={!minimized ? 'selected' : ''} onClick={() => setMinimized(!minimized)}><DesktopIcon kind={activeWindow==='home'?'computer':'folder'} />{sections[activeWindow]}</button>}</div><div className="system-tray"><span aria-hidden="true">♪</span><time>{time.toLocaleTimeString('en-US', {hour:'numeric',minute:'2-digit',timeZone:'America/Los_Angeles'})}</time></div></footer>
    </main>
  );
}

export default App;
