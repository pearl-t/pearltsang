import portrait from '../assets/pearl-portrait.jpg';
import tuna from '../assets/cats/cat-02.jpg';
import cleo from '../assets/cats/cat-01.jpg';
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
            <div><p>𓇼 ⋆.˚ 𓆉 𓆝 𓆡⋆.˚</p><p>She/Her<br />Oakland, California<br />United States</p><p className="myspace-online"><span aria-hidden="true">✦</span> Online Now!</p></div>
          </div>
          <section className="myspace-contact" aria-labelledby="myspace-contact-heading">
            <h3 id="myspace-contact-heading">Contacting Pearl</h3>
            <div><button onClick={() => onNavigate('contact')}><span aria-hidden="true">✉</span> Send Message</button><a href="https://www.linkedin.com/in/pearl-tsang" target="_blank" rel="noopener noreferrer" className="profile-linkedin"><svg viewBox="0 0 24 24" aria-hidden="true"><rect width="24" height="24" rx="2" fill="#0a66c2" /><path fill="#fff" d="M5 9h3v10H5zm1.5-5a1.7 1.7 0 1 1 0 3.4 1.7 1.7 0 0 1 0-3.4zM10 9h3v1.4c.6-1 1.6-1.7 3-1.7 3 0 3.5 1.9 3.5 4.4V19h-3v-5.2c0-1.3 0-2.8-1.7-2.8S13 12.3 13 13.7V19h-3z" /></svg><span>Go to Linkedin</span></a></div>
          </section>
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
          <section className="myspace-friends" aria-labelledby="myspace-friends-heading">
            <h3 id="myspace-friends-heading">Pearl's Friends</h3>
            <p>Pearl has <strong>2</strong> friends.</p>
            <div className="myspace-friends-grid">
              <div><span>Tuna</span><img src={tuna} alt="" /></div>
              <div><span>Cleo</span><img src={cleo} alt="" /></div>
            </div>
          </section>
        </div>
      </div>
      <footer className="myspace-footer">Thanks for stopping by ♥</footer>
    </article>
  );
}
