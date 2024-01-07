import { createContext } from "react";
import React, { useState, useContext } from 'react';
import axios from 'axios';
import config from '../config';
import UserContext from "./userContext";
import LoginContext from "./loginContext";

const EmailContext = createContext()

const EmailProvider = ({ children}) => {

  const [email, setEmail] = useState('esty2048@gmail.com');
  const [subject, setSubject] = useState('hi esty ');
  const [message, setMessage] = useState('ff');
  let { user } = useContext(UserContext);
  const { stringPath} = useContext(LoginContext)

  const sendEmail = async () => {
    try {
      console.log('i send email now');
      console.log(stringPath);
      

      await axios.post(`${config.BASE_URL}mail/send-email`, {
        to: user.email,
        subject: "NAVit: Here is your path!",
        text: `Visit stores in the following order: ${stringPath}`,
      });
      alert('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Error sending email. Please try again.');
    }


  };

  const shared = { sendEmail, message, setMessage, subject, setSubject, email, setEmail }
  return (
    <EmailContext.Provider value={shared}>
      {children}
    </EmailContext.Provider>
  )
}

export { EmailProvider };

export default EmailContext;