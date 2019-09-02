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
            // salesByDep()
            getSales()
        }
        if (answers.multChoice === "Create New Department") {
            createNew();
        }
    })
}
function getSales() {
    var query = "SELECT products.department_name, products.product_sales FROM products ORDER BY products.department_name"
    connection.query(query, function (err, res) {
        if (err) throw err;
        var totalSalesArr = [];
        for (var i = 0; i < res.length; i++) {
            if (res[i].department_name === "Clothing") {
                var totalSales = 0
                totalSales += res[i].product_sales
                totalSalesArr.push(totalSales)
                var arrTotal = totalSalesArr.reduce((a, b) => a + b, 0)
            }
        }
        console.log(arrTotal)
    })
}
function salesByDep() {
    var query = "SELECT d.department_id, d.department_name, d.over_head_costs, "
    query += "p.product_sales FROM departments AS d INNER JOIN products AS p ON "
    query += " d.department_name = p.department_name GROUP BY d.department_name"
    query += " ORDER BY d.department_name"
    connection.query(query, function (err, res) {
        // console.log(res)
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {

        }
        const table = cTable.getTable(res)
        console.log(table);
        console.table(res)
    })
}
function createNew() {

}