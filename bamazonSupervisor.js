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
            choices: ["View Product Sales by Department", "Create New Department"]
        }
    ]).then(answers => {
        if (answers.multChoice === "View Product Sales by Department") {
            salesByDep()
        }
        if (answers.multChoice === "Create New Department") {
            lowInventory();
        }
    })
}

function salesByDep() {

}
function lowInventory() {

}