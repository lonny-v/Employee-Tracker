const db = require('./db/connection');
const { listenerCount } = require('process');
const table = require('console.table');
const inquirer = require("inquirer");



const init = () => {
    const options = () => {
        inquirer.prompt([
            {
                type: 'list',
                name: 'options',
                choices:
                [
                    'View all departments',
                    'View all roles', 
                    'View all employees',
                    'Add a department',
                    'Add a role',
                    'Add an employee',
                    'Update an employee role' 
                ]
            }
        ]).then(function(result) {
            switch (result.options) {
                case 'View all departments':
                    viewDepartments();
                    break;
                case 'View all roles':
                    viewRoles();
                    break;
                case 'View all employees':
                    viewEmployees();
                    break;
                case 'Add a department':
                    addDepartment();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Update an employee role':
                    updateRole();
                    break
            }
        })
    }
    options();
};


const viewDepartments = () => {
    const sql = `SELECT * FROM departments`;
    db.query(sql, (err, rows) => {
        if(err) {
            console.log(err.message);
            return;
        }
        console.table(rows);
        init();
    });
};

const viewEmployees = () => {
    // const sql = `SELECT *
    // FROM employees
    // INNER JOIN roles
    // ON employees.salary_id = salary`;
    const sql = `SELECT * FROM employees`;

    db.query(sql, (err, rows) => {
        if(err) {
            console.log(err.message);
            return;
        }
        console.table(rows);
        init();
    });
};

const viewRoles = () => {
    const sql = `SELECT *
    FROM roles
    LEFT JOIN departments
    ON roles.department_id = departments.id`;
    db.query(sql, (err, rows) => {
        if(err) {
            console.log(err.message);
            return;
        }
        console.table(rows);
        init();
    });
};

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'new_department',
            message: 'What is the new department called?'
        }
    ]).then(input => {
        const sql = `INSERT INTO departments(department) VALUES (?)`;
        const params = input.new_department;
        db.query(sql, params, (err, result) => {
            if(err) {
                console.log(err);
                return;
            }
            console.log(`Added ${params} to the database`);
            restart();
        });
    });
};

const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Please enter employee first name'
        },
        {
            type: 'input',
            message:'Please enter employee last name'
        },
        {
            type: 'input',
            message:'Please enter employee role'
        },
        {
            type: 'input',
            message: 'Please enter employee manager ID'
        }
    ])
    .then(function (result) {
        db.query(`INSERT INTO  employees ?`, result, (req, res) => {
            console.table(res)
        })
    })
};

const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Please add role'
        },
        {
            input: 'input',
            message: 'Please input the salary for this role'
        },
        {
            type: 'input',
            message: 'Please enter Department ID for role'
        }
            
    ])
    .then(function (result) {
        db.query(`INSERT INTO  roles ?`, result, (req, res) => {
            console.table(res)
        })
    })
};

const updateRole = () => {
    inquirer.prompt({
        type: 'choices',
        message: 'Please update employee role'
    })
};


init();