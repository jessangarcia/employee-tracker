const inquire = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table')
const db = require('./config/connection')
const chalk = require('chalk')
const validate = require('./utils/inputValidate')
const figlet = require('figlet')

db.connect((error) => {
    if (error) throw error;
    console.log(chalk.yellow.bold(`====================================================================================`));
})