-- User details
DROP TABLE users;

CREATE TABLE users (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    emp_code INT NOT NULL UNIQUE,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL UNIQUE,
    joining_date DATE NOT NULL,
    location_name VARCHAR(150)  NOT NULL,
    dept_name VARCHAR(150) NOT NULL,
    role_name VARCHAR(150) NOT NULL,
    shift_time VARCHAR(100) NOT NULL,
    gender VARCHAR(20) CHECK (gender IN ('MALE', 'FEMALE', 'OTHERS')),
    dob DATE NOT NULL,
    marital_status VARCHAR(20) CHECK (marital_status IN ('MARRIED', 'UNMARRIED')),
	created_date DATETIME2 NOT NULL,
    modified_date DATETIME2 NOT NULL
);

SELECT * FROM users ORDER BY id ASC;

TRUNCATE TABLE users;


-- Login details
DROP TABLE login_details;

CREATE TABLE login_details (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        user_id BIGINT NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(100) NOT NULL,
		FOREIGN KEY (user_id) REFERENCES users(id)
);

SELECT * FROM login_details ORDER BY id ASC;

TRUNCATE TABLE login_details;