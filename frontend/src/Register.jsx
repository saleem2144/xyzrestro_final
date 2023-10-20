import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // check if password and confirm password match
    if (password !== confirmPassword) {
      console.log(password, confirmPassword)
      alert('Passwords do not match');
      return;
    }

    fetch(import.meta.env.VITE_API_URL + '/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "name": name,
        "email": email,
        "password": password,
        "role": "customer"
      })
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log('Success:', data);
        // // alert
        // alert('User registered successfully');
        // // navigate to the login page
        // navigate('/login');
        if (data.code == 200) {
          console.log('Success:', data);
          // alert
          alert('User registered successfully');
          // navigate to the login page
          navigate('/login');
        } else if (data.code == 400) {
          alert('Email already exists');
        } else {
          alert('Error registering user');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        // alert
        alert('Error registering user');
      });
  };

  return (
    <Container fluid style={{ paddingTop: '56px' }}>
      <div style={{ maxWidth: "500px", margin: "0 auto" }}>
        <h1 style={{textAlign:"center"}}>Register</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name" className='mb-2'>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </Form.Group>

          <Form.Group controlId="email" className='mb-2'>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Form.Group>

          <Form.Group controlId="password" className='mb-2'>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Form.Group>

          <Form.Group controlId="confirmPassword" className='mb-2'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </Form.Group>

          <Button variant="primary" type="submit">
            Register
          </Button>

          <div className="mt-2">
            <p>Already have an account? <Link to="/login">Login</Link></p>
          </div>
        </Form>
      </div>
    </Container>
  );
}

export default Register;
