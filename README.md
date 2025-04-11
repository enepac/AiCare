# AiCare

**AiCare** is a full-stack, AI-enhanced medical assistant web app designed to help patients and health professionals manage, analyze, and share medical data securely. It offers patient record uploads, GPT-driven summarization, chatbot assistance, appointment tracking, and shared viewer access through a modular and secure architecture.

---

## 📦 Features

### 🧠 AI-Assisted Medical Records
- Upload medical files (PDF, DOCX, scans)
- AWS Textract & Tesseract OCR fallback
- GPT analyzes content and structures it into conditions, diagnosis, medications

### 💬 Smart Chatbot
- Conversational AI using OpenAI GPT
- Scoped to patient data from MongoDB
- Viewer-aware: shared users can query shared records only

### 🩺 Patient Health Tracker
- Profile Setup (lifestyle, vitals, allergies)
- Medical History, Appointments, Medications
- Symptom Logging, Test Results, Procedures
- Print and Share data modules

### 🔄 Viewer Access System
- Users can share access with others
- Shared users see read-only versions
- Toggle between own data and shared patient profiles

### 🐳 Docker + Render Deployment
- Fully containerized Docker build
- OCR tools installed (`tesseract`, `poppler-utils`)
- Hosted via [Render.com](https://render.com/)
- GHCR (GitHub Container Registry) integration

---

## ⚙️ Tech Stack

| Layer         | Stack/Tools                                   |
|---------------|-----------------------------------------------|
| **Frontend**  | Next.js 14+ (App Router), React, Tailwind CSS |
| **Backend**   | Next.js API Routes, Mongoose, OpenAI, AWS SDK |
| **Database**  | MongoDB Atlas                                 |
| **Auth**      | NextAuth.js (JWT)                             |
| **Storage**   | AWS S3 for file uploads                       |
| **OCR**       | AWS Textract, Tesseract OCR                   |
| **Deployment**| Docker, GitHub Container Registry, Render     |

---

## 🧩 Directory Structure (Simplified)

```
/src
├── app
│   ├── api
│   │   ├── chatbot/threads
│   │   ├── medical-records
│   │   ├── profile
│   │   ├── patient-data
│   ├── dashboard
│   └── layout.tsx
├── components
│   ├── ChatbotWidget.tsx
│   ├── PatientData/
│   └── Shared UI Components
├── lib
│   ├── mongodb/
│   ├── aws/
│   ├── ocr/
│   ├── ai/
│   └── utils/
├── models
│   ├── User.ts
│   ├── MedicalRecord.ts
│   ├── SharedAccess.ts
│   └── etc...
```

---

## 🚀 Quick Start (Local)

```bash
# Clone repo
git clone https://github.com/enepac/aicare-app
cd aicare-app

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local
# Add Mongo URI, OpenAI Key, AWS credentials, NEXTAUTH_SECRET

# Run locally
npm run dev

# Access at: http://localhost:5000
```

---

## 🐳 Docker

```bash
# Build Docker image
sudo docker build -t ghcr.io/enepac/aicare-app:latest .

# Push to GHCR
sudo docker push ghcr.io/enepac/aicare-app:latest
```

Dockerfile uses `node:18-slim` and installs:
- `poppler-utils`, `tesseract-ocr`, `tesseract-ocr-eng`
- Multi-stage build (deps → builder → runner)

---

## 🔐 Security & Privacy

- JWT-secured routes with `next-auth`
- Scoped access via `getScopedEmail()`
- MongoDB rules: data scoped by authenticated email
- Viewer mode: shared access is readonly, no impersonation
- No session switching — all users stay in their own account

---

## ✅ Testing & Scripts

```bash
npm run lint
npm run type-check
npm run audit      # Audit GPT setup
npm run dev:socket # Realtime dev server
```

---

## 🧠 AI Architecture

- `generateSchemaContext()` dynamically builds MongoDB prompt context
- Injected into GPT system messages for thread-aware AI answers
- Automatically adapts to new collections

---

## 📖 License

MIT © [enepac](https://github.com/enepac)

---

## ✨ Credits

AiCare is a personal AI health companion built by software engineers with a passion for healthcare and usability.

---

Need a lightweight version or onboarding docs? Ping `@ChatGPT` to generate it!
