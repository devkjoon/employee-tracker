INSERT INTO departments (name)
VALUES ("Marketing"),
       ("Finance"),
       ("Operations Management"),
       ("Human Resources"),
       ("IT");
       
INSERT INTO roles (title, salary, department_id)
VALUES ("Chief Marketing Officer", 340779, 1),
       ("Marketing Coordinator", 48468, 1),
       ("Portfolio Manager", 106070, 2),
       ("Securities Trader", 103710, 2),
       ("Project Manager", 83786, 3),
       ("Operations Coordinator", 66771, 3),
       ("Talent Acquisition Manager", 125227, 4),
       ("Staff Coordinator", 42685, 4),
       ("Service Desk Analyst", 49947, 5),
       ("Network Manager", 97985, 5),
       
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Mary", "Smith", 1, NULL),
       ("John", "Johnson", 2, 1),
       ("Jane", "Williams", 2, 1),
       ("Elizabeth", "Jackson", 3, NULL),
       ("Joseph", "Brown", 4, 4),
       ("Daniel", "Harris", 4, 4),
       ("Henry", "Jones", 5, NULL),
       ("Nancy", "Thomas", 6, 7),
       ("Hannah", "Garcia", 6, 7),
       ("James", "Martin", 7, NULL),
       ("George", "Miller", 8, 10),
       ("Margaret", "Davis", 8, 10),
       ("Samuel", "Wilson", 9, NULL),
       ("Ann", "Anderson", 10, 13),
       ("David", "Moore", 10, 13)
      
       
       
       
       