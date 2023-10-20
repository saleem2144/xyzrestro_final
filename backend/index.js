const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 3000;

// Set up CORS
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

// Set up SQLite database
// const db = new sqlite3.Database(':memory:');
const db = new sqlite3.Database('database.db');

const schema = `
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY,
        name TEXT,
        category TEXT,
        price REAL,
        description TEXT,
        image BLOB
    );
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        email TEXT,
        password TEXT,
        name TEXT,
        address TEXT,
        role TEXT
    );
    CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY,
        userId INTEGER,
        productId INTEGER,
        quantity INTEGER,
        FOREIGN KEY (userId) REFERENCES users (id),
        FOREIGN KEY (productId) REFERENCES products (id)
    );
`;

db.serialize(() => {
    // execute schema and check for errors
    db.exec(schema, (err) => {
        if (err) {
            console.error(err);
        }
    });
});

// if admin user does not exist, create one
db.get("SELECT * FROM users WHERE email = 'admin@admin'", (err, row) => {
    if (err) throw err;
    if (!row) {
        db.run("INSERT INTO users (email, password, name, address, role) VALUES (?, ?, ?, ?, ?)", ['admin@admin', 'admin', 'admin', 'admin', 'admin'], (err) => {
            if (err) throw err;
        });
    }
});


// Display products
app.get('/products', (req, res) => {
    db.all("SELECT * FROM products", [], (err, rows) => {
        if (err) throw err;
        res.json(rows);
    });
});

// Get a product
app.get('/products/:id', (req, res) => {
    const id = req.params.id;

    db.get("SELECT * FROM products WHERE id = ?", [id], (err, row) => {
        if (err) throw err;
        res.json(row);
    });
});

// Add a product
app.post('/products', (req, res) => {
    const { name, category, price, description, image } = req.body;

    db.run("INSERT INTO products (name, category, price, description, image) VALUES (?, ?, ?, ?, ?)", [name, category, price, description, image], (err) => {
        if (err) throw err;
        res.json({ message: 'Product added successfully!' });
    });
});

// Delete a product
app.delete('/products/:id', (req, res) => {
    const id = req.params.id;

    db.run("DELETE FROM products WHERE id = ?", [id], (err) => {
        if (err) throw err;
        res.send({ message: 'Product deleted successfully!' });
    });
});

// Display users
app.get('/users', (req, res) => {
    db.all("SELECT id, email, name, address, role FROM users", [], (err, rows) => {
        if (err) throw err;
        res.json(rows);
    });
});

// Add a user
app.post('/users', (req, res) => {
    const { email, password, name, address, role } = req.body;

    db.run("INSERT INTO users (email, password, name, address, role) VALUES (?, ?, ?, ?, ?)", [email, password, name, address, role], (err) => {
        if (err) throw err;
        res.json({ message: 'User added successfully!' });
    });
});

// Delete a user
app.delete('/users/:id', (req, res) => {
    const id = req.params.id;

    db.run("DELETE FROM users WHERE id = ?", [id], (err) => {
        if (err) throw err;
        res.send({ message: 'User deleted successfully!' });
    });
});

// login and register routes
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // send json message if user exists otherwise send json message that user does not exist
    db.get("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], (err, row) => {
        if (err) throw err;
        if (row) {
            // hide password from response
            delete row.password;
            res.json(row);
        } else {
            res.json({ message: 'User does not exist!', code: 400 });
        }
    });
});

app.post('/register', (req, res) => {
    const { email, password, name, address, role } = req.body;

    // check first if user exists before adding user
    db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
        if (err) throw err;
        if (row) {
            res.json({ message: 'User already exists!', code: 400 });
        } else {
            db.run("INSERT INTO users (email, password, name, address, role) VALUES (?, ?, ?, ?, ?)", [email, password, name, address, role], (err) => {
                if (err) throw err;
                res.json({ message: 'User added successfully!', code: 200 });
            });
        }
    });
});

// Display orders
app.get('/orders', (req, res) => {
    db.all("SELECT orders.id, users.name AS customer, products.name, orders.quantity, products.price FROM orders INNER JOIN users ON orders.userId = users.id INNER JOIN products ON orders.productId = products.id", [], (err, rows) => {
        if (err) throw err;

        // create an array of customers
        const customers = [];

        // loop through each row
        rows.forEach((row) => {
            // check if customer exists in customers array
            const customerIndex = customers.findIndex((customer) => customer.name === row.customer);

            // if customer exists, add product to customer's products array
            if (customerIndex !== -1) {
                customers[customerIndex].products.push({
                    name: row.name,
                    quantity: row.quantity,
                    price: row.price
                });
            } else {
                // if customer does not exist, add customer to customers array
                customers.push({
                    id: row.id,
                    name: row.customer,
                    products: [
                        {
                            name: row.name,
                            quantity: row.quantity,
                            price: row.price
                        }
                    ]
                });
            }
        });

        res.json(customers);
    });
});

// Add an order
app.post('/orders', (req, res) => {

    // body have array of [{ userId, productId, quantity }]
    const orders = req.body;

    // batch insert orders
    const stmt = db.prepare("INSERT INTO orders (userId, productId, quantity) VALUES (?, ?, ?)");
    orders.forEach((order) => {
        stmt.run(order.userId, order.productId, order.quantity);
    });
    stmt.finalize(err => {
        if (err) throw err;

        res.json({ message: 'Order added successfully!' });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
