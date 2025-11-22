# Wellness & Preventive Care Portal (MVP)

# Deployment Link : https://hcltech-hackathon.vercel.app/login

## 🏥 Brief Description of MVP
We are building a **Healthcare Wellness and Preventive Care Portal**. The main goal of this project is to shift the focus from "treating sickness" to "maintaining health." 

For this 5-hour MVP, we are creating a secure platform where patients can log in, view their personalized health goals (like daily steps or water intake), and see upcoming preventive checkup reminders. We are prioritizing **data privacy**, **ease of use**, and **responsive design** so it works well on all devices.

---

## 🛠️ Our Tech Stack
We are using a standard MERN stack with a focus on speed and security.

**Frontend:**
* **React.js:** For building the user interface.
* **Tailwind CSS:** For fast, responsive styling.
* **Axios:** To connect the frontend to our backend.

**Backend:**
* **Node.js & Express.js:** To handle API requests and server logic.
* **Security Libraries:** `bcrypt` (for password hashing), `jsonwebtoken` (for secure login sessions), `helmet` (for header security).

**Database:**
* **MongoDB:** To store user profiles and health records flexibly.

**Deployment (Planned):**
* **Backend:** Google Cloud Platform (GCP) Cloud Run.
* **Frontend:** Vercel.

---

## 🧩 System Architecture & Data Flow
This is the high-level design of how our components talk to each other:

1.  **Client Layer (React):** The user interacts with the UI. Input is validated here first (e.g., making sure email format is correct).
2.  **API Layer (Express/Node):** Receives requests. Middleware checks if the user is authorized (logged in).
3.  **Service Layer:** Process the logic (e.g., calculating if a health goal is met).
4.  **Data Layer (MongoDB):** securely retrieves or saves the data.

**Data Flow Model:**
`User` ⮕ `React UI` ⮕ `Secure API Endpoint` ⮕ `Controller Logic` ⮕ `Database`

---

## 🚀 Features to Implement
We are focusing on these core features to meet the 5-hour deadline:

### 1. Authentication & Security (High Priority)
* User Registration and Login.
* Password hashing (we never store raw passwords).
* JWT Tokens to keep the session secure.

### 2. Patient Profile Management
* Ability to update basic details (Age, Blood Group, History).
* Simple dashboard view.

### 3. Wellness Dashboard (The Core Feature)
* **Preventive Goals:** A checklist of daily health tasks (e.g., "Exercise for 30 mins").
* **Checkup Reminders:** A section showing when the next doctor visit is due.

### 4. Responsive UI
* A clean interface that looks good on mobile and desktop.

---

## ⏱️ Project Implementation Timeline (5 Hours)

**Hour 1: Design & Setup**
* Finalize database schema (User, Goals, Appointments).
* Setup Project Repo (Frontend + Backend).
* Connect to MongoDB Atlas.

**Hour 2: Backend Core**
* Setup Express server.
* Build Auth APIs (Signup/Login).
* Build User Profile APIs (Get/Update data).

**Hour 3: Frontend Setup & Auth**
* Setup React Router.
* Create Login/Signup screens.
* Connect Frontend to Backend Auth.

**Hour 4: Dashboard & Features**
* Build the Main Dashboard component.
* Display Health Goals and Checkups dynamically.
* Ensure the UI is responsive.

**Hour 5: Testing, Polish & Deployment**
* Fix bugs.
* Deploy Backend to GCP.
* Deploy Frontend to Vercel.
* Final run-through of the user flow.

---

## 🔒 Security & Compliance Note
Since this is a healthcare app, we are adhering to basic best practices:
1.  **Data Privacy:** All sensitive user data is isolated.
2.  **Encryption:** Passwords are hashed using bcrypt.
3.  **Sanitization:** Inputs are checked to prevent injection attacks.
