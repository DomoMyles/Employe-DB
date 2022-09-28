// installed requirements
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require("console.table"); 
const server = require('./db/connection');
const { callbackify } = require('util');




// connects to mysql database
server.connect(function (err) {
  if (err) throw err;
  console.log('Server Connected');

  // add the function that starts that communicates with mysql
  log()
});


function log() {
  inquirer.prompt([
    {
      type: "list",
      name: "command",
      message: 'Select an option below.',
      choices: ["View", "Insert", "Update"]
    },
  ])
    .then((res) => {
      console.log(res)
      if (res.command === 'View') {
        console.log("picked View")
        display()

      } else if (res.command === 'Insert') {
        console.log("picked View")
        addToDepartment()

      } else if (res.command === 'Update') {
        console.log("picked update")
        selectRole()
      }
    })

}

function addToDepartment() {
  inquirer.prompt([{
    type: "input",
    name: "deptname",
    message: ["View", "Insert", "Update"]
  }]
  )
    .then(function (word) {
      server.query(`INSERT INTO department (name) VALUES ('${word.deptname}')`, function (err) {
        if (err) throw err
        console.log("added to dept")
        log()
      })
    })
    
}

function selectRole() {
  inquirer.prompt([{
    type: "list",
    name: "role",
    message: 'Select role',
    choices: ['This', 'That', 'One', 'Two']
  }])
  .then(function selectedRole(list) {
    server.query(`SELECT ${list.role}`)
  })
};

function display() {
  server.query('SELECT * FROM company_db.department', function (err, results) {
    
    if (err) throw err
    console.log(results)
  })

}