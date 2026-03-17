# 🏨 Hotel Management System (Backend)

## 📌 Introduction

This project is a backend API for managing a hotel system, including rooms, bookings, customers, users, and payments.

It is built using **Node.js** and follows a layered architecture:

> Controller → Service → Repository → Model

---

## 🚀 Features

* 🔐 User Authentication (Register, Login with JWT)
* 🏨 Room Management (Create, Update, Get Rooms)
* 📅 Booking Management
* 👤 Customer Management
* 💳 Payment Handling
* 🧩 Clean architecture with DTO & Repository pattern
* 🔄 Transaction handling (e.g., Register user with multiple tables)

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MySQL
* Sequelize ORM
* JWT (Authentication)
* bcrypt (Password hashing)

---

## 📁 Project Structure

```
src/
 ├── controllers/    # Handle HTTP requests
 ├── services/       # Business logic
 ├── repositories/   # Database queries
 ├── dtos/           # Data mapping (DTO)
 ├── models/         # Sequelize models
 ├── middlewares/    # Error handling, auth
 ├── utils/          # Helper functions
```

---

## ⚙️ Setup & Run

### 1. Clone project

```
git clone <your-repo-url>
cd <project-folder>
```

### 2. Install dependencies

```
npm install
```

### 3. Configure environment

Create `.env` file:

```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=hotel_db
JWT_SECRET=your_secret_key
```

### 4. Run server

```
npm start
```

---

## 🔑 API Endpoints

### 🔐 Auth

* `POST /auth/register` → Register new user
* `POST /auth/login` → Login

### 🏨 Rooms

* `GET /rooms` → Get all rooms
* `POST /rooms` → Create room
* `PUT /rooms/:id` → Update room

### 📅 Bookings

* `POST /bookings` → Create booking
* `GET /bookings` → Get bookings

---

## 🧠 Architecture

This project uses a layered architecture:

* **Controller**: Handle request/response
* **Service**: Business logic
* **Repository**: Database interaction
* **DTO**: Map data between client and database

---

## 🔄 Example Flow

```
Client → Controller → Service → DTO → Repository → Database
```

---

## 💡 Notes

* Passwords are hashed using bcrypt
* JWT is used for authentication
* Transactions are used for multi-table operations (e.g., register user + customer)

---

## 📌 Future Improvements

* Add validation using Joi/Zod
* Implement role-based authorization
* Add pagination & filtering
* Integrate Swagger API documentation

---

## 👨‍💻 Author

* Backend Developer (Node.js, Express, MySQL)
* Focus on clean architecture and scalable design

---
