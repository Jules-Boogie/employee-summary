const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const employees = [];




function init() {

    createManager();
}


init();


function createManager() {
    inquirer.prompt([
        {
            type: "input",
            name: "managerName",
            message: "What is your manager's name?"
        },
        {
            type: "input",
            name: "managerId",
            message: "What is your manager's id?"
        },
        {
            type: "input",
            name: "managerEmail",
            message: "What is your manager's email?"
        },
        {
            type: "input",
            name: "managerOfficeNumber",
            message: "What is your manager's office number?"
        }

    ])
        .then(function (answer) {
            var newManager = new Manager(answer.managerName, answer.managerId, answer.managerEmail, answer.managerOfficeNumber);
            employees.push(newManager)
            addTeamMember();

        })
}



function createEngineer() {
    inquirer.prompt([

        {
            type: "input",
            name: "engineerName",
            message: "What is your engineer's name?"
        },
        {
            type: "input",
            name: "engineerId",
            message: "What is your engineer's id?"
        },
        {
            type: "input",
            name: "engineerEmail",
            message: "What is your engineer's email?"
        },
        {
            type: "input",
            name: "githubUsername",
            message: "What is your engineer's Github username?"
        }


    ])
        .then(function (answer) {
            var newEngineer = new Engineer(answer.engineerName, answer.engineerId, answer.engineerEmail, answer.githubUsername);
            employees.push(newEngineer)
            addTeamMember();


        })
}


function createIntern() {
    inquirer.prompt([
        {
            type: "input",
            name: "internName",
            message: "What is your intern's name?"
        },
        {
            type: "input",
            name: "internId",
            message: "What is your intern's id?"
        },
        {
            type: "input",
            name: "internEmail",
            message: "What is your intern's email?"
        },
        {
            type: "input",
            name: "schoolName",
            message: "What is your intern's school name?"
        }

    ])
        .then(function (answer) {

            var newIntern = new Intern(answer.internName, answer.internId, answer.internEmail, answer.schoolName);
            employees.push(newIntern)
            addTeamMember();
        })
}




function addTeamMember() {
    inquirer.prompt([
        {
            type: "list",
            message: "What kind of team you want to  build?",
            choices: ["Engineer", "Intern", "No team yet!"],
            name: "teamType"
        }
    ])
        .then(function ({ teamType }) {

            if (teamType === "Engineer") {
                createEngineer();
            } else if (teamType === "Intern") {
                createIntern();

            } else {
                buildDevTeam();
            }
        });

}



function buildDevTeam() {
    
    fs.writeFileSync(outputPath, render(employees), "utf-8");

}



