
import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import portrait from '../assets/pearl-portrait.jpg';
import aimIcon from '../assets/aim-icon.webp';
import './Contact.css';

const Contact = ({ deliveredMessage = null, onDelivered }) => {
   const form = useRef();
  const [opening, setOpening] = useState(!deliveredMessage);
  useEffect(() => {
    if (deliveredMessage) return;
    document.body.classList.add('aim-opening');
    const timer = setTimeout(() => {
      setOpening(false);
      document.body.classList.remove('aim-opening');
    }, 2000);
    return () => {
      clearTimeout(timer);
      document.body.classList.remove('aim-opening');
    };
  }, [deliveredMessage]);
  const [formData, setFormData] = useState(deliveredMessage || {
    name: '',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(Boolean(deliveredMessage));
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  const sendingRef = useRef(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sendingRef.current || formSubmitted) return;
    sendingRef.current = true;
    setSending(true);
    setSendError(false);
    try {
      await emailjs.sendForm('service_21bdrd3', 'template_5zx5y3c', form.current, 'wNPhAuVnDlHX3F2tE');
      setFormSubmitted(true);
      onDelivered?.({ ...formData });
    } catch {
      setSendError(true);
    } finally {
      sendingRef.current = false;
      setSending(false);
    }
  };

  if (opening) return (
    <div className="aim-opening-screen" role="status">
      <img src={aimIcon} alt="" />
      <h2>AOL Instant Messenger</h2>
      <p>Opening your message window…</p>
      <div className="xp-mail-progress" aria-hidden="true"><div><span /><span /><span /></div></div>
    </div>
  );

  return (
    <div className={`contact-view aim-messenger ${sending ? 'is-sending' : ''}`} aria-busy={sending}>
      <div className="aim-menubar"><div aria-hidden="true"><span>File</span><span>Edit</span><span>Insert</span><span>People</span></div><span className="aim-offline-status">pearl is offline</span></div>
      <div className="aim-history-row">
        <div className="aim-avatar-rail" aria-hidden="true"><img className="aim-pearl-avatar" src={portrait} alt="" /></div>
        <div className="aim-conversation" aria-label="Conversation with pearl">
          <p className="aim-away"><strong>pearl:</strong> hey i'm afk right now, just leave me a message (goes to my email) and i'll get back to you asap!</p>
          {formSubmitted && <p className="aim-sent"><strong>{formData.name}:</strong> {formData.message}</p>}
        </div>
      </div>
      <form ref={form} onSubmit={handleSubmit} className="aim-compose contact-form-content">
        <label className="aim-name">Your name: <input type="text" name="name" aria-label="Name" required readOnly={sending || formSubmitted} value={formData.name} onChange={handleChange} placeholder="Your screen name" /></label>
        <div className="aim-compose-row">
          <div className="aim-avatar-rail aim-own-avatar" aria-hidden="true"><img src={aimIcon} alt="" /></div>
          <div className="aim-editor">
            <div className="aim-formatting" aria-hidden="true"><span className="aim-font-tools">ᴀ <b>▣</b> <small>ᴀ⌄</small> A <b>ᴬA</b></span><b>B</b><i>I</i><u>U</u><span className="aim-link-tool">link</span><span>✉</span><span>☺</span></div>
            <textarea className={formSubmitted ? 'aim-confirmation' : undefined} name="message" aria-label="Note" required readOnly={sending || formSubmitted} value={formSubmitted ? 'Thanks for the note! Your message has been sent to pearl.' : formData.message} onChange={handleChange} placeholder="" rows="4" />
            {formSubmitted && <span className="aim-sr-only" role="status">Your message has been sent to pearl.</span>}
          </div>
        </div>
        {sendError && <p role="alert" className="aim-send-error">Your note couldn’t be sent. Your message is still here—please try again later, or contact me on <a href="https://www.linkedin.com/in/pearl-tsang" target="_blank" rel="noopener noreferrer">LinkedIn</a>.</p>}
        <div className="aim-send-row"><div className="aim-bottom-tools" aria-hidden="true"><span><i>⚡</i>Warn</span><span><i>⊘</i>Block</span><span className="aim-tool-divider" /><span><i>🎨</i>Expressions</span><span><i>🎲</i>Games</span><span className="aim-tool-muted"><i>◉</i>Video</span><span className="aim-tool-muted"><i>♟</i>Talk</span></div><button type="submit" disabled={sending || formSubmitted}><span aria-hidden="true">✉</span>{sending ? 'Sending…' : 'Send'}</button></div>
      </form>
      <div className="aim-statusbar">pearl is offline<span>AIM</span></div>
    </div>
  );
};

export default Contact;
