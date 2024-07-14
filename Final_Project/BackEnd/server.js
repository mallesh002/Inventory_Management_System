const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '#Love_420',
  database: 'inventory_db'
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database.');

  const roles = ['Admin', 'Owner', 'Manager', 'Staff', 'customer'];
  roles.forEach(role => {
    const query = `INSERT INTO roles (rolename) VALUES (?) ON DUPLICATE KEY UPDATE rolename=rolename`;
    db.query(query, [role], (err, results) => {
      if (err) {
        console.error(`Error inserting role ${role}:`, err);
        return;
      }
      console.log(`Role ${role} inserted/updated.`);
    });
  });

  const adminPassword = 'admin@123';
  bcrypt.hash(adminPassword, saltRounds, (err, hash) => {
    if (err) throw err;

    const adminQuery = `INSERT INTO users (username, password, roleid) VALUES ('admin', ?, (SELECT roleid FROM roles WHERE rolename = 'Admin')) ON DUPLICATE KEY UPDATE password=VALUES(password)`;
    db.query(adminQuery, [hash], (err, results) => {
      if (err) {
        console.error('Error inserting admin:', err);
        return;
      }
      console.log('Admin user inserted/updated.');
    });
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) {
      return res.status(500).send('Server error');
    }

    if (results.length === 0) {
      return res.status(400).send('User not found');
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).send('Server error');
      }

      if (!isMatch) {
        return res.status(400).send('Invalid password');
      }

      const roleQuery = 'SELECT rolename FROM roles WHERE roleid = ?';
      db.query(roleQuery, [user.roleid], (err, roleResults) => {
        if (err) {
          return res.status(500).send('Server error');
        }

        const roleName = roleResults[0].rolename;
        return res.status(200).json({ userID: user.userid, role: roleName });
      });
    });
  });
});

app.post('/add-product', (req, res) => {
  const { productName, categoryId, price, quantity } = req.body;
  console.log("Received product data:", req.body);

  const sql = 'INSERT INTO products (productname, categoryid, price, quantity) VALUES (?, ?, ?, ?)';
  db.query(sql, [productName, categoryId, price, quantity], (err, result) => {
    if (err) {
      console.error('Error adding product:', err);
      return res.status(500).json({ success: false, error: 'Error adding product' });
    }

    console.log('Product added successfully:', result);
    return res.status(200).json({ success: true });
  });
});

app.post('/remove-product', (req, res) => {
  const { productId } = req.body;
  console.log("Received product ID to remove:", productId);

  const checkSql = 'SELECT * FROM products WHERE productid = ?';
  db.query(checkSql, [productId], (err, result) => {
    if (err) {
      console.error('Error checking product:', err);
      return res.status(500).json({ success: false, error: 'Error checking product' });
    }

    if (result.length === 0) {
      console.log('No such item found in the inventory');
      return res.status(200).json({ success: false, message: 'No such item found in the inventory' });
    }

    const deleteSql = 'DELETE FROM products WHERE productid = ?';
    db.query(deleteSql, [productId], (err, result) => {
      if (err) {
        console.error('Error removing product:', err);
        return res.status(500).json({ success: false, error: 'Error removing product' });
      }

      console.log('Product removed successfully:', result);
      return res.status(200).json({ success: true, message: 'Item Deleted Successfully' });
    });
  });
});


app.post('/check-product', (req, res) => {
  const { productId } = req.body;
  console.log("Checking product ID:", productId);

  const sql = 'SELECT * FROM products WHERE productid = ?';
  db.query(sql, [productId], (err, result) => {
    if (err) {
      console.error('Error checking product:', err);
      return res.status(500).json({ success: false, error: 'Error checking product' });
    }

    if (result.length === 0) {
      return res.status(200).json({ success: false, message: 'No such item found' });
    }

    console.log('Product found:', result[0]);
    return res.status(200).json({ success: true, product: result[0] });
  });
});

app.post('/update-product', (req, res) => {
  const { productId, quantity, price } = req.body;
  console.log("Received updated product data:", { productId, quantity, price });

  const sql = 'UPDATE products SET quantity = ?, price = ? WHERE productid = ?';
  db.query(sql, [quantity, price, productId], (err, result) => {
    if (err) {
      console.error('Error updating product:', err);
      return res.status(500).json({ success: false, error: 'Error updating product' });
    }

    console.log('Product updated successfully:', result);
    return res.status(200).json({ success: true });
  });
});

app.post('/add-user', (req, res) => {
  const { username, password, email, roleid } = req.body;
  console.log("Received user data:", req.body);

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.error('Error hashing password:', err);
      return res.status(500).json({ success: false, error: 'Error hashing password' });
    }

    const sql = 'INSERT INTO users (username, password, email, roleid) VALUES (?, ?, ?, ?)';
    db.query(sql, [username, hash, email, roleid], (err, result) => {
      if (err) {
        console.error('Error adding user:', err);
        return res.status(500).json({ success: false, error: 'Error adding user' });
      }

      console.log('User added successfully:', result);
      return res.status(200).json({ success: true });
    });
  });
});

app.get('/roles', (req, res) => {
  const sql = 'SELECT * FROM roles';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching roles:', err);
      return res.status(500).json({ success: false, error: 'Error fetching roles' });
    }
    return res.status(200).json(results);
  });
});


app.get('/user-profile/:userId', (req, res) => {
  const userId = req.params.userId;
  const sql = 'SELECT username, email FROM users WHERE userid = ?';
  db.query(sql, [userId], (err, results) => {
    if (err) {
      return res.status(500).send('Server error');
    }
    if (results.length === 0) {
      return res.status(404).send('User not found');
    }
    return res.status(200).json(results[0]);
  });
});

app.post('/buy-product', (req, res) => {
  const { userId, productId, quantity } = req.body;
  const checkProductSql = 'SELECT * FROM products WHERE productid = ?';
  db.query(checkProductSql, [productId], (err, results) => {
    if (err) {
      return res.status(500).send('Server error');
    }
    if (results.length === 0) {
      return res.status(404).send('No such item found in the inventory');
    }

    const product = results[0];
    if (product.quantity < quantity) {
      return res.status(400).send('Insufficient quantity');
    }

    const totalPrice = product.price * quantity;
    const updateProductSql = 'UPDATE products SET quantity = quantity - ? WHERE productid = ?';
    db.query(updateProductSql, [quantity, productId], (err, result) => {
      if (err) {
        return res.status(500).send('Server error');
      }
      return res.status(200).json({ success: true, totalPrice });
    });
  });
});


app.post('/register', (req, res) => {
  const { username, password, email } = req.body;
  console.log("Received registration data:", req.body);

  const roleid = 5; // Default role ID for customer

  // Check if the username already exists
  const checkUserSql = 'SELECT * FROM users WHERE username = ?';
  db.query(checkUserSql, [username], (err, results) => {
    if (err) {
      console.error('Error checking username:', err);
      return res.status(500).json({ success: false, error: 'Error checking username' });
    }

    if (results.length > 0) {
      return res.status(400).json({ success: false, error: 'Username already exists' });
    }

    // Hash the password and insert the new user
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        console.error('Error hashing password:', err);
        return res.status(500).json({ success: false, error: 'Error hashing password' });
      }

      const sql = 'INSERT INTO users (username, password, email, roleid) VALUES (?, ?, ?, ?)';
      db.query(sql, [username, hash, email, roleid], (err, result) => {
        if (err) {
          console.error('Error adding user:', err);
          return res.status(500).json({ success: false, error: 'Error adding user' });
        }

        console.log('User added successfully:', result);
        return res.status(200).json({ success: true });
      });
    });
  });
});


// Endpoint to fetch all table names
app.get('/tables', (req, res) => {
  const sql = `SHOW TABLES`;
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching table names:', err);
      return res.status(500).json({ success: false, error: 'Error fetching table names' });
    }
    const tables = results.map(row => Object.values(row)[0]);
    return res.status(200).json({ success: true, tables });
  });
});

// Endpoint to fetch data from a specific table
app.get('/table-data/:tableName', (req, res) => {
  const tableName = req.params.tableName;
  const sql = `SELECT * FROM ??`;
  db.query(sql, [tableName], (err, results) => {
    if (err) {
      console.error(`No Such Table Exsits or ${tableName} Table May Be Deleted:`, err);
      return res.status(500).json({ success: false, error: `No Such Table Exsits or ${tableName} Exists No Longer(May Be Deleted..)` });
    }
    return res.status(200).json({ success: true, data: results });
  });
});

// Endpoint to remove a user by username or userID
app.post('/remove-user', (req, res) => {
  const { identifier } = req.body; // identifier can be either username or userID

  // Check if the identifier is a number (userID) or a string (username)
  const isUserId = !isNaN(identifier);
  const sql = isUserId
    ? 'DELETE FROM users WHERE userid = ?'
    : 'DELETE FROM users WHERE username = ?';

  db.query(sql, [identifier], (err, result) => {
    if (err) {
      console.error('Error removing user:', err);
      return res.status(500).json({ success: false, error: 'Error removing user' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    console.log('User removed successfully:', result);
    return res.status(200).json({ success: true, message: 'User removed successfully' });
  });
});


// Endpoint to fetch user profile
app.get('/user-profile/:userId', (req, res) => {
  const userId = req.params.userId;
  const sql = 'SELECT username, email FROM users WHERE userid = ?';
  db.query(sql, [userId], (err, results) => {
    if (err) {
      return res.status(500).send('Server error');
    }
    if (results.length === 0) {
      return res.status(404).send('User not found');
    }
    return res.status(200).json(results[0]);
  });
});


// Endpoint to add a new category
app.post('/add-category', (req, res) => {
  const { categoryname } = req.body;
  const sql = 'INSERT INTO categories (categoryname) VALUES (?)';
  db.query(sql, [categoryname], (err, result) => {
    if (err) {
      console.error('Error adding category:', err);
      return res.status(500).json({ success: false, error: 'Error adding category' });
    }
    return res.status(200).json({ success: true, message: 'Category added successfully' });
  });
});

// Endpoint to remove a category
app.post('/remove-category', (req, res) => {
  const { categoryid } = req.body;
  const sql = 'DELETE FROM categories WHERE categoryid = ?';
  db.query(sql, [categoryid], (err, result) => {
    if (err) {
      console.error('Error removing category:', err);
      return res.status(500).json({ success: false, error: 'Error removing category' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    return res.status(200).json({ success: true, message: 'Category removed successfully' });
  });
});



// Endpoint to search inventory items
app.get('/search-inventory', (req, res) => {
  const { query } = req.query;
  const sql = `SELECT productid, productname, quantity, price FROM products WHERE productname LIKE ? OR productid = ?`;
  db.query(sql, [`%${query}%`, query], (err, data) => {
    if (err) {
      console.error('Error searching inventory:', err);
      return res.status(500).json(err);
    }
    return res.status(200).json(data);
  });
});


// Endpoint to fetch customers and their purchases
app.get('/purchases', (req, res) => {
  const sql = `
    SELECT
      orders.orderid,
      orders.customerid,
      customers.customername,
      products.productid,
      products.productname,
      orderdetails.quantity
    FROM orders
    JOIN orderdetails ON orders.orderid = orderdetails.orderid
    JOIN customers ON orders.customerid = customers.customerid
    JOIN products ON orderdetails.productid = products.productid
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching purchases:', err);
      return res.status(500).json({ success: false, error: 'Error fetching purchases' });
    }
    return res.status(200).json({ success: true, data: results });
  });
});

app.get('/inventory', (req, res) => {
  const sql = 'SELECT productid, productname, price, quantity FROM products';
  db.query(sql, (err, data) => {
    if (err) {
      console.error('Error fetching inventory:', err);
      return res.status(500).json({ success: false, error: 'Error fetching inventory' });
    }
    return res.status(200).json(data);
  });
});

// Add this to your existing server.js file
app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).json({ success: false, error: 'Error fetching users' });
    }
    return res.status(200).json({ success: true, data: results });
  });
});




app.listen(8081, () => {
  console.log('Server is running on port 8081...');
})
 
