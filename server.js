const inquire = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table')
const db = require('./config/connection')
const chalk = require('chalk')
const validate = require('./utils/inputValidate')
const figlet = require('figlet');
const inquirer = require('inquirer');

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
}