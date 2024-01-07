import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [msg, setMsg] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMsg(true)
    console.log('Form submitted:', formData);
    setFormData({
        name: '',
        email: '',
        message: '',
      });
  };

  return (
    <>
      <div style={{ minHeight: '90vh' }}>
        <Card sx={{ minHeight: '50%', minWidth: 275, width: '60%', marginLeft: '20%', marginTop: '2%', padding: '9px', marginBottom: '2%' }}>
          <CardContent>
          <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography align='center' variant='h5'
                  sx={{ color: '#4a4cf5', borderRadius: '25px', padding: '15px', minWidth: '400px', height: '100px' }}
                >Contact Us <br/> We promise to get back to you:)
                </Typography>
            <img style={{ width: '250px' }} src={`../../images/contact.jpg`} />
            </div>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Your Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required= {true}
              />
              <TextField
                label="Message"
                name="message"
                multiline
                rows={4}
                value={formData.message}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <Button type="submit" variant="outlined" color="primary" sx={{ marginTop: '20px', borderColor: '#4a4cf5', color: '#4a4cf5' }}>
                Submit
              </Button>
              {msg && ( <Typography sx={{ color: '#4a4cf5'}}><br />Your message was submmited!</Typography>)}
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};