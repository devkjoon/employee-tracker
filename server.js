const inquirer = require("inquirer");
const fs = require('fs');
const path = require('path');
const { urlToHttpOptions } = require("url");

function startApp() {
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
                    viewAllDepartments();
                    break;
                case "View All Roles":
                    viewAllRoles();
                    break;
                case "View All Employees":
                    viewAllEmployees();
                    break;
                case "Add A Department":
                    addADepartment();
                    break;
                case "Add A Role":
                    addARole();
                    break;
                case "Add An Employee":
                    addAnEmployee();
                    break;
                case "Update An Employee Role":
                    updateAnEmployeeRole();
                    break;
                default:
                    console.log('Something went wrong! Please try again!');
            }
        })
}