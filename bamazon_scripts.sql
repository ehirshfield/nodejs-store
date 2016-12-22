#Create the db
CREATE DATABASE Bamazon;

#Use this db
use Bamazon;

#Create the table products
CREATE TABLE products (
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price INTEGER(11) NOT NULL,
    stock_quantity INTEGER(11) NOT NULL,
    PRIMARY KEY (item_id)
    
);

#Insert the rows of values
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Coffee","Food & Beverage","12.00","10"),
		("Tea","Food & Beverage","8.00","25"),
        ("Cereal","Food & Beverage","4.50","5"),
        ("Donut","Food & Beverage","1.99","24"),
        ("Headphones","Electronics","80.00","3"),
        ("Tote Bag","Luggage & Travel Gear","15.00","2"),
        ("Sweatshirt","Apparel","30.00","8"),
        ("Hiking Boots","Apparrel","65.45","3"),
        ("Sofa","Furniture","350.00","1"),
        ("Lawn Chair","Furniture","20.00","4"),
        ("Laptop","Electronics","2000.00","13");

#Fix price column to be decimal and not integer
ALTER TABLE products MODIFY COLUMN price DECIMAL(11,2) NOT NULL;
#Fix prices to include the decimals
UPDATE products
SET price = "1.99"
WHERE item_id = "4";

#Check on table
Select * from products;
