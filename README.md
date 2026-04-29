# README.md

# Full Stack Task Management Application

A simple full-stack web application built using:

- React + Vite (Frontend)
- Node.js + Express (Backend)

---

# Project Structure

```text
project/
│
├── client/     # React frontend
├── server/     # Node.js backend
└── Makefile
```

---

# Requirements

Make sure you have installed:

- Node.js
- npm
- make

---

# How To Run The Application

## 1. Install Dependencies

Run:

```bash
make install
```

---

## 2. Create .env file

Run:

```bash
make env
```

---

## 2. Start Backend Server

Run:

```bash
make server
```

Backend will run on:

```text
http://localhost:5000
```

---

## 3. Start Frontend Client

Open another terminal and run:

```bash
make client
```

Frontend will run on:

```text
http://localhost:5173
```

---

# Available Make Commands

| Command        | Description                               |
| -------------- | ----------------------------------------- |
| `make install` | Install frontend and backend dependencies |
| `make server`  | Run backend server                        |
| `make client`  | Run frontend client                       |
| `make env`     | Create .env file                          |

---

# Notes

- Make sure `.env` file exists inside the `server/` directory.
- Set MONGO_URI
