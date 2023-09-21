import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Admin from './Admin';
import PaymentOptions from './PaymentOptions';
import Order from './OrderPage';  // Import the Order component

function App() {
  const [view, setView] = useState('main'); // main, admin, payment, order

  if (view === 'admin') {
    return <Admin />;
  }

  if (view === 'payment') {
    return <PaymentOptions />;
  }

  if (view === 'order') {  // Add this condition to show the Order component
    return <Order />;
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Welcome to Sopranos</p>
        <a
          className="App-link"
          href="https://reactjs.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={() => setView('admin')}>Go to Admin Dashboard</button>
        <button onClick={() => setView('payment')}>Payment Options</button>
        <button onClick={() => setView('order')}>Order Now</button>  {/* Add this button */}
      </header>
    </div>
  );
}

export default App;