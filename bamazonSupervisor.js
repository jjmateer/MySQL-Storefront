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
            createNew();
        }
    })
}

function salesByDep() {
    var query = "SELECT d.department_id, d.department_name, d.over_head_costs, d.department_name, "
    query += "sum(p.product_sales) as product_sales, sum(p.product_sales) - over_head_costs as total_profit "
    query += "FROM products p RIGHT JOIN departments d ON p.department_name = d.department_name GROUP BY d.department_name"
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res)
    })
}