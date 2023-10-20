import React, { useState, useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function ProductDetail() {
  const { product_id } = useParams();
  const [product, setProduct] = useState(null);

    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL + '/products/' + product_id)
            .then((response) => response.json())
            .then((data) => {
                setProduct(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [product_id]);


  const handleAddToCart = () => {
    // Logic to add the product to the cart
    console.log('Add to Cart button clicked', product);
  };

  if (!product) {
    return (
      <Container>
        <h1>Product not found</h1>
      </Container>
    );
  }

  return (
    <Container style={{marginTop: "100px", textAlign:"center"}}>
      <div style={{maxWidth: "400px", margin:"0 auto"}}>
        <img style={{width: "100%"}} src={product.image} alt={product.name} />
      </div>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p>${product.price}</p>
        <Button variant="primary" onClick={handleAddToCart}>
            Add to Cart
        </Button>

    </Container>
  );
}

export default ProductDetail;
