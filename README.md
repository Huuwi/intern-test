# INTERN_TEST <hr>

## 📌 Prerequirements

Before you begin, ensure you have the following installed:

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Git](https://git-scm.com/)

## 📚 Table of Contents

- [Introduction](#introduction)
- [Feature ](#🎯-feature)
- [Installation and Run](#installation-and-run)
- [How it work](#how-it-work)
- [API Overview](#api-overview)
- [Technologies Used](#technologies-used)

## Introduction

This project is a backend RESTful API designed as part of a backend internship. It focuses on core backend skills such as API design, authentication, error handling, database interaction, and deployment via Docker.

## 🎯 Feature

The objective of this project is to demonstrate backend development proficiency, including:

- Understanding of REST principles
- Role-based authentication and secure login
- API design with clear structure and error handling
- Database modeling and interaction
- Containerization using Docker

## Installation and Run

You can run this project using Docker. Follow these steps:

```bash
# Clone the repository
git clone https://github.com/Huuwi/intern-test
cd intern_test

# Start the service and watch log
docker-compose up -d ; docker logs -f backend

```

- Please wait 30 seconds until all services are running.

- Access: http://localhost:8001/api-docs to view the API documentation.
### Note : Make sure to wait 30 seconds to ensure all services are fully initialized, services is running 
## How it work
### CI/CD Setup : 
- A **Dockerfile** is created to build the backend service.
- **docker-compose** is used to orchestrate the **MySQL**, **phpMyAdmin** (for manual database editing), and **backend** services.
- A file named **init.sql** (for creating tables and inserting sample data) is placed in /docker-entrypoint-initdb.d/.
> This file is automatically executed the first time Docker builds the services.
### Backend RESTful API : 
- Built with **Express.js** for the backend server.
- Uses **JWT** and **cookie-parser** middleware for authentication and authorization (supports two roles: **admin** and **user**).
- Data is stored in a **MySQL** database using **Sequelize ORM**.
- **API documentation** is provided using **swagger-ui-express** and **yamljs** with .**yaml** configuration.
- A **soft delete** mechanism is implemented by adding an **isDelete** field to the **Users** table.


## API Overview
- **/api** – Public routes (do not require login)
>/login, /register, /logout
- **/api/user** – Routes for normal users:
>/getInforOwn, /updateInforOwn, /deleteOwn

- **/api/admin** – Routes for admin users:
> /getAllUser, /updateUserById, /deleteUserById

> 📘 Visit http://localhost:8001/api-docs after starting the project (and waiting 30 seconds) to explore the full API documentation.
## Technologies Used
🐳 **Docker** – Containerization for consistent environment setup

🐬 **MySQL** – Relational database

🔗 **Sequelize (ORM)** – Simplified database interaction

⚙️ **Node.js (Express.js)** – Server-side JavaScript and web framework

🔐 **JWT (JSON Web Token)** – Authentication & authorization

🍪 **cookie-parser** – Middleware to parse cookies

🧾 **swagger-ui-express** + **YAMLJS** – **API documentation** via **docs.yaml**

🖥️ **phpMyAdmin** – Web-based GUI for managing MySQL (You can access : http://localhost:8080 to manage MySQL after project already running)

🗑️ **Soft Delete** – Implemented using an isDelete field in the user model


