var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');
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
    var query = "SELECT departments.department_id, products.department_name, departments.over_head_costs, "
    query += "products.product_sales, departments.total_profit FROM departments, products";
    connection.query(query, function (err, res) {
        if (err) throw err;
        const table = cTable.getTable(res)
        console.log(table);
    })
}
function lowInventory() {

}