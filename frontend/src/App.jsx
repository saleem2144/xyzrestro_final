import { useState, useContext } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import { Container, Row, Col, Nav, Navbar, Button, Alert } from 'react-bootstrap'
import ProductAdd from './ProductAdd'
import StaffAdd from './StaffAdd'
import { Link, Routes, Route, useNavigate, Navigate, Outlet } from 'react-router-dom'
import Products from './Products'
import Staffs from './Staffs'
import Customers from './Customers'
import Orders from './Orders'
import Dashboard from './Dashboard'
import Menu from './Menu'
import ProductDetail from './ProductDetail'
import { CartProvider } from './CartContext'
import Cart from './Cart'
import Checkout from './Checkout'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import { UserContext } from './UserContext';
import { CartContext } from './CartContext'


function App() {
  const { user, logout } = useContext(UserContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/')
  }

  return (
    <div>
      <Navbar bg="dark" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand as={Link} to="/">XYZ Restro</Navbar.Brand>
          <Nav className="me-auto">
            {user.role === 'customer' ? (
              <>
                <Nav.Link as={Link} to="/menu">Menu</Nav.Link>
                <Nav.Link as={Link} to="/menu/cart">Cart ({cart.length})</Nav.Link>
              </>
            ) : null}
            {user.role === 'admin' || user.role === 'staff' ? (
              <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
            ) : null}
          </Nav>
          <Nav>
            {user.isAuthenticated ? (
              <Button variant="outline-light" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/dashboard" element={user.isAuthenticated && (user.role === 'admin' || user.role === 'staff') ? <Dashboard /> : <Container style={{marginTop:"100px"}}>
            <Alert variant="danger" className="my-5">You are not authorized to access this page. Only admin or staff can access it. <Link to="/login">Login</Link></Alert>
          </Container>}>
            <Route index element={<Orders />} />
            <Route path="customers" element={<Customers />} />

            <Route path="products" element={<Products />} />
            <Route path="products/add" element={<ProductAdd />} />

            <Route path="staffs" element={<Staffs />} />
            <Route path="staffs/add" element={<StaffAdd />} />
          </Route>
          
          <Route path="/menu" element={user.isAuthenticated && user.role === 'customer' ? <Outlet /> : <Navigate to="/login" />}>
            <Route index element={<Menu />} />
            <Route path=":product_id" element={<ProductDetail />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
          </Route>

          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
    </div>
  )
}

export default App
