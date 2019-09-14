var mysql = require("mysql");
var inquirer = require("inquirer")
require("console.table")
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "xxx",
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
            choices: ["View products for sale", "View low inventory", "Add to inventory", "Add new product"]
        }
    ]).then(answers => {
        console.log(answers.multChoice)
        if (answers.multChoice === "View products for sale") {
            readProducts();
        }
        if (answers.multChoice === "View low inventory") {
            lowInventory();
        }
        if (answers.multChoice === "Add to inventory") {
            addInventory();
        }
        if (answers.multChoice === "Add new product") {
            addProduct();
        }
    })
}
function readProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.table(res)
    })
    connection.end()
}
function lowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 3", function (err, res) {
        if (err) throw err;
            console.table(res)
    })
    connection.end()
}
function addInventory() {
    inquirer.prompt([
        {
            type: 'input',
            name: "AddInv",
            message: "Enter item name to restock:",
        },
        {
            type: 'input',
            name: "AddInv2",
            message: "How many would you like to add to stock?"
        }
    ]).then(answers => {
        connection.query("SELECT * FROM products", function (err, res) {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {
                if (res[i].product_name === answers.AddInv) {
                    var newStock = res[i].stock_quantity + parseInt(answers.AddInv2);
                    console.log("Added " + answers.AddInv2 + " to " + res[i].product_name + ".")
                    console.log(res[i].product_name + " has " + newStock + " in stock.")
                }
            }
            connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_quantity: newStock
                    },
                    {
                        product_name: answers.AddInv
                    }
                ],
                function (err) {
                    if (err) throw err;
                    connection.end()
                }
            );
        })
    })
}
function addProduct() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                type: 'input',
                name: "addProduct",
                message: "Enter name for new product: ",
            },
            {
                type: 'input',
                name: "addProduct2",
                message: "Enter product department: "
            },
            {
                type: 'input',
                name: "addProduct3",
                message: "Enter price: ",
            },
            {
                type: 'input',
                name: "addProduct4",
                message: "Product quantity: ",
            },
        ])
            .then(answers => {
                var lastItem = res.length - 1;
                var resID = res[lastItem].id + 1

                connection.query("INSERT INTO products SET ?",
                    {
                        id: resID,
                        product_name: answers.addProduct,
                        department_name: answers.addProduct2,
                        price: answers.addProduct3,
                        stock_quantity: answers.addProduct4
                    },
                    function (err) {
                        if (err) throw err;
                        connection.end()
                        console.log("Added " + answers.addProduct + " to products.")
                    }
                );
            })
    })
}
