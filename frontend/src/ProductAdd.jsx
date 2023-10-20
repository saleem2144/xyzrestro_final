import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ProductAdd() {
  const [formData, setFormData] = useState({
    productName: '',
    category: 'Main Dish',
    price: '',
    description: '',
    image: ''
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData,
        image: reader.result
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // post the form data to the server
    fetch(import.meta.env.VITE_API_URL + '/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "name": formData.productName,
            "category": formData.category,
            "price": formData.price,
            "description": formData.description,
            "image": formData.image
        })
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            // alert
            alert('Product added successfully');
            // navigate to the products list page
            navigate('/dashboard/products');
        })
        .catch((error) => {
            console.error('Error:', error);
            // alert
            alert('Error adding product');
        });
    console.log('Form data submitted:', formData);
    // You can add logic here to save the form data
  };

  return (
    <Container>
        <h1>Products Add</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="productName">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option>Main Dish</option>
            <option>Beverages</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="image">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
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

export default ProductAdd;
