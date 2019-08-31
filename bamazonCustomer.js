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
});

readProducts();
function readProducts() {
    console.log("Selecting all products...\n");
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
        promptUser();
        function promptUser() {
            inquirer.prompt([
                {
                    type: 'input',
                    name: "namequestion",
                    message: "Product ID: "
                },
                {
                    type: 'input',
                    name: "Unitsquestion",
                    message: "Amount: "
                }
            ]).then(answers => {
                for (var i = 0; i < res.length; i++) {
                    if (res[i].stock_quantity > answers.Unitsquestion) {
                        if (res[i].product_name === answers.namequestion) {
                            console.log('You selected: ' + res[i].product_name)
                            console.log("There are " + res[i].stock_quantity + ' ' + res[i].product_name + 's in stock')
                            var newStock = res[i].stock_quantity - answers.Unitsquestion;
                            var totalPrice = answers.Unitsquestion * res[i].price;
                            console.log("Your total price is: " + "$" + totalPrice);
                            console.log("There are " + newStock + ' ' + res[i].product_name + 's in stock after your transaction.')
                        }
                    } else if (res[i].stock_quantity <= 0) {
                        console.log("Insufficient quantity.")
                    }
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: newStock
                            },
                            {
                                product_name: answers.namequestion
                            }
                        ],
                    );
                }
            })

        }

    });
}
