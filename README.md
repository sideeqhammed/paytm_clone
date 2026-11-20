# PayApp — A Basic Paytm Clone

A simplified digital wallet application inspired by Paytm. Users can sign up, sign in, view their balance, search for other users, and transfer money to them. The project contains both a **React frontend** and an **Express + MongoDB backend**

## Features

**Authentication**
- User registration and login with email and password
- Passwords hashed with bcrypt
- Stateless sessions using JSON Web Tokens (JWT)
- Protected routes on both the frontend and the backend

**Wallet**
- A wallet is created automatically with a starting balance on signup
- View current balance on the dashboard
- Update profile details (first name, last name, password)

**Payments**
- Search for other users by name
- Send money to another user
- Atomic transfers: either both balances update or neither does
- Prevents overdrafts and self-transfers
- Transaction history for sent and received payments

**Frontend**
- Responsive UI built with React and Tailwind CSS
- Client-side form validation
- Loading, success, and error states for every action

## Tech Stack

| Layer      | Technology                                                   |
| ---------- | ------------------------------------------------------------ |
| Frontend   | React, TypeScript, Vite, Tailwind CSS, React Router, Axios   |
| Backend    | Node.js, Express, TypeScript                                 |
| Database   | MongoDB                                                      |
| ODM        | Mongoose                                                     |
| Auth       | JSON Web Tokens (`jsonwebtoken`), `bcrypt`                   |
| Validation | Zod                                                          |
| Tooling    | Docker Compose, ESLint, Prettier                             |

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later (npm v8+ is bundled with it)
- [Docker](https://www.docker.com/) and Docker Compose (for the local database), **or** a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/payapp.git
cd payapp
```

### 2. Install dependencies

Run once from the repository root. npm workspaces installs the backend and frontend dependencies together.

```bash
npm install
```

### 3. Start MongoDB

```bash
docker compose up -d
```

The healthcheck initialises the single-node replica set automatically on first run. If you use MongoDB Atlas instead, skip this step and use your Atlas connection string in the next one.

### 4. Set up and run the backend

```bash
cd backend
npm install
cp .env.example .env      # then edit the values
npm run dev
```

The API runs at **http://localhost:3000**.

### 5. Set up and run the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

The app runs at **http://localhost:5173**. Open it in your browser.
