const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;


app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootpassword',
    database: 'realestate_db'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
        return;
    }
    console.log('Connected to MySQL database.');
});

// API Routes
app.post('/api/auth/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(sql, [username, hashedPassword], (err, result) => {
        if (err) return res.status(500).send(err.message);
        res.send('User registered successfully!');
    });
});

app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], async (err, results) => {
        if (err) return res.status(500).send(err.message);
        if (results.length === 0) return res.status(400).send('Invalid credentials');
        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send('Invalid credentials');
        const token = jwt.sign({ id: user.id }, 'secretkey');
        res.json({ token });
    });
});

app.get('/api/properties', (req, res) => {
    const sql = 'SELECT * FROM properties';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err.message);
        res.json(results);
    });
});

app.listen(PORT, () => {
    console.log(`Backend is running at http://localhost:${PORT}`);
});
