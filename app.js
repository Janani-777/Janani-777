const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(express.static('public'));  // Serve static files from 'public' folder
app.use(bodyParser.json());  // To parse JSON data from frontend

// MySQL Database setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',  // Replace with your MySQL password
    database: 'student_db'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL database', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Routes
app.get('/get-students', (req, res) => {
    db.query('SELECT * FROM students', (err, results) => {
        if (err) {
            return res.status(500).send('Error fetching data');
        }
        res.json(results);
    });
});

app.get('/get-student/:id', (req, res) => {
    const studentId = req.params.id;
    db.query('SELECT * FROM students WHERE id = ?', [studentId], (err, results) => {
        if (err) {
            return res.status(500).send('Error fetching data');
        }
        res.json(results[0]);  // Return the student with the given ID
    });
});

app.post('/add-student', (req, res) => {
    const { name, rollNo, marks1, marks2, marks3, marks4, percentage } = req.body;
    db.query('INSERT INTO students (name, rollNo, marks1, marks2, marks3, marks4, percentage) VALUES (?, ?, ?, ?, ?, ?, ?)', 
        [name, rollNo, marks1, marks2, marks3, marks4, percentage], 
        (err, results) => {
            if (err) {
                return res.status(500).send('Error adding student');
            }
            res.status(200).send('Student added successfully');
        });
});

app.put('/update-student', (req, res) => {
    const { id, name, rollNo, marks1, marks2, marks3, marks4, percentage } = req.body;
    db.query('UPDATE students SET name = ?, rollNo = ?, marks1 = ?, marks2 = ?, marks3 = ?, marks4 = ?, percentage = ? WHERE id = ?', 
        [name, rollNo, marks1, marks2, marks3, marks4, percentage, id], 
        (err, results) => {
            if (err) {
                return res.status(500).send('Error updating student');
            }
            res.status(200).send('Student updated successfully');
        });
});

app.delete('/delete-student/:id', (req, res) => {
    const studentId = req.params.id;
    db.query('DELETE FROM students WHERE id = ?', [studentId], (err, results) => {
        if (err) {
            return res.status(500).send('Error deleting student');
        }
        res.status(200).send('Student deleted successfully');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
