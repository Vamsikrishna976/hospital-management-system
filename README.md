# 🏥 Hospital Management System

A full-stack Hospital Management System built using React, Node.js, Express, PostgreSQL, and Prisma ORM.

The application helps hospitals manage patients, OP records, appointments, consultations, prescriptions, medicines, and patient history efficiently.

---

## 🚀 Features

### 👤 Patient Management
- Register new patients
- Search existing patients using mobile number
- Auto-fetch patient details
- Unique Patient ID generation

### 📋 OP Record Management
- Generate OP records
- Unique OP Number generation
- Track patient visits

### 🩺 Complaint Management
- Record chief complaints
- Record symptoms
- Link complaints to OP records

### 👨‍⚕️ Doctor Management
- Add doctors
- Manage departments
- Assign doctors to appointments

### 📅 Appointment Management
- Create appointments
- Doctor assignment workflow
- Appointment status tracking

### 💊 Consultation Module
- Doctor consultation page
- Diagnosis entry
- Consultation notes
- Follow-up date management

### 📝 Prescription Management
- Create prescriptions
- View prescriptions
- Printable prescription format
- PDF export using browser print

### 💉 Medicine Management
- Add multiple medicines
- Dosage tracking
- Frequency tracking
- Duration tracking

### 📚 Patient History Module
- Search patient history by mobile number
- View complete consultation history
- View previous diagnoses
- View prescribed medicines
- View doctor details
- View complaints and symptoms

### 🔄 Repeat Prescription
- Repeat medicines from previous prescriptions
- Faster consultation workflow

---

## 🏗️ Tech Stack

### Frontend
- React
- TypeScript
- React Router
- Axios
- Tailwind CSS
- Vite

### Backend
- Node.js
- Express.js
- TypeScript

### Database
- PostgreSQL

### ORM
- Prisma ORM

### Version Control
- Git
- GitHub

---

## 📂 Project Structure

```bash
hospital-management-system
│
├── hms-frontend
│   ├── src
│   ├── pages
│   ├── routes
│   └── components
│
├── hms-backend
│   ├── src
│   ├── controllers
│   ├── routes
│   ├── services
│   └── prisma
│
└── README.md
```

---

## 📸 Modules Completed

✅ Patient Registration

✅ Patient Search

✅ OP Record Creation

✅ Complaint Management

✅ Doctor Management

✅ Appointment Assignment

✅ Consultation Module

✅ Prescription Module

✅ Medicine Module

✅ Patient History Module

✅ Repeat Prescription Module

---

## 🔜 Upcoming Modules

- Billing & Invoicing
- Lab Management
- Pharmacy Management
- Admission & Discharge
- Dashboard Analytics
- Role Based Authentication
- Email Notifications
- SMS Notifications
- Appointment Scheduling Calendar

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/hospital-management-system.git
```

### Backend Setup

```bash
cd hms-backend

npm install

npx prisma generate

npx prisma migrate dev

npm run dev
```

### Frontend Setup

```bash
cd hms-frontend

npm install

npm run dev
```

---

## 🌐 Environment Variables

Create `.env` file inside backend:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/hms"
PORT=5000
JWT_SECRET=your_secret_key
```

---

## 👨‍💻 Author

**Vamsi Krishna**

Frontend & Full Stack Developer

GitHub:
https://github.com/VamsiKrishna976

LinkedIn:
https://www.linkedin.com/in/vamsi-krishna-paluru/

---

## 📄 License

This project is developed for educational and portfolio purposes.