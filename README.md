# Employee Tracker

## Description

This application allows users to view and manage a company's employee database.

## Table of Contents

- [Built With](#built-with)
- [Installation](#installation)
- [Usage](#usage)
- [Preview](#preview)
- [License](#license)

## Built With

- Express.js
- Node.js
- mySQL
- Inquirer
- Console.table

## Installation

To use the note taker application,
- Navigate to [Employee Tracker](https://github.com/devkjoon/employee-tracker)
- Clone the repository to your local machine to ensure you have the most up to date application
- Open integrated terminal then connect to `mySQL` then in another integrated terminal type "node server.js"

## Usage

- GIVEN a command-line application that accepts user input
- WHEN I start the application
- THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
- WHEN I choose to view all departments
- THEN I am presented with a formatted table showing department names and department ids
- WHEN I choose to view all roles
- THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
- WHEN I choose to view all employees
- THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
- WHEN I choose to add a department
- THEN I am prompted to enter the name of the department and that department is added to the database
- WHEN I choose to add a role
- THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
- WHEN I choose to add an employee
- THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
- WHEN I choose to update an employee role
- THEN I am prompted to select an employee to update and their new role and this information is updated in the database 

## Preview 

[Employee Tracker Demonstration.webm](https://user-images.githubusercontent.com/114375310/211650520-5791ebf4-8303-4250-8822-fba5a34d899d.webm)

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)  
