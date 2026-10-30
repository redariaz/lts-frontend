-- Shift Details
CREATE TABLE shift (
        shift_id BIGINT IDENTITY(1,1) PRIMARY KEY,
        shift_name VARCHAR(50) NOT NULL UNIQUE,
		shift_time VARCHAR(50) NOT NULL UNIQUE
    );

SELECT * FROM shift ORDER BY shift_id ASC

INSERT INTO dbo.shift (shift_name, shift_time)
VALUES
	('Morning Shift', '09:00-18:00 (IST)'),
	('Afternoon Shift', '12:00-21:00 (IST)'),
	('Evening Shift', '15:00-00:00 (IST)'),
	('Late Evening Shift', '18:00-03:00 (IST)'),
	('Night Shift', '21:00-06:00 (IST)')
GO

-- Department details
CREATE TABLE department (
        dept_id BIGINT IDENTITY(1,1) PRIMARY KEY,
        dept_name VARCHAR(100) NOT NULL UNIQUE
    );

SELECT * FROM department ORDER BY dept_id ASC ;

INSERT INTO dbo.department (dept_name)
VALUES
	('IT'),
	('HR'),
	('Finance'),
	('Engineering'),
	('Marketing'),
	('Sales'),
	('Operations'),
	('Research & Development'),
	('Quality Assurance'),
	('Administration')
GO

-- Roles details
CREATE TABLE roles (
    role_id BIGINT IDENTITY(1,1) PRIMARY KEY,
    role_name VARCHAR(100) NOT NULL,
    dept_id BIGINT NOT NULL,
    FOREIGN KEY (dept_id) REFERENCES department(dept_id)
);

SELECT * FROM roles ORDER BY role_id ASC;

INSERT INTO dbo.roles (role_name, dept_id)
VALUES
	('Software Developer', 1),
	('Software Tester', 1),
	('Technical Lead', 1),
	('DevOps Engineer', 1),
	('HR Executive', 2),
	('HR Manager', 2),
	('Recruiter', 2),
	('Payroll Specialist', 2),
	('HR Business Partner', 2),
	('Accountant', 3),
	('Financial Analyst', 3),
	('Finance Manager', 3),
	('Auditor', 3),
	('Accounts Executive', 3),
	('Design Engineer', 4),
	('Senior Engineer', 4),
	('Project Manager', 4),
	('Project Engineer', 4),
	('Marketing Executive', 5),
	('Marketing Manager', 5),
	('Digital Marketing Specialist', 5),
	('SEO Analyst', 5),
	('Sales Executive', 6),
	('Sales Manager', 6),
	('Business Development Executive', 6),
	('Account Manager', 6),
	('Operations Executive', 7),
	('Operations Manager', 7),
	('Operations Analyst', 7),
	('Process Coordinator', 7),
	('Research Engineer', 8),
	('Research	Scientist', 8),
	('R&D Manager', 8),
	('Product Development Engineer', 8),
	('QA Engineer', 9),
	('Senior QA Engineer', 9),
	('QA Lead', 9),
	('QA Manager', 9),
	('Administrative Executive', 10),
	('Office Manager', 10),
	('Facilities Manager', 10),
	('Administrative Assistant', 10)
GO

-- Location details
CREATE TABLE location (
        loc_id BIGINT IDENTITY(1,1) PRIMARY KEY,
        location_name VARCHAR(100) NOT NULL UNIQUE
    );

SELECT * FROM location ORDER BY loc_id ASC

INSERT INTO dbo.location (location_name)
VALUES
	('Bangalore'),
	('Noida'),
	('Pune'),
	('Chennai'),
	('Hyderabad')
GO