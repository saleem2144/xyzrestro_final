// OrderPage.js

import React, { useState } from 'react';

function OrderPage() {
  const [order, setOrder] = useState([]);

  const addItem = (item) => {
    setOrder([...order, item]);
  };

  return (
    <div className="Order">
      <h2>Order Page</h2>
      <div>
        <h3>Menu:</h3>
        <button onClick={() => addItem("Pizza")}>Add Pizza</button>
        <button onClick={() => addItem("Pasta")}>Add Pasta</button>
        <button onClick={() => addItem("Salad")}>Add Salad</button>
      </div>
      <div>
        <h3>Your Order:</h3>
        <ul>
          {order.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default OrderPage;
