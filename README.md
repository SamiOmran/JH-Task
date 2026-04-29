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

---

# How To Run The Application

## Backend

Steps:

```bash
cd server
npm install
```

### Create .env file

Run:

```bash
cp .env.example .en
```

### Start Backend Server

Run:

```bash
npm run server
```

Backend will run on:

```text
http://localhost:5000
```

---

## Frontend

Open another terminal and run:

```bash
cd client
npm install
npm run server
```

Frontend will run on:

```text
http://localhost:5173
```

---

# Notes

- Make sure `.env` file exists inside the `server/` directory.
- Set MONGO_URI
