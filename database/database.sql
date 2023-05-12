CREATE DATABASE firstapp;
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    surname VARCHAR(40),
    lastname VARCHAR(40),
    email TEXT
);

INSERT INTO employees (name, surname, lastname, email)
    VALUES ('Pablo Samuel','Flores','Santana', 'pablo@gmail.com'),
    ('Pedro','Torres','Montes', 'pedro@gmail.com');

SELECT * FROM employees;