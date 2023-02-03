INSERT INTO departments (name)
VALUES ("HR"),
       ("Accounting"),
       ("Legal"),
       ("Operations"),
       ("Tech");

INSERT INTO roles (title, salary, departments_id)
VALUES ("Director", 120000.00, 1),
       ("Risk manager", 120000.00, 2),
       ("Corporate attorney", 120000.00, 3),
       ("team member", 120000.00, 4),
       ("Developer", 120000.00, 5);
     
INSERT INTO employees (first_name, last_name, manager_id, roles_id)
VALUES ("john","komisnky", 1, 1),
       ("Stewar","Fernandez", 1, 2),
       ("Laura","Berch", 1, 3),
       ("Joe","Smith", 1, 4),
       ("Steven","Puck", 1, 5);
       
