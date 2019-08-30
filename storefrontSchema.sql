DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE storefront (
id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(30) NULL,
department_name VARCHAR(30) NULL,
price DECIMAL(5, 2) NULL,
stock_quantity INTEGER(5)NULL,
PRIMARY KEY (id)
);
INSERT INTO storefront (id, product_name, department_name, price, stock_quantity)
VALUES (id, 'T-Shirt', 'Clothing', 20.00, 12);
INSERT INTO storefront (id, product_name, department_name, price, stock_quantity)
VALUES (id, 'Shovel', 'Home & Garden', 25.00, 6);
INSERT INTO storefront (id, product_name, department_name, price, stock_quantity)
VALUES (id, 'Footrest', 'Home & Garden', 45.00, 15);
INSERT INTO storefront (id, product_name, department_name, price, stock_quantity)
VALUES (id, 'Laptop', 'Technology', 800.00, 20);
INSERT INTO storefront (id, product_name, department_name, price, stock_quantity)
VALUES (id, 'Television', 'Technology', 900.00, 10);
INSERT INTO storefront (id, product_name, department_name, price, stock_quantity)
VALUES (id, 'Ribeye steak', 'Food', 25.00, 45);
INSERT INTO storefront (id, product_name, department_name, price, stock_quantity)
VALUES (id, 'Bread', 'Food', 5.00, 30);
INSERT INTO storefront (id, product_name, department_name, price, stock_quantity)
VALUES (id, 'Headphones', 'Technology', 50.00, 20);
INSERT INTO storefront (id, product_name, department_name, price, stock_quantity)
VALUES (id, 'Rug', 'Home & Garden', 80.00, 5);
INSERT INTO storefront (id, product_name, department_name, price, stock_quantity)
VALUES (id, 'Hat', 'Clothing', 15.00, 50);