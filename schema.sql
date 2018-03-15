DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  primary key(item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Toms", "Shoes", 60.00, 10),
  ("Nikes", "Shoes", 75.00, 80),
  ("Vans", "Shoes", 22.35, 100),
  ("Etnies", "Shoes", 19.99, 55),
  ("Emerica", "Shoes", 43.50, 62),
  ("Adidas", "Shoes", 98.65, 31),
  ("Uggs", "Shoes", 25.45, 74),
  ("Doc Martens", "Shoes", 14.75, 47),
  ("Reebok", "Shoes", 25.50, 29),
  ("New Balance", "Shoes", 100.00, 69);
