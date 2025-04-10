# ♟️ Chess Analyser App

A full-stack Chess web application built with **React**, **Express**, and **MongoDB** that allows users to:

- Log in securely
- Play chess with move validation
- View match history and worst move analysis
- Store match data dynamically in a database

---

## 🚀 Features

- ✅ Full chessboard UI with piece movement & logging  
- ✅ Login authentication (via MongoDB)  
- ✅ Dynamic match result storage and retrieval  
- ✅ Protected routes (auth-based routing)  
- ✅ Responsive design using Reactstrap  

---

## 📁 Project Structure

```
chess-analyser/
├── frontend/               # React app (Vite or CRA)
│   ├── src/
│   │   ├── components/     # Pages: LoginPage, Game, Chessboardd, etc.
│   │   ├── assets/         # Images: pieces, backgrounds
│   │   └── styles/         # CSS files
│   ├── .env                # VITE_API_URL config
│   └── package.json
│
├── backend/                # Node.js + Express API
│   ├── models/             # Mongoose schemas
│   ├── routes/             # Express routes (auth, match)
│   ├── .env                # MongoDB connection string
│   ├── seed.js             # Seeds initial users & matches
│   ├── server.js           # Entry point
│   └── package.json
```

---

## 🛠️ Local Development Setup

### ✅ Prerequisites

- Node.js (v18+ recommended)
- MongoDB (either [Atlas](https://www.mongodb.com/cloud/atlas) or local)
- Git

---

### 🧩 1. Clone the Repo

```bash
git clone https://github.com/ishan-surana/chess-analyser.git
cd chess-analyser
```

---

### 🖥️ 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```
MONGO_URI=mongodb://localhost:27017/chessapp
# OR for Atlas:
# MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/chessapp?retryWrites=true&w=majority
```

**Seed sample data (user + matches):**
```bash
npm run seed
```

**Start the server:**
```bash
node server.js
# or
npm start
```

---

### 🌐 3. Setup Frontend

```bash
cd ../frontend
npm install
```

**Start the frontend:**
```bash
npm run dev
```

Visit: [http://localhost:5173](http://localhost:5173)

---

## 🔐 Default Credentials

```
User ID:     220911270
Password:    Atharva
```

---

## 🧪 Available Routes

### Frontend Routes

| Path       | Description                    |
|------------|--------------------------------|
| `/`        | Login page                     |
| `/home`    | Landing page (after login)     |
| `/game`    | Select game mode (start/join)  |
| `/play`    | Interactive chessboard         |
| `/results` | Match history view             |

---

## ☁️ Deployment Notes

- Use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for a cloud DB.
- Host the frontend on **Vercel, Netlify, Firebase**, or any static host.
- Host the backend on **Render, Railway, Heroku, or VPS**.
- Ensure environment variables are set securely.

<!--- --- --->

<!--- ## 📜 License --->

<!--- This project is licensed under the MIT License. --->

---

## 🧠 Commands Summary

| Command                      | Description                            |
|-----------------------------|----------------------------------------|
| `npm install`               | Install dependencies                   |
| `npm run dev` (frontend)    | Start React dev server                 |
| `node server.js` (backend)  | Start backend API server               |
| `npm run seed` (backend)    | Seed database with sample data         |
