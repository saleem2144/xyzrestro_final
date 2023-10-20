import React, { useState, useEffect, useContext } from 'react';
import { Container, Card, Row, Button, CardGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';

function Menu() {
    const [products, setProducts] = useState([]);
    const { cart, setCart } = useContext(CartContext);

    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL + '/products')
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    const handleAddToCart = (e, product) => {
        // Logic to add the product to the cart
        console.log('Add to Cart button clicked', product);
        // setCart([...cart, product]);
        // check if product is already in cart
        const _cart = [...cart];
        const _product = _cart.find(_product => _product.id === product.id);
        if (_product) {
            // product already in cart
            _product.quantity += 1;
        } else {
            // product not in cart
            _cart.push({ ...product, quantity: 1 });
        }
        setCart(_cart);
    };

    const mainDishes = products.filter(product => product.category === 'Main Dish');
    const beverages = products.filter(product => product.category === 'Beverages');

    const renderProductCard = (product) => (
        <Card style={{ padding: "10px", margin: "10px" }} key={product.id}>
            <Link to={`/menu/${product.id}`} style={{ textDecoration: 'none' }}>
                <Card.Img variant="top" src={product.image} alt={product.name} />
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>${product.price}</Card.Text>
                </Card.Body>
            </Link>
            {/* <Button variant="primary" onClick={(e) => handleAddToCart(e, product)}>
                Add to Cart
            </Button> */}
            {/* if this product in cart button text is "Added" and variant is success */}
            {/* if this product not in cart button text is "Add to Cart" and variant is primary */}
            {cart.find(_product => _product.id === product.id) ? (
                <Button variant="success" onClick={(e) => handleAddToCart(e, product)}>Added</Button>
            ) : (
                <Button variant="primary" onClick={(e) => handleAddToCart(e, product)}>
                    Add to Cart
                </Button>
            )}
        </Card>
    );

    return (
        <Container style={{ paddingTop: '56px' }}>
            <h1>Menu</h1>

            <h2>Main Dish</h2>
            <Row xs={1} md={4}>
                {mainDishes.map(renderProductCard)}
            </Row>

            <h2>Beverages</h2>
            <CardGroup>
                {beverages.map(renderProductCard)}
            </CardGroup>
        </Container>
    );
}

export default Menu;
