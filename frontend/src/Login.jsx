import React, { useState, useContext } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { UserContext } from './UserContext';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const { login } = useContext(UserContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to handle user login
        fetch(import.meta.env.VITE_API_URL + '/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                if (data.role === 'admin' || data.role === 'staff') {
                    login(data);
                    navigate('/dashboard');
                } else if (data.role === 'customer') {
                    login(data);
                    navigate('/menu');
                } else {
                    alert('Invalid email or password');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                // alert
                alert('Error logging in user');
            });
    };

    return (
        <Container fluid style={{ paddingTop: '56px' }}>
            <div style={{ maxWidth: "500px", margin: "0 auto" }}>
                <h1 style={{textAlign: "center"}}>Login</h1>
                <Form onSubmit={handleSubmit}>

                    <Form.Group controlId="email" className='mb-2'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </Form.Group>

                    <Form.Group controlId="password" className='mb-2'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Login
                    </Button>

                    <div className="mt-2">
                        <p>Don't have an account? <Link to="/register">Register</Link></p>
                    </div>
                </Form>
            </div>
        </Container>
    );
}

export default Login;
