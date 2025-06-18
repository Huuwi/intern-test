# INTERN_TEST <hr>

## 📌 Prerequirements

Before you begin, ensure you have the following installed:

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Git](https://git-scm.com/)

## 📚 Table of Contents

- [Introduction](#introduction)
- [Purpose](#purpose)
- [Installation and Run](#installation-and-run)
- [How it work](#how-it-work)
- [API Overview](#api-overview)
- [Technologies Used](#technologies-used)

## 🧾 Introduction

This project is a backend RESTful API designed as part of a backend internship. It focuses on core backend skills such as API design, authentication, error handling, database interaction, and deployment via Docker.

## 🎯 Purpose

The objective of this project is to demonstrate backend development proficiency, including:

- Understanding of REST principles
- Role-based authentication and secure login
- API design with clear structure and error handling
- Database modeling and interaction
- Containerization using Docker

## 🚀 Installation and Run

You can run this project using Docker. Follow these steps:

```bash
# Clone the repository
git clone https://github.com/Huuwi/intern-test
cd intern_test

# Start the service and watch log
docker-compose up -d ; docker logs -f backend

```

- Please wait 30s until all serivces is running

- Access : http://localhost:8001/api-docs to see all the api docs
### Note : Please wait 30s to ensure all the services is running 

## ⚙️ How it work

### About CI/CD : 
- I create a **Dockerfile** to build backend service
- I use **docker-compose** to combine **MySQL** service , **phpMyAdmin** service (to manual edit database) and **backend** service.
- I create a file **sql.init** (create table and insert some data) and put it into **/docker-entrypoint-initdb.d/**. (**docker-compose** will automaticaly run this file in first time to build)
### About RESTful backend : 
- I use **ExpressJs** to create a server backend
- Using **JWT** and **cookie-parser** to create middleware for authentication, authorization (have two roles are : admin and user)
- I use **MySQL database** and **Sequelize ORM**
- I use **swagger-ui-express** and **yamljs** to create api-docs using **.yaml** file
- I add a property to **Users table** name **isDelete** to implement **soft delete**


## 📡 API Overview
- I create **/api** path : include all apis **don't need login** to use (**/login**, **/resgiter**, **/logout**)
- I create **/api/user** path : include all apis for **normal user** (**/getInforOwn**, **/updateInforOwn**, **/deleteOwn**)

- I create **/api/user** path : include all apis for **admin** (**/getInforOwn**, **/updateInforOwn**, **/deleteOwn**)

You can see detail in : http://localhost:8001/api-docs (when run this project and wait 30s)

## Technologies Used
- Docker 
- MySQL , Sequelize(ORM)
- NodeJs (ExpressJs)
- JWT








