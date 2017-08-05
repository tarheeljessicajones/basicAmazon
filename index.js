//Dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");

//MySQL Database Connection
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Dancebabi!91",
  database: "Bamazon"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
  }
  makeTable();
});

// Show table results
var makeTable = function() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;

    var tab = "\t";
    console.log("ItemID\tProduct Name\tDepartment Name\tPrice\t# In Stock");
    console.log("--------------------------------------------------------");

    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + tab + res[i].product_name + tab +
        res[i].department_name + tab + res[i].price + tab + res[i].stock_quantity);
    }
    console.log("--------------------------------------------------------");
    promptCustomer(res);
  });
};

// Function to prompt customers
var promptCustomer = function(res) {

  // Prompts customer for what they would like to purchase
  inquirer.prompt([{
    type: "input",
    name: "buyit",
    message: "What would you like to buy?"
  }]).then(function(val) {

    // For Loop to make sure product is available
    for (var i = 0; i < res.length; i++) {
      if (res[i].product_name === val.choice) {
        correct = true;
        var product = val.choice;
        var id = i;
        inquirer.prompt([{
          type: "input",
          name: "quantity",
          message: "What quantity would you like to buy?"
        }]).then(function(val) {
          if ((res[id].stock_quantity - val.quant) > 0) {
            connection.query(
              "UPDATE products SET stock_quantity='" + (res[id].stock_quantity - val.quant) +
              "' WHERE product_name='" + product + "'",
              function(err, res2) {
                if (err) {
                  throw err;
                }

                // Alert user to successful purchase
                console.log("PRODUCT BOUGHT!");

                // Restart
                makeTable();
              });
          }
        });
      }
      
    }

    if (i === res.length && correct === false) {
      console.log("PRODUCT DOES NOT EXIST");
      promptCustomer(res);
    }
  });
};