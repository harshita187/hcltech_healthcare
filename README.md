# 🚀 Execution Plan & Timeline: 5-Hour MVP
**Project:** Healthcare Wellness Portal
**Stack:** React + Node/Express + MongoDB + GCP/Vercel

---

## 🎯 Priority Matrix (What we build first)

We are using the **MoSCoW** method to ensure we finish on time.

### 🔴 P0: Critical (Must Have) - *If this breaks, we fail.*
1.  **Environment Setup:** Git repo, Database connection, Basic Express server.
2.  **Authentication:** Register/Login with JWT & Role separation (Patient vs. Provider).
3.  **Schema Design:** User, Profile, and Goal models in MongoDB.
4.  **Patient Dashboard:** Ability to input "Steps/Water" and see it saved.
5.  **Privacy Compliance:** The "Data Consent" checkbox on signup + internal logging of who accessed data.

### 🟡 P1: Core Features (Should Have) - *The business logic.*
1.  **Provider Dashboard:** Read-only view for doctors to see patient compliance.
2.  **Profile Management:** Editing allergies/meds.
3.  **Deployment:** Getting the backend on GCP and Frontend on Vercel.

### 🟢 P2: Polish (Nice to Have) - *If we have time left.*
1.  **CI/CD:** GitHub Actions (Basic test workflow).
2.  **Fancy UI:** Charts/Graphs for the steps (use simple text stats first).
3.  **Static Pages:** "Public Health Info" page.

---

## ⏳ Hourly Timeline (The 5-Hour Sprint)

### 🕐 Hour 1: Architecture & "The Skeleton"
**Goal:** A running backend connected to DB and a basic Frontend scaffold.
* **Backend:** * Initialize `npm`, install dependencies (express, mongoose, dotenv, cors).
    * Connect to MongoDB Atlas.
    * Set up **Winston Logger** (Critical for the "Security Logging" requirement).
* **Frontend:** * `npm create vite@latest` (React).
    * Install Tailwind CSS (for speed) & React Router.
* **DevOps:** Create the GitHub Repository and push the skeleton.

### 🕑 Hour 2: Authentication & Roles (The Hardest Part)
**Goal:** Users can sign up as "Patient" or "Provider" and get a Token.
* **Backend:** * Create `User` Model (`name`, `email`, `password`, `role`, `consent_agreed`).
    * Implement `POST /register` (Hash password!).
    * Implement `POST /login` (Issue JWT).
    * **Security Check:** Ensure the "Consent Checkbox" is validated on the backend.
* **Frontend:** * Build Login/Register forms.
    * Add the "I agree to data usage" checkbox (HIPAA requirement).

### 🕒 Hour 3: Patient Features (Data Entry)
**Goal:** A patient can log in and track their health.
* **Backend:** * Create `WellnessLog` Model (`steps`, `water`, `date`).
    * Create API: `POST /api/log` (Add entry) and `GET /api/log` (View history).
* **Frontend:** * Create **Patient Dashboard**.
    * Add simple input fields: "How many steps today?" "Water intake?".
    * Display a static "Health Tip of the Day" (Hardcode an array of tips to randomise).

### 🕓 Hour 4: Provider View & Profile
**Goal:** The Doctor sees the Patient's data.
* **Backend:** * Create API: `GET /api/patients` (Protected route: Only 'Provider' role can access).
    * **Audit Log:** When this endpoint is hit, log: *"Provider X accessed Patient list at [Time]"* (Judges will love this detail).
* **Frontend:** * Create **Provider Dashboard**.
    * Fetch list of patients. Show a red/green tag based on if they logged data today.
    * Build "Edit Profile" page for Patients (Allergies/Meds).

### 🕔 Hour 5: Deployment & CI/CD
**Goal:** Go Live.
* **Deployment:**
    * **Frontend:** Drag and drop folder to Vercel Dashboard (easiest way).
    * **Backend:** Deploy to Google Cloud Run (or Render if GCP config takes too long).
* **CI/CD:** Add the `.github/workflows/node.js.yml` file to run a simple test on push.
* **Final QA:** Check if the README is updated and the app doesn't crash on wrong passwords.

---

## 🛠 Technical Implementation Details

### 1. Security First (Because it's Healthcare)
* **Middleware:** We will create a `verifyToken` middleware.
* **Role Check:** We will create a `requireRole('provider')` middleware.
* **Logging:** Use `winston` to create a file `access.log`. 
    * *Code Logic:* Inside the API controller, if a doctor requests patient data -> `logger.info('Data accessed by Provider ID: 123')`.

### 2. Folder Structure for Speed
Keep it flat and simple to avoid confusion.
```text
/src
  /controllers (Auth, Patient, Provider)
  /models (User, Log)
  /routes (The API endpoints)
  /utils (Logger configuration)
  server.js (Main entry point)