#  Student Exams Management System

A **Node.js + Express + MongoDB + TypeScript** based application for managing **student exams, authentication, and exam results**.  
This system allows administrators to create exams, assign them to students, and upload results, while students can register, log in, and view their exam details and scores.

---

##  Features

-  **User Authentication** (Students & Admins)
  - Secure login/logout using JWT
  - Passwords hashed with bcryptjs
-  **Exam Management**
  - Create, update, and delete exams (Admin only)
-  **Student Management**
  - Register new students
  - Manage student profiles
-  **Exam Results**
  - Students can view their results
  - Admins can upload scores
-  **Secure Cookies & Sessions** using `cookie-parser`
-  **EJS Templates** for rendering views (login, dashboard, exams, results)

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js, TypeScript
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT + bcryptjs
- **Templating Engine**: EJS
- **Dev Tools**: ts-node, TypeScript typings


---

## ⚙️ Installation & Setup

###  Clone the repository
```bash
git clone https://github.com/your-username/student-exams-system.git
cd student-exams-system
```
```
npm install
```
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/student_exams
JWT_SECRET=your-secret-key
```
```
npm run dev
```


