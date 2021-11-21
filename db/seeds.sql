INSERT INTO department (name)
VALUES 
    ('Finance')
    ('Sales')
    ('Legal')
    ('Enginerring')
    ('Marketing')

INSERT INTO role (title, salary, departments_id)
VALUES 
    ('Accountant', 60000, 1),
    ('Lead Accountant', 75000, 1),
    ('Sales Representative', 40000, 2),
    ('Lead Sales', 70000, 2),
    ('Lawyer', 100000, 3),
    ('Cousel', 30000, 5)

INSERT INTO employee (first_name, last_name, role_id, manager_id)
    ('Rancid', 'Ralph', 1, 4)
    ('Dell', 'Cato', 2, 6)
    ('Arnold', 'Palmer', 1, 4)
    ('Bryce', 'Knapp', 3, 7)
    ('Steve', 'Diego', 5, 8)