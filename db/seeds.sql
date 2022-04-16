INSERT INTO departments (title)
VALUES 
('Web Development'),
('Bakery'),
('Concert Master'),
('Finance'),
('Marketing')
;

INSERT INTO roles (title, salary, department_id)
VALUES
('Web Developer', 30000000, 1),
('Baker', 30000, 2),
('Violinist', 90000000, 3),
('Teller', 300, 4),
('Marketer', 30000000, 5)
;

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Lonny', 'Vandenberg', 1, 1);