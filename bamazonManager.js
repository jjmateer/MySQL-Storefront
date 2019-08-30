var mysql = require("mysql");
var inquirer = require("inquirer")
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Manila22!",
    database: "bamazon"
});
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    multChoice();
});
function multChoice() {
    inquirer.prompt([
        {
            type: 'list',
            name: "multChoice",
            message: "What would you like to do? ",
            choices: ["View products for sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }
    ]).then(answers => {
            console.log(answers.multChoice)
        if (answers.multChoice === "View products for sale") {
            readProducts();
        }
        if (answers.multChoice[1]) {
            // lowInventory();
        }
    })
}
function readProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].id);
            console.log("Product Name: " + res[i].product_name);
            console.log("Department: " + res[i].department_name);
            console.log("Price: " + res[i].price);
            console.log("Quantity: " + res[i].stock_quantity)
            console.log('==========================')
        }
    })
}
function lowInventory() {
    // console.log(res[i].stock_quantity)
    for (var i = 0; i < res.length; i++) {
        if (res[i].stock_quantity < 3) {
            console.log(res[i].product_name)
        }
    }
}