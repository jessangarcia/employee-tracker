const inquire = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table')
const db = require('./config/connection')
const chalk = require('chalk')
const validate = require('./utils/inputValidate')
const figlet = require('figlet');
const inquirer = require('inquirer');

//connect to database 
db.connect((error) => {
    if (error) throw error;
    console.log(chalk.yellow.bold(`====================================================================================`));
    console.log(``);
    console.log(chalk.greenBright.bold(figlet.textSync('Employee Tracker')));
    console.log(``);
    console.log(``);
    console.log(chalk.red.bold(`====================================================================================`));
    userPrompt();
});

const userPrompt = () => {
    inquirer.prompt([
        {
            name: 'choices',
            type: 'list',
            message: 'Please select an option',
            choices: [
                'View All Employees',
                'View All Roles',
                'View All Departments',
                'Add Employee',
                'Add Role',
                'Add Department',
                'Update An Employee Role',
                'Exit'
            ]
        }
    ])
        .then((answers) => {
            const { choices } = answers;

            if (choices === 'View All Employees') {
                viewEmployees();
            }

            if (choices === 'View All Roles') {
                viewRoles();
            }

            if (choices === 'View All Departments') {
                viewDeparts();
            }

            if (choices === 'Add Employee') {
                addEmployee();
            }

            if (choices === 'Add Role') {
                addRole();
            }

            if (choices === 'Add Department') {
                addDepart();
            }

            if (choices === 'Update An Employee Role') {
                updateEmpRole();
            }

            if (choices === 'Exit') {
                db.end();
            }
        })
};
//view all employees
const viewEmployees = () => {
    var sql = `SELECT employees.id, employees.first_name, employees.last_name, 
    role.title AS Title, departments.name AS Department, role.salary AS Salary, 
    CONCAT(e.first_name, ' ' ,e.last_name) AS Manager
    FROM employees 
    LEFT JOIN role ON employees.role_id = role.id
    LEFT JOIN departments ON role.departments_id = departments.id
    LEFT JOIN employees e ON employees.manager_id = e.id;`;
    db.query(sql, (err, results) => {
        if (err) throw error;
        console.log(``);
        console.log(`Current Employees:`);
        console.table(results);
    })
};
//view all roles
const viewRoles = () => {
    const sql = `SELECT role.id, role.title, role.salary, departments.name
    AS department_name 
    FROM role 
    LEFT JOIN departments 
    ON role.departments_id = departments.id;`;
    db.query(sql, (err, results) => {
        if (err) throw error;
        console.log(``);
        console.log(`Current Roles:`);
        console.table(results);
    })
}
//view all departments 
const viewDeparts = () => {
    var sql = `SELECT department.id AS id, department.name AS department FROM department`;
    db.query(sql, (err, results) => {
        if (err) throw error;
        console.log(``);
        console.log(`Department List:`);
        console.table(results);
    })
}

const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the employees first name?',
            validate: addFirstName => {
                if (addFirstName) {
                    return true;
                } else {
                    console.log('Please enter their first name');
                    return false;
                }
            }
        }
    ])
}