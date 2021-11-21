DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS deparments; 

CREATE TABLE departments (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(35) NOT NULL UNIQUE
);

CREATE TABLE role (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(35) NOT NULL,
    salary DECIMAL (10,2) NOT NULL,
    departments_id INTEGER
    CONSTRAINT fk_departments FOREIGN KEY (departments_id) REFERENCES deparments(id) ON DELETE SET NULL 
);

CREATE TABLE employees (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    CONSTRAINT fk_roles FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE SET NULL 
);