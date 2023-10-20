import React, { useContext, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { CartContext } from './CartContext';
import { UserContext } from './UserContext';

function Checkout() {
  const { cart, setCart } = useContext(CartContext);
    const { user } = useContext(UserContext);

  const [creditCard, setCreditCard] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleOrder = () => {
    // // Logic to place the order
    // console.log('Order placed:', {
    //   creditCard,
    //   expiryDate,
    //   cvv,
    //   cart,
    // });
    
    // // clear cart
    // setCart([]);

    // format data to this [{ userId, productId, quantity }]
    const order = cart.map(product => ({
      userId: user.id,
      productId: product.id,
      quantity: product.quantity,
    }));

    fetch(import.meta.env.VITE_API_URL + '/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            // clear cart
            setCart([]);

            // alert
            alert('Order placed successfully');
        })
        .catch((error) => {
            console.error('Error:', error);
            // alert
            alert('Error placing order');
        });
  };

  return (
    <Container style={{ paddingTop: '56px' }}>
      <h1>Checkout</h1>
      {/* total price to pay */}
        <p>Total: ${cart.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2)}</p>
      <Form>
        <Form.Group controlId="creditCard">
          <Form.Label>Credit Card Number</Form.Label>
          <Form.Control type="text" value={creditCard} onChange={(e) => setCreditCard(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="expiryDate">
          <Form.Label>Expiry Date</Form.Label>
          <Form.Control type="text" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="cvv" className='mb-2'>
          <Form.Label>CVV</Form.Label>
          <Form.Control type="text" value={cvv} onChange={(e) => setCvv(e.target.value)} />
        </Form.Group>


        <Button variant="primary" onClick={handleOrder}>
          Order
        </Button>
      </Form>
    </Container>
  );
}

export default Checkout;
