// Initializes the npm packages used
var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

// Initializes the connection variable to sync with a MySQL database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});


connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err);
  }
  loadInventory();
});

function loadInventory() {

  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;

    console.table(res);

    orderPrompt(res);
  });
}

function orderPrompt(inventory) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "items",
        message: "Enter the product ID for the item to add to your cart",
      }
    ])
    .then(function(val) {
      var itemId = parseInt(val.items);
      var cartItem = checkInventory(itemId, inventory);

      if (cartItem) {
        quantityPrompt(cartItem);
      }
      else {
        console.log("Sorry, that is not a valid item choice");
        loadInventory();
      }
    });
}
  function quantityPrompt(item) {
    inquirer
      .prompt([
        {
          type: "input",
          name: "quantity",
          message: "Enter quantity",
          validate: function(val) {
            return val > 0;
          }
        }
      ])
      .then(function(val) {
        var quantity = parseInt(val.quantity);

        if (quantity > item.stock_quantity) {
          console.log("\nNot enough in stock - please choose lesser quantity");
          loadInventory();
        }
        else {
          makePurchase(item, quantity);
        }
      })
      .catch(function(error) {
        console.log(error);
      })
  }

  function checkInventory(itemId, inventory) {
  for (var i = 0; i < inventory.length; i++) {
    if (inventory[i].item_id === itemId) {
      // If a matching product is found, return the product
      return inventory[i];
    }
  }
  // Otherwise return null
  return null;
  }

  function makePurchase(item, quantity) {
  connection.query(
    "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
    [quantity, item.item_id],
    function(err, res) {
      console.log("\nThank you for purchasing " + quantity + " " + item.product_name);
      loadInventory();
      var total = purchaseTotal(item, quantity);
      console.log("Your total:" + total);
    }
  );
  }

  function purchaseTotal(item, quantity) {
    var total = item.price * quantity;
    return Math.round(total * 100) / 100;
  }
