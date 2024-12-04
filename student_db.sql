-- Create the database
CREATE DATABASE student_db;

-- Use the created database
USE student_db;

-- Create the students table
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    rollNo VARCHAR(50) NOT NULL,
    marks1 INT NOT NULL,
    marks2 INT NOT NULL,
    marks3 INT NOT NULL,
    marks4 INT NOT NULL,
    percentage FLOAT NOT NULL
);
