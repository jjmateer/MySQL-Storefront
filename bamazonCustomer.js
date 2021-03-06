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
});
readFile();
function readFile() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.table(res)
        promptUser();
    })
}
function promptUser() {
    connection.query("SELECT * FROM products", function (err, res) {
        inquirer.prompt([
            {
                type: 'input',
                name: "namequestion",
                message: "Product Name: "
            },
            {
                type: 'input',
                name: "Unitsquestion",
                message: "Amount: "
            }
        ]).then(answers => {
            for (var i = 0; i < res.length; i++) {
                if (res[i].stock_quantity > answers.Unitsquestion && res[i].product_name === answers.namequestion) {
                    console.log('You selected: ' + res[i].product_name)
                    console.log("There were " + res[i].stock_quantity + ' ' + res[i].product_name + 's in stock')
                    var newStock = res[i].stock_quantity - answers.Unitsquestion;
                    var totalPrice = answers.Unitsquestion * res[i].price;
                    var productSales = res[i].product_sales + totalPrice;
                    console.log("Your total price is: " + "$" + totalPrice);
                    console.log("There are " + newStock + ' ' + res[i].product_name + 's in stock after your transaction.')
                } else if (res[i].stock_quantity <= 0) {
                    console.log("Insufficient quantity.")
                }
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: newStock,
                            product_sales: productSales
                        },
                        {
                            product_name: answers.namequestion
                        }
                    ]
                );
            }
            connection.end()
        })
    })
}