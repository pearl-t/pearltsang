
import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import mailIcon from '../assets/xp-icons/email.png';
import './Contact.css';

const Contact = () => {
   const form = useRef();
  const [formData, setFormData] = useState({
    name: '',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
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
    if (sendingRef.current) return;
    sendingRef.current = true;
    setSending(true);
    setSendError(false);
    try {
      await emailjs.sendForm('service_21bdrd3', 'template_5zx5y3c', form.current, 'wNPhAuVnDlHX3F2tE');
      setFormSubmitted(true);
    } catch {
      setSendError(true);
    } finally {
      sendingRef.current = false;
      setSending(false);
    }
  };

  return (
    <div className={`container App contact-view ${sending ? 'is-sending' : ''}`} aria-busy={sending}>
        {sending && <div className="xp-mail-loading" role="status" aria-live="polite">
          <div className="xp-mail-loading-title">Sending a little hello</div>
          <div className="xp-mail-loading-body">
            <div className="xp-mail-route" aria-hidden="true"><img src={mailIcon} alt="" /><span>· · · · ·</span><span className="xp-mail-destination">🦪</span></div>
            <h2>Sending your note…</h2>
            <p>A little message, on its way to Pearl.</p>
            <div className="xp-mail-progress" aria-hidden="true"><div><span /><span /><span /></div></div>
            <small>Please wait while your note travels through cyberspace.</small>
          </div>
        </div>}
        <div className="max-w-md mx-auto mt-8 contact-form-content">
        {!formSubmitted ? (
            <>
            <h1 className="text-3xl mt-3 font-bold mb-5" style={{ fontFamily: 'TheSeasonsBD' }}>
                Drop a note!
            </h1>
            <form ref={form} onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        aria-label="Name"
                        readOnly={sending}
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <textarea
                        id="message"
                        name="message"
                        aria-label="Note"
                        readOnly={sending}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Note"
                        rows="4"
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    ></textarea>
                </div>
                <div>
                <button type="submit" disabled={sending}>{sending ? 'Sending…' : 'Submit'}</button>
                </div>
                {sendError && <p role="alert" style={{ color: '#a22518', margin: '6px 0', lineHeight: 1.5 }}>Your note couldn’t be sent. Your message is still here—please try again later, or contact me on <a href="https://www.linkedin.com/in/pearl-tsang" target="_blank" rel="noopener noreferrer">LinkedIn</a>.</p>}
            </form>
            </>
        ):(
        <div>
        <p>Thanks for the note!</p>
        </div>
        )}
        </div>
    </div>
  );
};

export default Contact;
