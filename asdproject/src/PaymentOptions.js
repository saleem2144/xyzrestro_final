// PaymentOptions.js

import React from 'react';

function PaymentOptions() {
  return (
    <div className="PaymentOptions">
      <h2>Payment Options</h2>
      <p>Select your preferred payment method:</p>
      <ul>
        <li><button>Credit Card</button></li>
        <li><button>PayPal</button></li>
        <li><button>Bank Transfer</button></li>
      </ul>
      <button onClick={() => window.history.back()}>Back to Main Page</button>
    </div>
  );
}

export default PaymentOptions;