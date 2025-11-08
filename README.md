# ✅ MERN Todo Application  
A modern, full-featured **Todo Management App** built using the **MERN stack**, featuring authentication, task CRUD, filtering, sorting, pagination, and dark mode.

## 🚀 Live Demo  
https://todo-list-app-ten-lemon.vercel.app/

---

## ✅ Features

### 🔐 Authentication
- Register & Login
- Protected routes
- Cookie–based JWT authentication
- Auto-login on refresh

### ✅ Task Features
- Create, Read, Update, Delete tasks
- Search tasks
- Filter by status & priority
- Sort by date, priority, newest, oldest
- Pagination
- Mark task as completed
- Tag support

### 🎨 UI Features
- Modern responsive UI
- Smooth animations (Framer Motion)
- **Dark/Light Mode toggle**
- Fully mobile-friendly
- Clean dashboard layout

---

## 🛠 Tech Stack

### Frontend
- React 19
- React Router v7
- TailwindCSS v4
- Axios
- Lucide Icons
- Framer Motion

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication (HttpOnly Cookies)
- CORS, Cookie-Parser, dotenv

---
## ⚙️ Environment Variables

### **Backend (`/backend/.env`)**
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173

### **Frontend (`/frontend/.env`)**
VITE_API_URL=http://localhost:5000/api

## ▶️ How to Run Locally

### 1️⃣ Clone the repository

git clone https://github.com/your-username/mern-todo-app.git
cd mern-todo-app


2️⃣ Backend Setup

cd backend
npm install
npm run dev
Backend runs on:
http://localhost:5000

3️⃣ Frontend Setup

cd frontend
npm install
npm run dev


Frontend runs on:
http://localhost:5173


✅ API Endpoints (Summary)
Auth Routes
Method	Endpoint	Description
POST	/api/auth/register	Register user
POST	/api/auth/login	Login user
GET	/api/auth/me	Get logged-in user
POST	/api/auth/logout	Logout

Task Routes (Protected)
Method	Endpoint	Description
GET	/api/tasks	Get all tasks
POST	/api/tasks	Create task
PUT	/api/tasks/:id	Update task
DELETE	/api/tasks/:id	Delete task

📸 Screenshots (Add your own)
🔐 Authentication UI


✅ Dashboard

🌙 Dark Mode

⭐ Contribution
Pull requests are welcome!

📄 License
MIT License © 2025

❤️ Show Your Support
If this project helped you, give it a ⭐ star on GitHub!

yaml
Copy code

---

If you want, I can also generate:

✅ A project banner  
✅ A better screenshot layout  
✅ Version with emojis removed (more professional)  

Just say **“improve readme visuals”**.
