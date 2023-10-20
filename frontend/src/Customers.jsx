import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Customers() {
    // Sample data for list of customers
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetch(process.env.VITE_API_URL + '/users?role=customer')

            .then((response) => response.json())
            .then((data) => {
                // setCustomers(data);
                // set customers only role is customer
                const _customers = data.filter((customer) => customer.role === 'customer');
                setCustomers(_customers);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    const handleAddCustomer = () => {
        // Logic to add a customer
        console.log('Add Customer button clicked');
    };

    return (
        <Container>
            <h1>Customers</h1>
            <div className="d-flex justify-content-end mb-2">
                {/* <Button variant="primary" onClick={handleAddCustomer}>
          Add Customer
        </Button> */}
            </div>

            {/* if customers size is 0 display not customers found other wise display table */}
            {customers.length === 0 ? <p>No customers found</p> : (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer) => (
                            <tr key={customer.id}>
                                <td>{customer.id}</td>
                                <td>{customer.name}</td>
                                <td>{customer.email}</td>
                                <td>{customer.address}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
}

export default Customers;
