const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

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
    db.query(`SELECT * FROM departments`, (err, res) => {
        err ? console.error(err) : console.table(res);
        menu();
    })
};

const viewRole = () => {
    db.query(`SELECT * FROM roles`, (err, res) => {
        err ? console.error(err) : console.table(res);
        menu();
    })
}

const viewEmployee = () => {
    db.query(`SELECT * FROM employees`, (err, res) => {
        err ? console.error(err) : console.table(res);
        menu();
    })
};

const addDepartment = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'addDepartment',
                message: 'What department would you like to add?'
            }
        ])
        .then((answers) => {
            db.query(`INSERT INTO departments(name) VALUES(?)`, answers.addDepartment, (err, res) => {
                if (err) {
                    console.log(err)
                } else {
                    db.query(`SELECT * FROM departments`, (err, res) => {
                        err ? console.error(err) : console.table(res);
                        menu();
                    })
                }
            })
        })
};

const addRole = () => {
    const departments = () => db.promise().query(`SELECT * FROM department`)
        .then((rows) => {
            let names = rows[0].map(obj => obj.name);
            return names
        })
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'roleName',
                    message: `What is the role you'd like to add?`
                },
                {
                    type: 'input',
                    name: 'roleSalary',
                    message: `What is the salary of this role?`
                },
                {
                    type: 'list',
                    name: 'roleDepartment',
                    message: `What department is this role?`,
                    choices: departments
                }
            ])
            .then(answers => {
                db.promise().query(`SELECT id FROM departments WHERE name = ?`, answers.roleDepartment)
                    .then(answer => {
                        let mappedId = answer[0].map(obj => obj.id);
                        return mappedId[0]
                    })
                    .then((mappedId) => {
                        db.promise().query(`INSERT INTO roles(title, salary, department_id)
                        VALUES(?, ?, ?)`, [answers.roleName, answers.roleSalary, mappedId]);
                        menu();
                    })
            })  
};

const addEmployee = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'firstName',
                message: `What is the employee's first name?`
            },
            {
                type: 'input',
                name: 'lastName',
                message: `What is the employee's last name?`
            },
            {
                type: 'input',
                name: 'roleID',
                message: `What is the ID of this employee's role?`
            },
            {
                type: 'input',
                name: 'managerID',
                message: `What is the ID of this employee's manager?`
            }
        ])
        .then(answers => {
            db.query(`INSERT INTO employees(first_name, last_name, role_id, manager_id)
            VALUES(?, ?, ?, ?)`, [answers.firstName, answers.lastName, answers.roleID, answers.managerID], (err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    db.query(`SELECT * FROM employees`, (err, res) => {
                        err ? console.log(err) : console.table(res);
                        menu();
                    })
                }
            })
        })
};