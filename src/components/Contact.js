
import React, { useState, useRef } from 'react';
import Button from "./Button";
import emailjs from '@emailjs/browser';

const Contact = () => {
   const form = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    emailjs.sendForm('service_21bdrd3', 'template_5zx5y3c', form.current, 'wNPhAuVnDlHX3F2tE')
    .then((result) => {
        setFormSubmitted(true);
    }, (error) => {
        console.error('Error submitting form:', error);
    });
  };

  return (
    <div className="col-span-8 container">         
        <div className="max-w-md mx-auto mt-8">
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
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Message"
                        rows="4"
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    ></textarea>
                </div>
                <div>
                <Button buttonText={'Submit'}/>
                </div>
            </form>
            </>
        ):(
        <div>
        <p>Thanks for the holler, please I'll reach out shortly!</p>
        </div>
        )}
        </div>
    </div>        
  );
};

export default Contact;