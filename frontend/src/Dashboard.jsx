import React, { useState,useContext } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { Container, Row, Col, Nav, Navbar } from 'react-bootstrap'
import { UserContext } from './UserContext';

const Dashboard = () => {
    const [activeLink, setActiveLink] = useState('Orders')
    const { user } = useContext(UserContext);
    return (
        <>
            <Container fluid style={{ paddingTop: '56px' }}>
                <Row>
                    <Col sm={2} className="bg-light" style={{ height: '100vh', overflowY: 'auto', position: 'fixed' }}>
                        <Nav className="flex-column">
                            <Nav.Link as={Link} to="/dashboard" active={activeLink === 'Orders'} onClick={() => setActiveLink('Orders')} className="sidebar-link">Orders</Nav.Link>
                            <Nav.Link as={Link} to="/dashboard/customers" active={activeLink === 'Customers'} onClick={() => setActiveLink('Customers')} className="sidebar-link">Customers</Nav.Link>
                            {user.role === 'admin' ? (
                                <Nav.Link as={Link} to="/dashboard/staffs" active={activeLink === 'Staffs'} onClick={() => setActiveLink('Staffs')} className="sidebar-link">Staffs</Nav.Link>
                            ) : null}
                            <Nav.Link as={Link} to="/dashboard/products" active={activeLink === 'Products'} onClick={() => setActiveLink('Products')} className="sidebar-link">Products</Nav.Link>
                        </Nav>
                    </Col>
                    <Col sm={{ span: 10, offset: 2 }} style={{ overflowY: 'auto', height: '100vh' }}>
                        <div className="main-content">
                            <Outlet />
                        </div>
                    </Col>
                </Row>
            </Container>

            <style type="text/css">
                {`
      .sidebar-link:hover {
        background-color: #f8f9fa;
      }
    `}
            </style>
        </>
    )
}

export default Dashboard