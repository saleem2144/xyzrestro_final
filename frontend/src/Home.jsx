import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Container className="my-5">
      <div className="bg-light p-5 rounded">
        <h1>Welcome to XYZ Restro!</h1>
        <p>
          At XYZ Restro, we serve a variety of delicious dishes and refreshing beverages. Our chefs use only the freshest ingredients to prepare your meals, and our staff is always ready to serve you with a smile.
        </p>
        <p>
          Take a look at our <Link to="/menu">menu</Link> to see the wide range of options we offer. Whether you're in the mood for a hearty main dish or a light beverage, we have something for everyone.
        </p>
        <p>
          <Button variant="primary" as={Link} to="/menu">View Menu</Button>
        </p>
      </div>
    </Container>
  );
}

export default Home;
