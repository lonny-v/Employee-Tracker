const inquirer = require("inquirer");
const express = require("express");
const db = require('./db/connection');
const app = express();

const PORT = process.env.PORT || 3001;

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
                switch (result.option) {
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
}

function viewDepartments() {
    db.query(`SELECT * FROM departments`, (req, res) => {
        console.table(res);
    })
};
function viewRoles() {
    db.query(`SELECT * FROM roles`, (req, res) => {
        console.table(res);
    });
};
function viewEmployees() {
    db.query(`SELECT * FROM demployees`, (req, res) => {
        console.table(res);
    });
};
function addDepartment() {
    inquirer.prompt({
        type: "input",
        name: "department",
        message: "Add department name"
    })
        .then(function (result) {
            db.query(`INSERT INTO departments ?`, result, (req, res) => {
                console.table(res);
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
            db.query(`INSERT INTO roles ?`, result, (req, res) => {
                console.table(res);
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
            db.query(`INSERT INTO employees ?`, result, (req, res) => {
                console.table(res);
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
            db.query(`INSERT INTO departments ?`, result, (req, res) => {
                console.table(res);
            });
        })
};

init();

// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});