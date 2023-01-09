const inquirer = require("inquirer");
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root', 
        password: 'password',
        database: 'employees_db'
    },
    console.log("Connection to employees_db successful!")
);

function menu() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "options",
                message: "Select one of the following:",
                choices: [
                    "View All Departments",
                    "View All Roles",
                    "View All Employees",
                    "Add A Department",
                    "Add A Role",
                    "Add An Employee",
                    "Update An Employee Role",
                    "Exit"
                ],
                validate: (options) => {
                    if (options) {
                        return true;
                    } else {
                        console.log(`Please select one of the options to continue!`);
                        return false;
                    }
                }
            }
        ])
        .then((answers) => {
            switch (answers.options) {
                case "View All Departments":
                    viewDepartment();
                    break;
                case "View All Roles":
                    viewRole();
                    break;
                case "View All Employees":
                    viewEmployee();
                    break;
                case "Add A Department":
                    addDepartment();
                    break;
                case "Add A Role":
                    addRole();
                    break;
                case "Add An Employee":
                    addEmployee();
                    break;
                case "Update An Employee Role":
                    updateEmployee();
                    break;
                case "Exit":
                    console.log("Exiting Application")
                    process.exit();
                default:
                    console.log('Something went wrong! Please try again!');
            }
        })
};

menu();

const viewDepartment = () => {
    db.query('SELECT * FROM department', (err, res) => {
        err ? console.error(err) : console.table(res);
        menu();
    })
};

const viewRole = () => {
    db.query('SELECT * FROM role', (err, res) => {
        err ? console.error(err) : console.table(res);
        menu();
    })
}

const viewEmployee = () => {
    db.query('SELECT * FROM employee', (err, res) => {
        err ? console.error(err) : console.table(res);
        menu();
    })
};

const addDepartment = () => {
    inquirer
        .prompt([
            
        ])
}

const addRole

const addEmployee

const updateEmployee
