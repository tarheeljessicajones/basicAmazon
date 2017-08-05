CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE products(
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(45) NOT NULL,
  product_sales DECIMAL(10,2) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  primary key(item_id)
);

select * from products;

INSERT INTO products (product_name, product_sales, department_name, price, stock_quantity)
VALUES ("Beyonce- 4", 0, "Music", 10.99, 25),
  ("Tar Heel Beach Towel", 0, "Linen", 18.99, 50),
  ("THe Alchemist", 0, "Books", 14.99, 250),
  ("Their Eyes Were Watching God", 0, "Books", 10.00, 100),
  ("JayZ- 4:44", 0, "Music", 15.00, 3000),
  ("High Waisted Bell Bottoms", 0, "Clothing", 24.99, 35),
  ("Stud Cutoff Women's Top", 0, "Clothing", 7.50, 125),
  ("Red Bottoms", 0, "Shoes", 2500.00, 10),
  ("Chanel Slides", 0, "Shoes", 175.00, 30),
  ("Pink Washcloth Set", 0, "Linen", 12.99, 50);
