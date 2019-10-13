var mysql = require("mysql");
var inquirer = require("inquirer");
require('console.table');
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
    query += "FROM products p INNER JOIN departments d ON p.department_name = d.department_name GROUP BY d.department_name"
    query += " ORDER BY department_id"
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res)
        connection.end()
    })
}
function createNew() {
    connection.query("SELECT * FROM departments ", function (err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                type: 'input',
                name: 'depName',
                message: 'Enter name of new department: '
            },
            {
                type: 'input',
                name: 'OHcost',
                message: 'Department overhead costs: '
            }
        ]).then(answers => {
            var lastItem = res.length - 1;
            var resID = res[lastItem].department_id + 1
            connection.query("INSERT INTO departments SET ?",
                {
                    department_id: resID,
                    department_name: answers.depName,
                    over_head_costs: answers.OHcost
                },
                function (err) {
                    if (err) throw err;
                    console.log("Added " + answers.depName + " to departments.")
                    console.log("Invested $" + answers.OHcost)
                    connection.end();
                })
        })
    })
}