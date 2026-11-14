# 📋 TO-DO-LIST-APP - Full-Stack To-Do List Application

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.x-lightgrey.svg)](https://expressjs.com/)
[![React Native](https://img.shields.io/badge/React%20Native-0.74-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-v51-black.svg)](https://expo.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas%20%2F%20Local-green.svg)](https://www.mongodb.com/)

A modern, full-stack Task Management application featuring a responsive dark-themed UI built with **React Native / Expo** (supporting both Web and Mobile platforms) and powered by an **Express.js & MongoDB** REST API backend.

---

## ✨ Features

- **Full Task Lifecycle (CRUD)**: Create, view, toggle completion status, and delete tasks seamlessly.
- **Dynamic Filtering**: Filter tasks on-the-fly by **All**, **Active**, and **Completed**.
- **Modern Dark Theme**: Sleek UI designed with an eye-friendly palette (`#16161A` background, `#2A2D3E` cards, `#7F5AF0` accents, `#2CB67D` action buttons).
- **Cross-Platform Compatibility**: Runs effortlessly in desktop web browsers via React Native Web and on mobile devices via Expo Go.
- **Robust REST API**: Built on Express.js with Mongoose schemas and strict request validation.
- **Secure Architecture**: Sensitive database credentials isolated via `.env` with a provided `.env.example` template.

---

## 📁 Project Structure

```text
TO DO LIST 2/
├── backend/
│   ├── models/
│   │   └── Todo.js             # Mongoose schema for task documents
│   ├── routes/
│   │   └── todos.js            # Express REST API routes for /api/todos
│   ├── .env.example            # Environment variables template
│   ├── index.js                # Server entry point & DB connection
│   └── package.json            # Backend dependencies & scripts
│
├── mobile/
│   ├── src/
│   │   ├── components/
│   │   │   └── TaskItem.js     # Task card component with toggle & delete
│   │   ├── pages/
│   │   │   ├── Home.js         # Main task list screen with filters
│   │   │   └── AddTask.js      # Modal form to create new tasks
│   │   └── api.js              # Axios HTTP client configuration
│   ├── App.js                  # Navigation container & stack navigator
│   ├── app.json                # Expo application configuration
│   └── package.json            # Mobile dependencies & scripts
│
├── .gitignore                  # Git ignore rules (node_modules, .env, .expo)
├── LICENSE                     # MIT License
└── README.md                   # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v18.x or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (Local Community Server or a free MongoDB Atlas cloud cluster)
- *(Optional)* [Expo Go](https://expo.dev/go) app on your iOS/Android phone for mobile testing

---

### 1. Backend Setup

1. Open your terminal and navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Create your environment configuration:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - In `.env`, configure your port and MongoDB connection URI:
     ```env
     PORT=5000
     MONGODB_URI=mongodb://localhost:27017/todolist
     ```
     *(Or your MongoDB Atlas cluster connection string)*

4. Start the backend server:
   ```bash
   npm start
   ```
   The backend will run on **http://localhost:5000** and output:
   ```text
   Server is running on http://localhost:5000
   ✅ Successfully connected to MongoDB!
   ```

---

### 2. Mobile / Web Frontend Setup

1. Open a new terminal tab and navigate to the `mobile` directory:
   ```bash
   cd mobile
   ```

2. Install mobile dependencies:
   ```bash
   npm install
   ```

3. **Running in Web Browser**:
   ```bash
   npm run web
   ```
   This compiles the React Native app for the web and opens it in your default browser at `http://localhost:8081`.

4. **Running on Physical Mobile Device**:
   - In `mobile/src/api.js`, set `DEV_MACHINE_IP` to your computer's local Wi-Fi IP address (found via `ipconfig` on Windows or `ifconfig` on macOS/Linux).
   - Ensure your phone and computer are on the same Wi-Fi network.
   - Start Expo:
     ```bash
     npm start
     ```
   - Scan the displayed QR code using the **Expo Go** app on your phone.

---

## 📡 API Reference

Base URL: `http://localhost:5000/api/todos`

| Method | Endpoint | Description | Request Body | Response |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/api/todos` | Retrieve all tasks sorted by date | None | `Array<Todo>` |
| **GET** | `/api/todos/:id` | Retrieve a single task by ID | None | `Todo` object |
| **POST** | `/api/todos` | Create a new task | `{ "title": "string", "description": "string" }` | `201 Created` |
| **PATCH** | `/api/todos/:id` | Update an existing task | `{ "completed": true, "title": "..." }` | `200 OK` |
| **DELETE**| `/api/todos/:id` | Delete a task by ID | None | `{ "message": "Deleted Todo" }` |

### Task Model Schema

```json
{
  "_id": "6735a2b...",
  "title": "Finish Version Control Assignment",
  "description": "Upload To-Do List project to public GitHub repository",
  "completed": false,
  "createdAt": "2026-11-14T14:00:00.000Z",
  "updatedAt": "2026-11-14T14:00:00.000Z"
}
```

---

## 🛡️ Security & Privacy

- All environment variables and database credentials are stored in `.env` files that are strictly excluded from version control via `.gitignore`.
- Pre-configured `.env.example` provides clean guidance for developers without exposing real credentials.
- Input validation on the Express router ensures required task titles are supplied.

---

## 📄 License

This project is open-source and licensed under the [MIT License](LICENSE).
