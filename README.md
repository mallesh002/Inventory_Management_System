# React + Vite


# Inventory Management System

## Project Objective

The objective of this project is to develop an Inventory Management System that allows administrators and users to manage and interact with the inventory effectively. The system provides functionalities for adding, updating, and removing inventory items, viewing user profiles, managing user roles, and facilitating purchases. The system ensures that both admin and users have tailored interfaces and access to specific functionalities based on their roles.

## Functional Requirements

### Admin Functionalities
1. **Dashboard**: Overview of the inventory and user activities.
2. **Inventory Management**:
    - View all tables in the database.
    - Enter a table name to see data in the table.
    - Add new inventory items.
    - Update existing inventory items.
    - Remove inventory items.
3. **User Management**:
    - Add new users.
    - Remove users by entering username or user ID.
4. **Reports**: View and generate reports on inventory and user activities.
5. **Settings**: Configure system settings.
6. **Logout**: Securely logout from the admin interface.

### User Functionalities
1. **Login/Signup**:
    - Login using username and password.
    - Signup as a new user (default role: customer).
2. **User Dashboard**:
    - View profile information (username, email).
    - View inventory items.
    - Purchase items from the inventory.
3. **Inventory**:
    - View available items in the inventory.
4. **Purchase**:
    - Enter product ID and quantity to make a purchase.
    - Check for item availability and display total price.
    - Update inventory based on purchase.
5. **Logout**: Securely logout from the user interface.

## Outcomes of the Project

- A functional Inventory Management System with role-based access control.
- Efficient management of inventory items including addition, update, and removal.
- User registration and profile management capabilities.
- Seamless purchasing process for users.
- Enhanced admin control over user management and inventory monitoring.
- Responsive and user-friendly interfaces for both admin and users.

## Execution Steps

### Prerequisites

- Node.js and npm installed.
- MySQL database server installed and running.
- Programming IDE like VSCode,IntelliJ, Eclipse etc

### Database Setup

1. Create a database named `inventory_db` in MySQL.
2. Execute the following SQL script to create the necessary tables:

    ```sql
    -- Create Customers table
    CREATE TABLE customers (
        customerid INT AUTO_INCREMENT PRIMARY KEY,
        customername VARCHAR(255),
        contactname VARCHAR(255),
        contactnumber VARCHAR(20)
    );

    -- Create Categories table
    CREATE TABLE categories (
        categoryid INT AUTO_INCREMENT PRIMARY KEY,
        categoryname VARCHAR(255)
    );

    -- Create Products table
    CREATE TABLE products (
        productid INT AUTO_INCREMENT PRIMARY KEY,
        productname VARCHAR(255),
        categoryid INT,
        price DECIMAL(10,2),
        quantity INT,
        FOREIGN KEY (categoryid) REFERENCES categories(categoryid)
    );

    -- Create Roles table
    CREATE TABLE roles (
        roleid INT AUTO_INCREMENT PRIMARY KEY,
        rolename VARCHAR(50)
    );

    -- Create Users table
    CREATE TABLE users (
        userid INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50),
        password VARCHAR(255),
        email VARCHAR(255),
        roleid INT,
        FOREIGN KEY (roleid) REFERENCES roles(roleid)
    );

    -- Create TestCustomers table
    CREATE TABLE testcustomers (
        customer_id INT AUTO_INCREMENT PRIMARY KEY,
        customer_name VARCHAR(100),
        email VARCHAR(100)
    );

    -- Create TestOrders table
    CREATE TABLE testorders (
        order_id INT AUTO_INCREMENT PRIMARY KEY,
        order_date DATE,
        product_id INT,
        quantity INT,
        FOREIGN KEY (product_id) REFERENCES products(productid)
    );

    -- Create TestProducts table
    CREATE TABLE testproducts (
        product_id INT AUTO_INCREMENT PRIMARY KEY,
        product_name VARCHAR(100),
        quantity INT
    );

    -- Create TestOrders_Customers table
    CREATE TABLE testorders_customers (
        order_id INT,
        customer_id INT,
        PRIMARY KEY (order_id, customer_id),
        FOREIGN KEY (order_id) REFERENCES testorders(order_id),
        FOREIGN KEY (customer_id) REFERENCES testcustomers(customer_id)
    );
    ```

### Backend Setup

1. Navigate to the `BackEnd` directory.
2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the server:

    ```bash
    npm start
    ```

### Frontend Setup

1. Navigate to the `FrontEnd` directory.
2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm start
    ```

### Accessing the Application

- Open a web browser and navigate to `http://localhost:3000` to access the application.
- Use the login page to either login as an existing user or sign up as a new user.

### Admin Credentials

- **Username:** `admin`
- **Password:** `admin@123`

### Notes

- Ensure the backend server is running on `http://localhost:8081`.
- Adjust the database configuration in `server.js` if your MySQL setup differs.

## Contributors

- B Mallesh
- bavannagarimallesh@gmail.com
- https://github.com/mallesh002

## License

This project is licensed under Project Working in Serian Overseas Company(EduBot).
