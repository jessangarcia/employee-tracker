INSERT INTO department(department_name)
VALUES("Finance"), ("Sales"), ("Legal"), ("Enginerring"), ("Marketing");

INSERT INTO roles(title, salary, department_id)
VALUES("Accountant", 60000, 1), ("Lead Accountant", 75000, 1), ("Sales Representative", 40000, 2), ("Lead Sales", 70000, 2), ("Lawyer", 100000, 3), ("Cousel", 30000, 5);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('Rancid', 'Ralph', 1, 2), ('Dell', 'Cato', 1, null), ('Arnold', 'Palmer', 1, 2), ('Bryce', 'Knapp', 2, 2), ('Steve', 'Diego', 4, null);
