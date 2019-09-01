DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products (
id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(30) NULL,
department_name VARCHAR(30) NULL,
price DECIMAL(5, 2) NULL,
stock_quantity INTEGER(5)NULL,
product_sales DECIMAL(5,2) NULL,
PRIMARY KEY (id)
);
CREATE TABLE departments(
department_id INTEGER(20) NULL,
department_name VARCHAR(30) NULL,
over_head_costs integer(20) NULL
);
INSERT INTO products (id, product_name, department_name, price, stock_quantity, product_sales)
VALUES (id, 'T-Shirt', 'Clothing', 20.00, 12, product_sales);
INSERT INTO products (id, product_name, department_name, price, stock_quantity, product_sales)
VALUES (id, 'Shovel', 'Home & Garden', 25.00, 6, product_sales);
INSERT INTO products (id, product_name, department_name, price, stock_quantity, product_sales)
VALUES (id, 'Footrest', 'Home & Garden', 45.00, 15, product_sales);
INSERT INTO products (id, product_name, department_name, price, stock_quantity, product_sales)
VALUES (id, 'Laptop', 'Technology', 800.00, 20, product_sales);
INSERT INTO products (id, product_name, department_name, price, stock_quantity, product_sales)
VALUES (id, 'Television', 'Technology', 900.00, 10, product_sales);
INSERT INTO products (id, product_name, department_name, price, stock_quantity, product_sales)
VALUES (id, 'Ribeye steak', 'Food', 25.00, 45, product_sales);
INSERT INTO products (id, product_name, department_name, price, stock_quantity, product_sales)
VALUES (id, 'Bread', 'Food', 5.00, 30, product_sales);
INSERT INTO products (id, product_name, department_name, price, stock_quantity, product_sales)
VALUES (id, 'Headphones', 'Technology', 50.00, 20, product_sales);
INSERT INTO products (id, product_name, department_name, price, stock_quantity, product_sales)
VALUES (id, 'Rug', 'Home & Garden', 80.00, 5, product_sales);
INSERT INTO products (id, product_name, department_name, price, stock_quantity, product_sales)
VALUES (id, 'Hat', 'Clothing', 15.00, 50, product_sales);