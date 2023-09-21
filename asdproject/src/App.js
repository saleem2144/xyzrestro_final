// App.js

import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Admin from './Admin';
import PaymentOptions from './PaymentOptions';

function App() {
  const [view, setView] = useState('main'); // main, admin, payment

  if (view === 'admin') {
    return <Admin />;
  }

  if (view === 'payment') {
    return <PaymentOptions />;
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
      </header>
    </div>
  );
}

export default App;
