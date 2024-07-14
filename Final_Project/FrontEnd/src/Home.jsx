import React, { useEffect, useState } from 'react';
import './Home.css';

function Home() {
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:8081/inventory')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const productsWithTotalValue = data.map(product => ({
            ...product,
            totalValue: product.price * product.quantity
          }));
          setProducts(productsWithTotalValue);
        } else {
          setErrorMessage('Error fetching inventory data');
        }
      })
      .catch(err => setErrorMessage('Error fetching inventory data'));
  }, []);

  return (
    <div className="home-container">
      <h1>Inventory Summary</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {products.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total Value</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.productid}>
                <td>{product.productid}</td>
                <td>{product.productname}</td>
                <td>{product.quantity}</td>
                <td>{product.price}</td>
                <td>{product.totalValue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Home;
