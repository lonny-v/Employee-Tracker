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

viewDepartments();
viewRoles();
viewEmployees();
addDepartment();
addRoll();
addEmployee();
updateRoll();

init();