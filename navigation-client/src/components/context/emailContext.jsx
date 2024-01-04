
import { createContext } from "react";
import React, { useState } from 'react';
import axios from 'axios';
import config from '../config';

const EmailContext = createContext()

const EmailProvider = ({ children }) => {

  const [email, setEmail] = useState('esty2048@gmail.com');
  const [subject, setSubject] = useState('hi esty ');
  const [message, setMessage] = useState('ff');

  const sendEmail = async () => {
    try {
console.log('i send email now');
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

  const shared = {sendEmail,message,setMessage,subject,setSubject ,email,setEmail}
  return (
    <EmailContext.Provider value={shared}>
      {children}
    </EmailContext.Provider>
  )
}

export { EmailProvider }; 

export default EmailContext;






