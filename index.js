const mysql = require('mysql2');
const inquirer = require('inquirer');


const connection = mysql.createConnection({
    host: 'localhost',  
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employees_db'
})

connection.connect(function(err) {
    if (err) throw err;
})


function init() {
    inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit'
        ]
    })
  .then(function(answer) {
    if(answer.action === 'View all departments') {
        viewDepartments();
    } else if(answer.action === 'View all roles') {
        viewRoles();
    } else if(answer.action === 'View all employees') {
        viewEmployees();
    } else if(answer.action === 'Add a department') {
        addDepartment();
    } else if(answer.action === 'Add a role') {
        addRole();
    } else if(answer.action === 'Add an employee') {
        addEmployee();
    } else if(answer.action === 'Update an employee role') {
        updateEmployeeRole();
    } else if(answer.action === 'Exit') {
        connection.end();
    }
  })
}

function viewDepartments() {
    connection.query('SELECT * FROM departments', function(err, res) {
        if (err) throw err;
        console.table(res);
        init();
    })
}

function viewRoles() {
    connection.query('SELECT * FROM roles', function(err, res) {
        if (err) throw err;
        console.table(res);
        init();
    })
}

function viewEmployees() {
    connection.query('SELECT * FROM employees', function(err, res) {
        if (err) throw err;
        console.table(res);
        init();
    })
}

function addDepartment() {
    inquirer.prompt([
        {
            name: 'department',
            type: 'input',
            message: 'What is the name of the department you would like to add?'
        }
    ]).then(function(answer) {
        connection.query('INSERT INTO departments SET?', {
            name: answer.department
        }, function(err, res) {
            if (err) throw err;
            console.table(res);
            init();
        })
    })
}

function addRole() {
    inquirer.prompt([
        {
            name: 'title',
            type: 'input',
            message: 'What is the title of the role you would like to add?'
        },
        {
            name:'salary',
            type: 'input',
            message: 'What is the salary of the role you would like to add?'
        },
        {
            name: 'departments_id',
            type: 'input',
            message: 'What is the department ID of the role you would like to add?'
        }
    ]).then(function(answer) {
        connection.query('INSERT INTO roles SET?', {
            title: answer.title,
            salary: answer.salary,
            departments_id: answer.departments_id
        }, function(err, res) {
            if (err) throw err;
            console.table(res);
            init();
        })
    })
}

function addEmployee() {
    inquirer.prompt([
        {
            name: 'first_name',
            type: 'input',
            message: 'What is the first name of the employee you would like to add?'
        },
        {
            name: 'last_name',
            type: 'input',
            message: 'What is the last name of the employee you would like to add?'
        },
        {
            name: 'role_id',
            type: 'input',
            message: 'What is the role ID of the employee you would like to add?'
        },
        {
            name:'manager_id',
            type: 'input',
            message: 'What is the manager ID of the employee you would like to add?'
        }
    ]).then(function(answer) {
        connection.query('INSERT INTO employees SET?', {
            first_name: answer.first_name,
            last_name: answer.last_name,
            roles_id: answer.role_id,
            manager_id: answer.manager_id
        }, function(err, res) {
            if (err) throw err;
            console.table(res);
            init();
        })
    })
}

init();