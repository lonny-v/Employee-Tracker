const inquirer = require("inquirer");
const db = require('./db/connection');
const table = require('console.table');

// Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

function init() {
    function options() {
        inquirer.prompt([
            {
                type: 'list',
                name: 'option',
                choices:
                    [
                        "view all departments",
                        "view all roles",
                        "view all employees",
                        "add a department",
                        "add a role",
                        "add an employee",
                        "update an employee role"
                    ]
            }
        ])
            .then(function (result) {
                switch (result.options) {
                    case "view all departments":
                        viewDepartments();
                        break;
                    case "view all roles":
                        viewRoles();
                        break;
                    case "view all employees":
                        viewEmployees();
                        break;
                    case "add a department":
                        addDepartment();
                        break;
                    case "add a roll":
                        addRoll();
                        break;
                    case "add a employee":
                        addEmployee();
                        break;
                    case "update an employee roll":
                        updateRoll();
                        break;
                }
            })
    }
    options();
};

function viewDepartments() {
    db.query(`SELECT * FROM departments`, (err, rows) => {
        if (err) {
            console.log(err.message);
            return;
        }
        init();
    })
};
function viewRoles() {
    db.query(`SELECT * FROM roles`, (err, rows) => {
        console.table(rows);
        init()
    });
};
function viewEmployees() {
    db.query(`SELECT * FROM demployees`, (err, rows) => {
        console.table(rows);
    });
};
function addDepartment() {
    inquirer.prompt({
        type: "input",
        name: "department",
        message: "Add department name"
    })
        .then(function (result) {
            db.query(`INSERT INTO departments ?`, result, (err, rows) => {
                console.table(rows);
            });
        })
};
function addRoll() {
    inquirer.prompt([
        {
            type: "input",
            name: "role",
            message: "Add the name of the roll"
        },
        {
            type: "input",
            name: "roleSalary",
            message: "Add the salary for this role"
        },
        {
            type: "input",
            name: "roleDepartment",
            message: "Enter the department id for this role"
        }
    ])
        .then(function (result) {
            db.query(`INSERT INTO roles ?`, result, (err, rows) => {
                console.table(rows);
            });
        })
};
function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "employeeFirst",
            message: "Add employee's first name"
        },
        {
            type: "input",
            name: "employeeLast",
            message: "Add employee's last name"
        },
        {
            type: "input",
            name: "employeeRole",
            message: "Add employee's role"
        },
        {
            type: "input",
            name: "employeeManager",
            message: "Add the manager's id that this employee will report to",
        },
    ])
        .then(function (result) {
            db.query(`INSERT INTO employees ?`, result, (err, rows) => {
                console.table(rows);
            });
        })
};
function updateRoll() {
    inquirer.prompt({
        type: "choices",
        name: "roll",
        message: "Update employee role"
    })
        .then(function (result) {
            db.query(`INSERT INTO departments ?`, result, (err, rows) => {
                console.table(rows);
            });
        })
};

init();
