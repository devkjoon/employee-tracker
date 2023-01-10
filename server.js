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
                    viewDept();
                    break;
                case "View All Roles":
                    viewRole();
                    break;
                case "View All Employees":
                    viewEmp();
                    break;
                case "Add A Department":
                    addDept();
                    break;
                case "Add A Role":
                    addRole();
                    break;
                case "Add An Employee":
                    addEmp();
                    break;
                case "Update An Employee Role":
                    update();
                    break;
                case "Exit":
                    console.log("Exited Application")
                    process.exit();
                default:
                    console.log('Something went wrong! Please try again!');
            }
        })
};

menu();

const viewDept = () => {
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

const viewEmp = () => {
    db.query(`SELECT e.id AS 'Employee ID',
    e.first_name AS 'First Name',
    e.last_name AS 'Last Name',
    departments.name AS 'Department',
    roles.title AS 'Title',
CONCAT(m.first_name, ' ', m.last_name) 
    AS Manager FROM 
    employees_db.employees AS e 
INNER JOIN
    roles ON (e.role_id = roles.id)
INNER JOIN
    departments ON (roles.department_id = departments.id)
LEFT JOIN
    employees_db.employees m ON e.manager_id = m.id
ORDER BY
    departments.id;`, (err, res) => {
        err ? console.error(err) : console.table(res);
        menu();
    });
};

const addDept = () => {
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
    const departments = () => db.promise().query(`SELECT * FROM departments`)
        .then((rows) => {
            let name = rows[0].map(obj => obj.name);
            return name
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
                        let mappedID = answer[0].map(obj => obj.id);
                        return mappedID[0]
                    })
                    .then((mappedID) => {
                        db.promise().query(`INSERT INTO roles(title, salary, department_id)
                        VALUES(?, ?, ?)`, [answers.roleName, answers.roleSalary, mappedID]);
                        menu();
                    })
            })  
};

const addEmp = () => {
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

const update = () => {
    const roles = () => db.promise().query(`SELECT * FROM roles`)
        .then((rows) => {
            let titles = rows[0].map(obj => obj.title);
            return titles
        })
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'employeeID',
                    message: `What is the employee's ID?`
                },
                {
                    type: 'list',
                    name: 'employeeRole',
                    message: `What would you like to set the employee role as?`,
                    choices: roles
                }
            ])
            .then(answers => {
                db.promise().query(`SELECT id FROM roles WHERE title = ?`, answers.employeeRole)
                    .then(answer => {
                        let mappedID = answer[0].map(obj => obj.id);
                        return mappedID[0]
                    })
                    .then((mappedID) => {
                        db.query(`UPDATE employees SET role_ID=? WHERE id=?`, [mappedID, answers.employeeID], (err, res) => {
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
            })
};
