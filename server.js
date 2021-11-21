const inquire = require('inquirer');
require('dotenv').config();
const mysql = require('mysql2');
const cTable = require('console.table')
const chalk = require('chalk')
const validate = require('./utils/inputValidate')
const figlet = require('figlet');
const inquirer = require('inquirer');

//connect to database 
// Connect to database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: 3306,
    // Your MySQL username,
    user: process.env.DB_USER,
    // Your MySQL password
    password: process.env.DB_PASS,
    database: "employee_tracker",
});

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
        });
};
//view all employees
const viewEmployees = () => {
    var sql = `SELECT employee.id, 
    employee.first_name, 
    employee.last_name, 
    roles.title, 
    department.department_name AS 'department', 
    roles.salary
    FROM employee, roles, department 
    WHERE department.id = roles.department_id 
    AND roles.id = employee.role_id
    ORDER BY employee.id ASC`;
    db.query(sql, (error, results) => {
        if (error) throw error;
        console.log(``);
        console.log(`Current Employees:`);
        console.table(results);
    });
};
//view all roles
const viewRoles = () => {
    const sql = `SELECT roles.id, roles.title, department.department_name AS department
    FROM roles
    INNER JOIN department ON roles.department_id = department.id`;
    db.query(sql, (error, results) => {
        if (error) throw error;
        console.log(``);
        console.log(`Current Roles:`);
        console.table(results);
    });
};
//view all departments 
const viewDeparts = () => {
    var sql = `SELECT department.id AS id, department.department_name AS department FROM department`;
    db.query(sql, (error, results) => {
        if (error) throw error;
        console.log(``);
        console.log(`Department List:`);
        console.table(results);
    });
};

//add department
const addDepart = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newDepart',
            message: 'What is the new department name?',
            validate: inputDepart => {
                if (inputDepart) {
                    return true;
                } else {
                    console.log('Please enter department name');
                    return false;
                }
            }
        }
    ])
        .then((answer) => {
            var depart = `INSERT INTO department (department_name) VALUES (?)`;
            db.query(depart, answer.newDepart, (error, response) => {
                if (error) throw error;
                console.log(``);
                console.log(chalk.greenBright(answer.newDepart + ` Department created!`));
                console.log(``);
                viewDeparts();
            })
        })
};

//add role 
const addRole = () => {
    const sqlDepart = `SELECT * FROM department`
    db.query(sqlDepart, (error, response) => {
        if (error) throw error;
        let departArray = [];
        response.forEach((department) => { departArray.push(department.department_name); });
        departArray.push('Create Department');
        inquirer.prompt([
            {
                type: 'list',
                name: 'departName',
                choices: departArray
            }
        ])
            .then((answer) => {
                if (answer.departName === 'Create Department') {
                    this.addDepart();
                } else {
                    newRole(answer);
                }
            });
        const newRole = (departInfo) => {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'roleTitle',
                    message: 'WHat is the name of this role?'
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'What is the salary of this role?'
                }
            ])
                .then((answer) => {
                    let roleInfo = answer.roleTitle;
                    let departId;

                    response.forEach((department) => {
                        if (departInfo.departName === department.department_name) {departId = department.id;}
                    });

                    let sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
                    let newRoles = [roleInfo, answer.salary, departId];

                    db.query(sql, newRoles, (error) => {
                        if (error) throw error;
                        console.log(chalk.greenBright(`Role created!`));
                        viewRoles();
                    })
                })
        }
    })
}
//add employee
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
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the employees last name?',
            validate: addLastName => {
                if (addLastName) {
                    return true;
                } else {
                    console.log('Please enter their last name');
                    return false;
                }
            }
        }
    ])
        .then(answer => {
            const newEmp = [answer.firstName, answer.lastName]
            const newEmpRole = `SELECT roles.id, roles.title FROM roles`;
            db.query(newEmpRole, (error, data) => {
                if (error) throw error;
                const roles = data.map(({ id, title }) => ({ name: title, value: id }));
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'roles',
                        message: "what is the employee's role?",
                        choices: roles
                    }
                ])
                    .then(rChoice => {
                        const role = rChoice.roles;
                        newEmp.push(role);
                        const managerId = `SELECT * FROM employee`;
                        db.query(managerId, (error, data) => {
                            if (error) throw error;
                            const managers = data.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));
                            inquirer.prompt([
                                {
                                    type: 'list',
                                    name: 'manager',
                                    message: "who is the employee's manager",
                                    choices: managers
                                }
                            ])
                                .then(managerChoice => {
                                    const manager = managerChoice.manager;
                                    newEmp.push(manager);
                                    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
                                    db.query(sql, newEmp, (error) => {
                                        if (error) throw error;
                                        console.log(chalk.greenBright(`Employee has been added!`));
                                        viewEmployees();
                                    });
                                });
                        });
                    });
            });
        });
};