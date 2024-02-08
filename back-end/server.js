/**
 * Description: This is for the institution based search author table.
 *
 * @author Om prakash and saitharun
 * @lastModified 2023-11-20 LastModifiedDate
 */

const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const PORT = 3002;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "publication_service"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL server');
});

app.use(express.static('asset'));

// Import the router separately and pass the 'db' object
const router = require('./router');
app.use(router(db));

app.listen(PORT, () => {
    console.log("Successfully connected to port:", PORT)
});

module.exports = db;
