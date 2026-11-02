import { useEffect, useState } from 'react';
import './App.css';
import computerIcon from './assets/xp-icons/computer.png';
import internetIcon from './assets/xp-icons/internet-explorer.png';
import contactIcon from './assets/xp-icons/email.png';
import folderIcon from './assets/xp-icons/folder.png';
import minesweeperIcon from './assets/xp-icons/minesweeper.png';
import photosIcon from './assets/xp-icons/photos.png';
import Photos from './components/Photos';
import Resume from './components/Resume';
import frogAvatar from './assets/xp-frog.png';
import loginPortrait from './assets/pearl-portrait.jpg';
import Contact from './components/Contact';
import Minesweeper from './components/MinesweeperGame';
import { DIFFICULTIES } from './components/minesweeperLogic';
import MyspaceProfile from './components/MyspaceProfile';

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

const desktopIconImages = { computer: computerIcon, internet: internetIcon, contact: contactIcon, folder: folderIcon, minesweeper: minesweeperIcon, photos: photosIcon };

function DesktopIcon({ kind = 'folder' }) {
  if (kind === 'resume') return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M12 3h24l7 8v33H12z" fill="#fff" stroke="#7b8b83" /><path d="M36 3v9h7" fill="#dce8df" stroke="#7b8b83" /><path d="M18 17h20v20H18zM18 23h20M18 30h20M25 17v20M32 17v20" fill="none" stroke="#539465" /><path d="M3 11l23-4v36L3 39z" fill="#257441" stroke="#164e2a" /><path d="M8 19h4l3 5 3-5h4l-5 8 5 9h-4l-3-6-3 6H8l5-9z" fill="white" /></svg>;
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <image href={desktopIconImages[kind] || folderIcon} width="48" height="48" />
    </svg>
  );
}

const iconKinds = { home: 'computer', about: 'internet', contact: 'contact', minesweeper: 'minesweeper', photos: 'photos', resume: 'resume' };

const sections = { home: 'Home', about: 'About Me', contact: 'Contact', minesweeper: 'Minesweeper', photos: 'Photos', resume: 'Resume.xls' };

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [autoEnter, setAutoEnter] = useState(true);
  const [resumeUnlocked, setResumeUnlocked] = useState(false);
  const [mineDifficulty, setMineDifficulty] = useState('beginner');
  const [activeWindow, setActiveWindow] = useState('home');
  const [minimized, setMinimized] = useState(false);
  const [maximized, setMaximized] = useState(false);
  const [startOpen, setStartOpen] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (loggedIn || !autoEnter) return;
    const timer = setTimeout(() => setLoggedIn(true), 10000);
    return () => clearTimeout(timer);
  }, [loggedIn, autoEnter]);

  function openWindow(section) {
    setActiveWindow(section);
    setMinimized(false);
    setStartOpen(false);
  }

  function logOff() {
    setAutoEnter(false);
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
          <section className="login-brand" aria-label="Windows XP inspired personal website">
            <div className="xp-wordmark">
              <WindowsMark className="login-windows-mark" />
              <span className="microsoft">Microsoft</span>
              <div className="windows-word">Windows<span className="xp-suffix">xp</span></div>
            </div>
            <p>To begin, click your user name</p>
          </section>
          <div className="login-divider" />
          <section className="login-users" aria-label="Choose a profile">
            <button className="profile-button" onClick={() => setLoggedIn(true)} aria-label="Enter Pearl's world">
              <span className="profile-avatar"><img src={loginPortrait} alt="" /></span>
              <span className="profile-name">Pearl</span>
              <span className="profile-arrow" aria-hidden="true">➜</span>
            </button>
          </section>
        </div>
      </div>
      <div className="login-bottom" aria-hidden="true" />
    </main>
  );

  return (
    <main className="xp-desktop" aria-label="Pearl's world desktop">
      <div className="desktop-wallpaper" aria-hidden="true" />
      <nav className="desktop-icons" aria-label="Desktop folders">
        {Object.entries(sections).map(([key, name]) => (
          <button className="desktop-icon" key={key} onClick={() => openWindow(key)}>
            <DesktopIcon kind={iconKinds[key]} />
            <span>{name}</span>
          </button>
        ))}
      </nav>

      {activeWindow && <section className={`xp-window ${maximized ? 'maximized' : ''} ${activeWindow === 'minesweeper' ? 'minesweeper-window' : ''} ${activeWindow === 'about' ? 'myspace-window' : ''} ${activeWindow === 'photos' ? 'photos-window' : ''} ${activeWindow === 'resume' ? 'resume-window' : ''}`} style={{ ...(minimized ? { display: 'none' } : {}), '--mine-window-width': `${Math.max(354, DIFFICULTIES[mineDifficulty].columns * 28 + 54)}px` }} aria-labelledby="window-title">
        <header className="window-titlebar">
          <div className="window-title"><DesktopIcon kind={iconKinds[activeWindow]} /><h1 id="window-title">{activeWindow === 'minesweeper' ? 'Minesweeper' : activeWindow === 'resume' ? 'Resume.xls — Microsoft Excel' : activeWindow === 'about' ? 'Pearl’s Facespace — Microsoft Internet Explorer' : `${sections[activeWindow]} — Pearl's world`}</h1></div>
          <div className="window-controls">
            <button aria-label="Minimize window" onClick={() => setMinimized(true)}>_</button>
            <button aria-label={maximized ? 'Restore window' : 'Maximize window'} onClick={() => setMaximized(!maximized)}>□</button>
            <button className="close-window" aria-label="Close window" onClick={() => setActiveWindow(null)}>×</button>
          </div>
        </header>
        {activeWindow !== 'minesweeper' && activeWindow !== 'resume' && <><div className="window-menubar"><span>File</span><span>Edit</span><span>View</span><span>Favorites</span><span>Tools</span><span>Help</span></div>
        <div className="window-address"><span>Address</span><div><DesktopIcon kind={activeWindow === 'about' ? 'internet' : 'folder'} /><span>{activeWindow === 'about' ? 'http://www.facespace.com/pearl' : `C:\\Pearl\\${sections[activeWindow]}`}</span></div><span className="address-go">➜ Go</span></div></>}
        <div className="window-content">
          {activeWindow === 'home' && <div className="desktop-home"><span className="welcome-label">Welcome to my desktop</span><h2>Hello World, I'm Pearl</h2><p>Make yourself at home.</p><div className="home-shortcuts"><button onClick={() => openWindow('about')}><DesktopIcon kind="internet" /><span>About Me</span></button><button onClick={() => openWindow('contact')}><DesktopIcon kind="contact" /><span>Contact</span></button><button onClick={() => openWindow('minesweeper')}><DesktopIcon kind="minesweeper" /><span>Minesweeper</span></button><button onClick={() => openWindow('photos')}><DesktopIcon kind="photos" /><span>Photos</span></button><button onClick={() => openWindow('resume')}><DesktopIcon kind="resume" /><span>Resume.xls</span></button></div></div>}
          {activeWindow === 'about' && <MyspaceProfile onNavigate={openWindow} />}
          {activeWindow === 'contact' && <Contact />}
          {activeWindow === 'photos' && <Photos keyboardActive={!minimized && !startOpen} />}
          {activeWindow === 'resume' && <Resume unlocked={resumeUnlocked} onUnlock={() => setResumeUnlocked(true)} onCancel={() => setActiveWindow(null)} />}
          {activeWindow === 'minesweeper' && <Minesweeper difficulty={mineDifficulty} onDifficultyChange={setMineDifficulty} />}
        </div>
        <footer className="window-status">{activeWindow === 'minesweeper' ? `${DIFFICULTIES[mineDifficulty].label} · ${DIFFICULTIES[mineDifficulty].mines} mines` : activeWindow === 'resume' ? 'Ready' : activeWindow === 'photos' ? '4 photos' : activeWindow === 'about' ? 'Done' : activeWindow === 'home' ? '5 objects' : '1 object'}<span>{activeWindow === 'about' ? 'Internet' : 'My Computer'}</span></footer>
      </section>}

      {startOpen && <nav className="start-menu" aria-label="Start menu"><header><span className="start-avatar"><img src={frogAvatar} alt="" /></span>Pearl</header><div className="start-menu-items">{Object.entries(sections).map(([key,name])=><button key={key} onClick={()=>openWindow(key)}><DesktopIcon kind={iconKinds[key]} />{name}</button>)}</div><footer><button onClick={logOff}><span aria-hidden="true">↪</span> Log Off</button></footer></nav>}
      <footer className="taskbar"><button className={`start-button ${startOpen ? 'pressed' : ''}`} aria-expanded={startOpen} onClick={() => setStartOpen(!startOpen)}><WindowsMark />start</button><div className="taskbar-tasks">{activeWindow && <button className={!minimized ? 'selected' : ''} onClick={() => setMinimized(!minimized)}><DesktopIcon kind={iconKinds[activeWindow]} />{sections[activeWindow]}</button>}</div><div className="system-tray"><span aria-hidden="true">♪</span><time>{time.toLocaleTimeString('en-US', {hour:'numeric',minute:'2-digit',timeZone:'America/Los_Angeles'})}</time></div></footer>
    </main>
  );
}

export default App;
