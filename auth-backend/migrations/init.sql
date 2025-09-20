--@block
USE authdb;

--@block
SHOW TABLES;

--@block
DROP TABLE IF EXISTS users;

--@block
CREATE TABLE IF NOT EXISTS schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  code VARCHAR(50) UNIQUE,
  timezone VARCHAR(64) DEFAULT 'Asia/Colombo',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS teachers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  auth_provider VARCHAR(50),
  auth_uid VARCHAR(255),
  email VARCHAR(255),
  name VARCHAR(200),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (auth_provider, auth_uid)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS teacher_school (
  teacher_id INT NOT NULL,
  school_id INT NOT NULL,
  role ENUM('teacher','admin') DEFAULT 'teacher',
  PRIMARY KEY (teacher_id, school_id),
  FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE CASCADE,
  FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nic VARCHAR(50) NOT NULL,
  name VARCHAR(200) NOT NULL,
  phone VARCHAR(50),
  dob DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (nic)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS student_school (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  school_id INT NOT NULL,
  roll_no VARCHAR(50),
  class_name VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(student_id, school_id),
  INDEX (school_id),
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS attendance (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  student_school_id INT NOT NULL,
  date DATE NOT NULL,
  status ENUM('present','absent','late') DEFAULT 'present',
  marked_by INT,
  marked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_school_id) REFERENCES student_school(id) ON DELETE CASCADE,
  FOREIGN KEY (marked_by) REFERENCES teachers(id),
  UNIQUE (student_school_id, date),
  INDEX (date),
  INDEX (status)
) ENGINE=InnoDB;

-- Seed minimal data
INSERT INTO schools (name, code) VALUES ('St. Alpha', 'STA001'), ('Central High', 'CH001') 
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO teachers (auth_provider, auth_uid, email, name)
VALUES ('local','teacher_local_1','teacher1@example.com','Mr Alpha')
ON DUPLICATE KEY UPDATE email = VALUES(email);

-- Link teacher to school (use teacher_id=1, school_id=1 for seeded)
INSERT IGNORE INTO teacher_school (teacher_id, school_id, role) VALUES (1, 1, 'teacher');


--@block
SELECT * FROM teachers;

--@block
CREATE TABLE teachers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL, -- bcrypt hashed
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--@block
ALTER TABLE teachers
DROP COLUMN auth_provider,
DROP COLUMN auth_uid,
ADD COLUMN password VARCHAR(255) NOT NULL AFTER email;

--@block
DESCRIBE schools;

--@block
ALTER TABLE schools
DROP COLUMN code,
DROP COLUMN timezone,
ADD COLUMN location VARCHAR(150) AFTER name;

--@block
SELECT * FROM students;

--@block
ALTER TABLE teacher_school
DROP COLUMN role;

--@block
ALTER TABLE teacher_school
ADD COLUMN id INT AUTO_INCREMENT,
DROP PRIMARY KEY,
ADD PRIMARY KEY (id),
ADD UNIQUE KEY unique_teacher_school (teacher_id, school_id);

--@block
ALTER TABLE teacher_school
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP AFTER school_id;

--@block
ALTER TABLE schools
RENAME COLUMN id TO school_id;

--@block
ALTER TABLE students
DROP COLUMN dob,
ADD COLUMN school_id INT NOT NULL AFTER id,
ADD FOREIGN KEY (school_id) REFERENCES schools(school_id) ON DELETE CASCADE;

--@block
DESCRIBE students;
