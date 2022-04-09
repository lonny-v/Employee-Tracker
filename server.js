const inquirer = require("inquirer");
const express = require("express");
const db = require('./db/connection');
const app = express();

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
    inquirer.prompt({
        type: "input",
        name: "roll",
        message: "Add a roll"
    })
        .then(function (result) {
            db.query(`INSERT INTO rolls ?`, result, (req, res) => {
                console.table(res);
            });
        })
};
function addEmployee() {
    inquirer.prompt({
        type: "input",
        name: "employee",
        message: "Add employee name"
    })
        .then(function (result) {
            db.query(`INSERT INTO employees ?`, result, (req, res) => {
                console.table(res);
            });
        })
};
function updateRoll(){
    inquirer.prompt({
        type: "choices",
        name: "roll",
        message: "Update employee roll"
    })
        .then(function (result) {
            db.query(`INSERT INTO departments ?`, result, (req, res) => {
                console.table(res);
            });
        })
};

init();