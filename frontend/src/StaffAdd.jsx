import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function StaffAdd() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: ''
  });

    const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    
    fetch(import.meta.env.VITE_API_URL + '/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "name": formData.name,
            "email": formData.email,
            "password": formData.password,
            "address": formData.address,
            "role": "staff"
        })
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            // alert
            alert('Staff added successfully');
            // navigate to the products list page
            navigate('/dashboard/staffs');
        })
        .catch((error) => {
            console.error('Error:', error);
            // alert
            alert('Error adding staff');
        });
  };

  return (
    <Container>
        <h1>Staff Add</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        {/* password */}
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            as="textarea"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <br />
        <br />
        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </Container>
  );
}

export default StaffAdd;
