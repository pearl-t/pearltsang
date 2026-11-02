import portrait from '../assets/pearl-portrait.jpg';
import './MyspaceProfile.css';

export default function MyspaceProfile({ onNavigate }) {
  return (
    <article className="myspace-profile" aria-label="Pearl's Facespace profile">
      <header className="myspace-header">
        <span className="myspace-logo"><span aria-hidden="true">♟♟♟</span> facespace.com</span>
        <span>a space for Pearl</span>
      </header>
      <nav className="myspace-nav" aria-label="Profile navigation">
        <button onClick={() => onNavigate('home')}>Home</button><span>|</span>
        <span aria-current="page">My Profile</span><span>|</span>
        <button onClick={() => onNavigate('contact')}>Contact</button>
      </nav>
      <div className="myspace-columns">
        <aside className="myspace-sidebar">
          <h2>Pearl</h2>
          <div className="myspace-identity">
            <img className="myspace-photo" src={portrait} alt="Pearl smiling" />
            <div><p>“Hi, my name is Pearl.”</p><p className="myspace-online"><span aria-hidden="true">✦</span> Online Now!</p></div>
          </div>
          <section className="myspace-contact" aria-labelledby="myspace-contact-heading">
            <h3 id="myspace-contact-heading">Contacting Pearl</h3>
            <div><button onClick={() => onNavigate('contact')}><span aria-hidden="true">✉</span> Send Message</button><a href="https://www.linkedin.com/in/pearl-tsang/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href="https://github.com/pearl-t" target="_blank" rel="noopener noreferrer">GitHub ↗</a></div>
          </section>
          <div className="myspace-url"><strong>Facespace URL:</strong><br />facespace.com/pearl</div>
          <section className="myspace-interests" aria-labelledby="myspace-interests-heading"><h3 id="myspace-interests-heading">Pearl's Interests</h3><div><strong>General</strong><span>Coming soon...</span></div><div><strong>Music</strong><span>Coming soon...</span></div></section>
        </aside>
        <div className="myspace-main">
          <div className="myspace-network">Pearl is in your extended network</div>
          <section className="myspace-blurbs" aria-labelledby="myspace-blurbs-heading">
            <h3 id="myspace-blurbs-heading">Pearl's Blurbs</h3>
            <h4>About me:</h4>
            <p>Hi, I'm Pearl. Welcome to my space!</p>
            <p>I'm still making myself at home here. More about me soon.</p>
            <h4>Who I'd like to meet:</h4>
            <p>You! <button className="myspace-text-link" onClick={() => onNavigate('contact')}>Leave me a message.</button></p>
          </section>
          <section className="myspace-comments" aria-labelledby="myspace-comments-heading"><h3 id="myspace-comments-heading">Pearl's Comments</h3><p>No comments yet.</p><button className="myspace-text-link" onClick={() => onNavigate('contact')}>Be the first to say hello »</button></section>
        </div>
      </div>
      <footer className="myspace-footer">Thanks for stopping by ♥</footer>
    </article>
  );
}
