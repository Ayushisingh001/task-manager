Task Manager:
A simple Task Manager application with JWT authentication and role-based access control.
Built with Node.js, Express, MySQL/Sequelize, and a simple React frontend.

Features

User authentication with JWT

Role-based access:
Admin can manage all tasks and users
User can manage only their own tasks
CRUD operations for tasks: Create, Read, Update, Delete
Simple React frontend for interaction

Tech Stack:
Backend: Node.js, Express, Sequelize, MySQL
Frontend: React (Vite)
Authentication: JWT
Password Hashing: bcryptjs
Validation: express-validator

Default Login Info
Admin
Email: admin@example.com
Password: AdminPassword123
Role: admin

User
Email: ayushi24@gmail.com
Password: pw123456
Role: user

Admin can see all tasks, users can manage only their tasks.
