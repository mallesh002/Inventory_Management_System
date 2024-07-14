import React, { useEffect, useState } from 'react';
import './Purchases.css';

function Purchases() {
  const [purchases, setPurchases] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:8081/purchases')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setPurchases(data.data);
        } else {
          setErrorMessage(data.error);
        }
      })
      .catch(err => setErrorMessage('Error fetching purchases'));
  }, []);

  return (
    <div className="purchases-container">
      <h1>Customer Purchases</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {purchases.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer ID</th>
              <th>Customer Name</th>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map(purchase => (
              <tr key={purchase.orderid}>
                <td>{purchase.orderid}</td>
                <td>{purchase.customerid}</td>
                <td>{purchase.customername}</td>
                <td>{purchase.productid}</td>
                <td>{purchase.productname}</td>
                <td>{purchase.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Purchases;
