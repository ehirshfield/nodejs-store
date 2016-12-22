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
    setTimeout(initialMenu,500);
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
        var quantitySearch = "SELECT stock_quantity, price FROM products WHERE ?";
        connection.query(quantitySearch,{item_id: answer.id}, function(err, response){
            if (err) {
                console.log("quantitySearch error!");
            }
            else if (response[0].stock_quantity < 1){
                console.log("Sorry! We ran out of that item! Please select a different one.");
                initialMenu();
            }
            else if (response[0].stock_quantity < answer.amount) {
                console.log("Sorry! We don't have enough in stock to satisfy that order\n" + "We do have " + response[0].stock_quantity + " in stock\n" + "Please try to reorder");
                initialMenu();
            }
            else{
                var totalPrice = parseFloat(answer.amount) * parseFloat(response[0].price);
                var decimalTotalPrice = totalPrice.toFixed(2);
                var updateQuantity = "UPDATE products SET ? WHERE ?";
                connection.query(updateQuantity, [{stock_quantity: (response[0].stock_quantity - answer.amount)}, {item_id: answer.id}], function(err,updateresponse){
                    if (err) {
                        console.log("updateQuantity error");
                    }
                    
                    console.log("Thank you for your purchase! Your total is $" + decimalTotalPrice);
                   inquirer.prompt([
                        {
                            type: "confirm",
                            name: "exit",
                            message: "Would you like to make another purchase?"

                        }
                   ]).then(function (answer) {
                       if (answer.exit) {
                           initialMenu();
                       }
                       else{
                            console.log("Thank you come again!");
                            process.exit();
                       }
                   });
                   
                });
            }
        });
    });
}