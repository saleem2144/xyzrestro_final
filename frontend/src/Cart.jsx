import React, { useContext } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';

function Cart() {
    const { cart, setCart } = useContext(CartContext);

    const handleRemoveFromCart = (productId) => {
        const newCart = cart.filter((product) => product.id !== productId);
        setCart(newCart);
    };

    const handleClearCart = () => {
        setCart([]);
    };

    const handleQuantity = (e) => {
        const _cart = [...cart];
        const _product = _cart.find(_product => _product.id === parseInt(e.target.id));
        _product.quantity = parseInt(e.target.value);
        setCart(_cart);
    }

    return (
        <Container style={{ paddingTop: '56px' }}>
            <h1>Cart</h1>
            {cart.length === 0 ? <p>Your cart is empty</p> : (
                <>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td><input type="number" id={product.id} value={product.quantity} onChange={handleQuantity} /></td>
                                    <td>${(product.quantity * product.price).toFixed(2)}</td>
                                    <td>
                                        <Button variant="danger" onClick={() => handleRemoveFromCart(product.id)}>
                                            Remove
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div className="d-flex justify-content-end mb-2">
                        <Button variant="secondary" className="mr-2" onClick={handleClearCart}>
                            Clear Cart
                        </Button>
                        <Link to="/menu/checkout">
                            <Button variant="primary">
                                Checkout
                            </Button>
                        </Link>
                    </div>
                </>
            )}
        </Container>
    );
}

export default Cart;
