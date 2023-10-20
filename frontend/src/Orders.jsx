import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';

function Orders() {
  // Sample data for list of orders
  const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL + '/orders')
            .then((response) => response.json())
            .then((data) => {
                setOrders(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            }
        );
    }, []);
  

  const calculateTotal = (products) => {
    return products.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2);
  };

  return (
    <Container>
      <h1>Orders</h1>
      <div className="d-flex justify-content-end mb-2">
        {/* <Button variant="primary" onClick={handleAddOrder}>
          Add Order
        </Button> */}
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Products</th>
            <th>Total ($)</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.name}</td>
              <td>
                <ul>
                  {order.products.map((product, index) => (
                    <li key={index}>
                      {product.name} - {product.quantity} x ${product.price}
                    </li>
                  ))}
                </ul>
              </td>
              <td>{calculateTotal(order.products)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Orders;
