import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Admin from './Admin';

function App() {
  const [isAdminView, setAdminView] = useState(false);

  if (isAdminView) {
    return <Admin />;
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Welcome to Sopranos</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        
        </a>
        <button onClick={() => setAdminView(true)}>Go to Admin Dashboard</button>
      </header>
    </div>
  );
}

export default App;
