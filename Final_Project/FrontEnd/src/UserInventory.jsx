import React, { useEffect, useState } from 'react';

function UserInventory() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8081/inventory')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1>Inventory</h1>
      <table>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.productid}>
              <td>{product.productid}</td>
              <td>{product.productname}</td>
              <td>{product.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserInventory;
