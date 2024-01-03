import React, { useState } from 'react';
import axios from 'axios';
import config from './config';


const EmailComponent = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const sendEmail = async () => {
    try {

        console.log("hiiii");
        
      await axios.post(`${config.BASE_URL}mail/send-email`, {
        to: email,
        subject,
        text: message,
      });
      alert('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Error sending email. Please try again.');
    }
  };

  return (
    <div>
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

      <label>Subject:</label>
      <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />

      <label>Message:</label>
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} />

      <button onClick={sendEmail}>Send Email</button>
    </div>
  );
};

export default EmailComponent;
