const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const employee = [];


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

function addteamMember() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the team member's name?",
            name: "name"
        },
        {
            type: "list",
            message: "what is the role of the team member?",
            name: "role"

        },
        {
            type: "input",
            message: "what is their email address?",
            name: "email"

        },
        {
            type: "input",
            message: "Enter Team member's ID",
            name: "id"
        }
    ])
        .then(function ({ name, role, email, id }) {
            let teamRoleInfo;
            if (role === "Engineer") {
                teamRoleInfo = "Github username";
            } else if (role === "Intern") {
                teamRoleInfo = "school name";
            } else {
                teamRoleInfo = "Office Phone Number"
            }
            inquirer.prompt([
                {   type:"input",
                    message:`Team members ${teamRoleInfo}`,
                    name:"teamRoleInfo"

                },
                {
                    type:"list",
                    message: "Do you want to add another team member?",
                    choices:["yes","no" ],
                    name:"addMembers"
                }



            ])
            .then(function({teamRoleInfo,addMembers}){
                let newEmployee;
                if(role === "Intern"){

                    newEmployee = new Intern(name, id, email, teamRoleInfo);
                } else if(role === "Engineer"){
                    newEmployee = new Engineer(name,id,email,teamRoleInfo)
                } else{
                    newEmployee = new Manager(name,id,email, teamRoleInfo)
                }
                employee.push(newEmployee);
                addtoHTML(newEmployee)
                .then(function(){
                    if(addMembers === "yes"){
                        addteamMember();
                    } else{
                        endHtml();
                    }

                })


            })




        }




        )

}






function createHTML() {
    const html = `<!doctype html>
    <html lang="en">
      <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    
        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    
        <title>Team Profile</title>
      </head>
      <body>
        <h1 class="jumbotron Display-3 text-center" >Welcome to Employee DashBoard</h1>
        <div >
    
    
    `
    fs.writeFile("employee.html", html, function(err){
        if(err){
            throw err;
        }
        console.log("Your HTML FILE HAS BEEN GENERATED")
        
    })



}


function endHtml(){
    const end = `
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
  </body>
</html>
    
    `
    fs.appendFile("employee.html", end, function(err){
        if(err){
            throw err;
        }
        console.log("Your HTML FILE HAS BEEN Closed")

    })


}

function addtoHTML(team) {
    const name = team.getName();
    const email = team.getEmail();
    const id = team.getId();
    const role = team.getRole();
    let teamInfo = "";

    if (role === "Engineer") {
        const gitHub = member.getGithub();
        teamInfo = `<div class="col">
        <div class="card mx-auto mb-3">
        <ul class="list-group">
        <li class="list-group-item active">Engineer</li>
        <li class="list-group-item">ID:${id}</li>
        <li class="list-group-item">Github: ${gitHub}</li>
        <li class="list-group-item">Email: ${email}</li>
      </ul>
      </div> `

    } else if (role === "Manager") {
        const officeNumber = team.getofficeNumber();
        teamInfo = `
        <div class="col">
        <div class="card mx-auto mb-3">
        <ul class="list-group">
        <li class="list-group-item active">Manager</li>
        <li class="list-group-item">ID:${id}</li>
        <li class="list-group-item">Office Phone: ${officeNumber}</li>
        <li class="list-group-item">Email: ${email}</li>
      </ul>
      </div> 
        `
    } else {
        const school = team.getSchool();
        teamInfo = `
        <div class="col">
        <div class="card mx-auto mb-3">
        <ul class="list-group">
        <li class="list-group-item active">Manager</li>
        <li class="list-group-item">ID:${id}</li>
        <li class="list-group-item">Github: ${gitHub}</li>
        <li class="list-group-item"> School: ${school}</li>
        <li class="list-group-item">Email: ${email}</li>
      </ul>
      </div> 
        `


    }

    fs.appendFile("team.html", teamInfo, function (err) {
        if (err) {
            throw err;
        }
        console.log("successfully wrote to team.html");

    })













}

   








function init(){
    createHTML()
    addteamMember()
}
   



init();












// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
