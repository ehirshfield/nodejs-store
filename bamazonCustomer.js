var fs = require("fs");
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "Bamazon"
});

connection.connect(function(err) {
    if (err) {
        console.log("connection error");
        };
    currentInventory();
});

var currentInventory = function() {
    var query = "SELECT * FROM products";
    connection.query(query, function(err, res) {
        if (err) {
            console.log("error occurred");
        }
      for (var i = 0; i < res.length; i++) {
        console.log("Item ID: " + res[i].item_id + "\n    Product Name: " + res[i].product_name + "\n    Department: " + res[i].department_name
         + "\n    Price: " + res[i].price + "\n    Quantity in Stock: " + res[i].stock_quantity);
      }
     
    });
    initialMenu();
  };

var initialMenu = function() {
    inquirer.prompt([
    {
        type: "input",
        name: "id",
        message: "What is the item ID of the product you wish to purchase?"

    },
    {
        type: "input",
        name: "amount",
        message:"How many would you like?"
    }

    ]).then(function(answer) {
        var quantitySearch = "SELECT stock_quantity FROM products WHERE ?";
        connection.query(quantitySearch,{item_id: answer.id}, function(err, response){
            if (err) {
                console.log("quantitySearch error!");
            }
            console.log(response);
        });
    });
}