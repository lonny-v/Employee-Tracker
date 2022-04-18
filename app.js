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
        ]).then(function (result) {
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
        if (err) {
            console.log(err.message);
            return;
        }
        console.table(rows);
        init();
    });
};

function viewEmployees() {
    const sql = `SELECT e.id, e.first_name, e.last_name,
                roles.title, departments.title, roles.salary,
                concat(m.first_name, ' ', m.last_name) manager
                FROM employees e
                INNER JOIN roles ON e.role_id = roles.id
                INNER JOIN departments ON roles.department_id = departments.id
                LEFT JOIN employees m ON m.id = e.manager_id`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err.message);
            return;
        }
        console.table(rows);
        init();
    });
};

function viewRoles() {
    const sql = `SELECT roles.id, roles.title, roles.salary, departments.title
                FROM roles
                LEFT JOIN departments ON roles.department_id = departments.id`;
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
        const sql = `INSERT INTO departments(title) VALUES(?)`;
        const params = input.new_department;
        db.query(sql, params, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }

            console.log(`Added ${params} to the database`);
            init();
        });
    });
};

const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Please enter employee first name'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Please enter employee last name'
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'Please enter employee role'
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'Please enter employee manager ID'
        }
    ])
        .then(input => {
            const sql = `INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
            const params = [input.first_name, input.last_name, input.role_id, input.manager_id];
            db.query(sql, params, (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log(`Added ${params[0]} ${params[1]} to the database`);
                init();
            });
        });
};

const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Please add role'
        },
        {
            input: 'input',
            name: 'salary',
            message: 'Please input the salary for this role'
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'Please enter Department ID for role'
        }

    ])
        .then(input => {
            const sql = `INSERT INTO roles(title, salary, department_id) VALUES(?,?,?)`;
            const params = [input.title, input.salary, input.department_id];
            db.query(sql, params, (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }

                console.log(`Added ${params[0]} to the database`);
                init();
            });
        });
};

const updateRole = () => {
    inquirer.prompt({
        type: 'choices',
        message: 'Please update employee role'
    })
};


init();