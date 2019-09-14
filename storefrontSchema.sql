DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products (
id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(30) NULL,
department_name VARCHAR(30) NULL,
price DECIMAL(10,2) NULL,
stock_quantity INTEGER(5)NULL,
product_sales DECIMAL(10,2) NULL,
PRIMARY KEY (id) 
);
CREATE TABLE departments(
department_id INT NOT NULL AUTO_INCREMENT,
department_name VARCHAR(30) NULL,
over_head_costs DECIMAL(10,2) NULL,
PRIMARY KEY (department_id)
);
INSERT INTO products 
(id, product_name, department_name, price, stock_quantity, product_sales)
VALUES 
 (id, 'T-Shirt', 'Clothing', 20.00, 12, 0),
 (id, 'Shovel', 'Home & Garden', 25.00, 6, 0),
 (id, 'Footrest', 'Home & Garden', 45.00, 15, 0),
 (id, 'Laptop', 'Technology', 800.00, 20, 0),
 (id, 'Television', 'Technology', 900.00, 10, 0),
 (id, 'Ribeye steak', 'Food', 25.00, 45, 0),
 (id, 'Bread', 'Food', 5.00, 30, 0),
 (id, 'Headphones', 'Technology', 50.00, 20, 0),
 (id, 'Rug', 'Home & Garden', 80.00, 5, 0),
 (id, 'Hat', 'Clothing', 50.00, 50, 0);
INSERT INTO departments (department_name, over_head_costs)
VALUES 
 ('Clothing', 200.00),
 ('Home & Garden', 100.00),
 ('Food', 50.00),
 ('Technology', 400.00);