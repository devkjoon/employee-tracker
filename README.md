# employee-tracker

# Team Profile Generator  
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)  
    
## Description  

This application allows users to automatically generate a README.md file with user input via the Terminal. By simplifying the README creation process, users are able to focus more on their project and make the timeline. 

## Table of Contents
    - [Built With](#built-with)
- [Installation](#installation)
- [Usage](#usage)
- [Preview](#preview)
- [License](#license)
    
## Built With

- HTML
- CSS
- JavaScript
- Node.js
- Jest
- Inquirer

## Installation
    
To generate your own team, 
- Navigate to the [Team Profile Generator](https://github.com/devkjoon/team-profile-generator) and git pull the latest repository to your local machine
- Run `npm install`  in order to install `inquirer`
- Using your terminal, use the command `node index.js` to initialize the application
    
## Usage
    
- GIVEN a command-line application that accepts user input
- WHEN I am prompted for my team members and their information
- THEN an HTML file is generated that displays a nicely formatted team roster based on user input
- WHEN I click on an email address in the HTML
- THEN my default email program opens and populates the TO field of the email with the address
- WHEN I click on the GitHub username
- THEN that GitHub profile opens in a new tab
- WHEN I start the application
- THEN I am prompted to enter the team manager’s name, employee ID, email address, and office number
- WHEN I enter the team manager’s name, employee ID, email address, and office number
- THEN I am presented with a menu with the option to add an engineer or an intern or to finish building my team
- WHEN I select the engineer option
- THEN I am prompted to enter the engineer’s name, ID, email, and GitHub username, and I am taken back to the menu
- WHEN I select the intern option
- THEN I am prompted to enter the intern’s name, ID, email, and school, and I am taken back to the menu
- WHEN I decide to finish building my team
- THEN I exit the application, and the HTML is generated

## Preview

https://user-images.githubusercontent.com/114375310/208504769-933aa2e1-ad81-444c-ba0b-cb3ca0ab2ca2.mp4

## License

See LICENSE in repo
