import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Products() {
    // Sample data for list of products
    const [products, setProducts] = useState([]);

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

    const handleAddProduct = () => {
        // Logic to add a product
        console.log('Add Product button clicked');
    };

    const handleDeleteProduct = (id) => {
        console.log('Delete Product button clicked for id: ' + id);
        fetch(import.meta.env.VITE_API_URL + '/products/' + id, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                // remove the deleted product from the products state
                // alert
                alert('Product deleted successfully');
                const newProducts = products.filter((product) => product.id !== id);
                setProducts(newProducts);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <Container>
            <h1>Products</h1>
            <div className="d-flex justify-content-end mb-2">
                <Button as={Link} to="/dashboard/products/add" variant="primary" onClick={handleAddProduct}>
                    Add Product
                </Button>
            </div>
            {/* if products size is 0 display not products found other wise display table */}
            {products.length === 0 ? <p>No products found</p> : (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price ($)</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>
                                    <img src={product.image} width="100" alt={product.name} />
                                </td>
                                <td>
                                    {/* <Link to={`products/${product.id}`}>{product.name}</Link> */}
                                    {product.name}
                                </td>
                                <td>{product.category}</td>
                                <td>{product.price}</td>
                                <td>
                                    <Button variant="danger" onClick={() => handleDeleteProduct(product.id)}>
                                        Delete
                                    </Button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
}

export default Products;
