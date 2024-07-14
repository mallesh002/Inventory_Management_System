use inventory_db;

-- Drop existing tables if they exist
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS suppliers;
DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS inventory;
DROP TABLE IF EXISTS orderdetails;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS purchases;

SHOW Tables;

-- Create Customers table
CREATE TABLE customers (
    customerid INT AUTO_INCREMENT PRIMARY KEY,
    customername VARCHAR(255) NOT NULL,
    contactname VARCHAR(255),
    contactnumber VARCHAR(20)
);

-- Create Categories table
CREATE TABLE categories (
    categoryid INT AUTO_INCREMENT PRIMARY KEY,
    categoryname VARCHAR(255) NOT NULL UNIQUE,
    INDEX (categoryname)
);

-- Create Products table
CREATE TABLE products (
    productid INT AUTO_INCREMENT PRIMARY KEY,
    productname VARCHAR(255) NOT NULL UNIQUE,
    categoryid INT,
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    quantity INT NOT NULL CHECK (quantity >= 0),
    FOREIGN KEY (categoryid) REFERENCES categories(categoryid),
    INDEX (productname)
);

-- Create Orders table
CREATE TABLE orders (
    orderid INT AUTO_INCREMENT PRIMARY KEY,
    customerid INT NOT NULL,
    orderdate DATE NOT NULL,
    FOREIGN KEY (customerid) REFERENCES customers(customerid)
);

-- Create OrderDetails table
CREATE TABLE orderdetails (
    orderdetailid INT AUTO_INCREMENT PRIMARY KEY,
    orderid INT NOT NULL,
    productid INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity >= 0),
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    FOREIGN KEY (orderid) REFERENCES orders(orderid),
    FOREIGN KEY (productid) REFERENCES products(productid)
);

-- Create Inventory table
CREATE TABLE inventory (
    inventoryid INT AUTO_INCREMENT PRIMARY KEY,
    productid INT,
    quantity INT NOT NULL CHECK (quantity >= 0),
    FOREIGN KEY (productid) REFERENCES products(productid)
);

-- Create Transactions table
CREATE TABLE transactions (
    transactionid INT AUTO_INCREMENT PRIMARY KEY,
    productid INT,
    transactiondate DATE NOT NULL,
    transactiontype VARCHAR(50),
    quantity INT NOT NULL CHECK (quantity >= 0),
    FOREIGN KEY (productid) REFERENCES products(productid)
);

-- Create Suppliers table
CREATE TABLE suppliers (
    supplierid INT AUTO_INCREMENT PRIMARY KEY,
    suppliername VARCHAR(255) NOT NULL,
    contactname VARCHAR(255),
    contactnumber VARCHAR(20)
);

-- Create Roles table
CREATE TABLE roles (
    roleid INT AUTO_INCREMENT PRIMARY KEY,
    rolename VARCHAR(50) NOT NULL UNIQUE
);

-- Create Users table
CREATE TABLE users (
    userid INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    roleid INT,
    FOREIGN KEY (roleid) REFERENCES roles(roleid),
    INDEX (username)
);

-- trying to add new table
CREATE TABLE IF NOT EXISTS purchases (
    purchase_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    product_id INT,
    quantity INT,
    total_price DECIMAL(10, 2),
    purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(userid),
    FOREIGN KEY (product_id) REFERENCES products(productid)
);

SHOW Tables;

-- Insert at least 10 categories
INSERT INTO categories (categoryname) VALUES ('Electronics');
INSERT INTO categories (categoryname) VALUES ('Books');
INSERT INTO categories (categoryname) VALUES ('Clothing');
INSERT INTO categories (categoryname) VALUES ('Furniture');
INSERT INTO categories (categoryname) VALUES ('Toys');
INSERT INTO categories (categoryname) VALUES ('Groceries');
INSERT INTO categories (categoryname) VALUES ('Beauty & Personal Care');
INSERT INTO categories (categoryname) VALUES ('Sports');
INSERT INTO categories (categoryname) VALUES ('Automotive');
INSERT INTO categories (categoryname) VALUES ('Home Appliances');


-- Insert sample data into the Products table
INSERT INTO products (productname, categoryid, price, quantity) VALUES ('Smartphone', 1, 299.99, 50);
INSERT INTO products (productname, categoryid, price, quantity) VALUES ('Laptop', 1, 899.99, 30);
INSERT INTO products (productname, categoryid, price, quantity) VALUES ('Book - "Learn SQL"', 2, 19.99, 100);
INSERT INTO products (productname, categoryid, price, quantity) VALUES ('Jeans', 3, 49.99, 75);
INSERT INTO products (productname, categoryid, price, quantity) VALUES ('Dining Table', 4, 299.99, 10);
INSERT INTO products (productname, categoryid, price, quantity) VALUES ('Action Figure', 5, 14.99, 200);
INSERT INTO products (productname, categoryid, price, quantity) VALUES ('Organic Apples', 6, 3.99, 150);
INSERT INTO products (productname, categoryid, price, quantity) VALUES ('Shampoo', 7, 5.99, 100);
INSERT INTO products (productname, categoryid, price, quantity) VALUES ('Basketball', 8, 25.99, 60);
INSERT INTO products (productname, categoryid, price, quantity) VALUES ('Car Tire', 9, 79.99, 40);
INSERT INTO products (productname, categoryid, price, quantity) VALUES ('Microwave Oven', 10, 89.99, 20);



SHOW Tables;
SELECT * From products;
SELECT * From users;
SELECT * From roles;
SELECT * From categories;
SELECT * From inventory;
SELECT * From orders;


