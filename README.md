# Employee Summary

The challenge is to build a Node CLI that takes in information about employees and generates an HTML webpage that displays summaries for each person. 

## Employee Dashboard Generator Video

[![site gif]({https://github.com/Jules-Boogie/readme-generator/blob/master/Develop/Capture.PNG})]({https://github.com/Jules-Boogie/readme-generator/blob/master/Develop/bandicam%202020-04-11%2017-14-26-539.mp4} "Readme")




## Employee Dashboard Generator Preview PIC

![Site Photo](https://github.com/Jules-Boogie/readme-generator/blob/master/Develop/Capture.PNG)






## Technologies Used
[ES6-JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)  


[Nodejs](https://nodejs.org/en/docs/)


[Inquirer](https://www.npmjs.com/package/inquirer/v/0.2.3)





## Code Snippet
```
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
```

## Author Links

**Author:**
Juliet George

**Contact:**
[LinkedIn](https://www.linkedin.com/in/juliet-george-864950b8/)
