/workspaces/aicare/aicare-app/src
├── app
│   ├── api
│   │   ├── admin
│   │   │   ├── users
│   │   │   │   └── route.ts
│   │   │   └── users.ts
│   │   ├── ai
│   │   │   ├── parse
│   │   │   │   └── route.ts
│   │   │   └── upload
│   │   │       └── route.ts
│   │   ├── auth
│   │   │   ├── forgot-password
│   │   │   │   └── route.ts
│   │   │   ├── reset-password
│   │   │   │   └── route.ts
│   │   │   ├── session
│   │   │   │   └── route-custom.ts
│   │   │   └── signup
│   │   │       └── route.ts
│   │   ├── chatbot
│   │   │   ├── new-thread
│   │   │   │   └── route.ts
│   │   │   ├── route.ts
│   │   │   └── threads
│   │   │       ├── route.ts
│   │   │       └── [threadId]
│   │   │           ├── messages
│   │   │           │   └── route.ts
│   │   │           └── route.ts
│   │   ├── cron
│   │   │   └── route.ts
│   │   ├── dashboard
│   │   │   └── profile
│   │   │       └── route.ts
│   │   ├── medical-records
│   │   │   ├── delete
│   │   │   │   └── route.ts
│   │   │   ├── extract
│   │   │   │   └── route.ts
│   │   │   ├── retrieve
│   │   │   │   └── route.ts
│   │   │   ├── route.ts
│   │   │   ├── update
│   │   │   │   └── route.ts
│   │   │   └── upload
│   │   │       └── route.ts
│   │   ├── profile
│   │   │   ├── progress
│   │   │   │   └── route.ts
│   │   │   ├── route.ts
│   │   │   ├── update
│   │   │   │   └── route.ts
│   │   │   └── update.ts
│   │   ├── test-db
│   │   │   └── route.ts
│   │   └── testing
│   │       ├── reset-users
│   │       │   └── route.ts
│   │       ├── test-db
│   │       │   └── route.ts
│   │       └── user-count
│   │           └── route.ts
│   ├── assessment
│   │   └── page.tsx
│   ├── auth
│   │   ├── forgot-password
│   │   │   └── page.tsx
│   │   ├── register
│   │   │   └── page.tsx
│   │   ├── reset-password
│   │   │   ├── page.tsx
│   │   │   └── ResetPasswordClient.tsx
│   │   ├── signin
│   │   │   └── page.tsx
│   │   └── signup
│   │       └── page.tsx
│   ├── auth-check
│   │   └── page.tsx
│   ├── chatbot
│   │   ├── page.tsx
│   │   └── [threadId]
│   │       └── page.tsx
│   ├── dashboard
│   │   ├── chatbot
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── medical-records
│   │   └── page.tsx
│   ├── metadata.ts
│   ├── page.tsx
│   └── profile
│       ├── page.tsx
│       └── setup
│           └── page.tsx
├── components
│   ├── AppointmentList.tsx
│   ├── Button.tsx
│   ├── chatbot
│   ├── ChatbotWidget.tsx
│   ├── DashboardHeader.tsx
│   ├── DataVisualization.tsx
│   ├── DraggableWidget.tsx
│   ├── HealthSummary.tsx
│   ├── Layout.tsx
│   ├── MedicalRecords.tsx
│   ├── MedicationReminders.tsx
│   ├── MultiStepProfile.tsx
│   ├── Navbar.tsx
│   ├── PasswordRequirements.tsx
│   ├── PatientProfile.tsx
│   ├── ProfileProgressBar.tsx
│   ├── Providers.tsx
│   ├── Sidebar.tsx
│   └── ui
│       └── button.tsx
├── lib
│   ├── ai
│   │   └── gptMedicalParser.ts
│   ├── authOptions.ts
│   ├── aws
│   │   ├── s3Uploader.ts
│   │   ├── textractParser.ts
│   │   ├── textractTest.ts
│   │   └── textract.ts
│   ├── cron.ts
│   ├── db
│   │   └── saveParsedRecord.ts
│   ├── fileParsers
│   │   ├── parseDocx.ts
│   │   ├── parseHtmlCheerio.ts
│   │   ├── parseHtmlDocling.ts
│   │   ├── parseRtfDocling.ts
│   │   └── parseRtf.ts
│   ├── mongodb
│   │   ├── saveParsedAI.ts
│   │   └── schemaSummary.ts
│   ├── mongodb.ts
│   ├── parser
│   │   └── parseWithGPT.ts
│   └── utils.ts
├── middleware
│   └── auth.ts
├── middleware.ts
├── models
│   ├── conversation.ts
│   ├── MedicalRecord.ts
│   └── user.ts
├── styles
│   └── globals.css
├── types
│   ├── chatbot.d.ts
│   ├── components.d.ts
│   ├── formidable.d.ts
│   ├── global.d.ts
│   ├── mime-types.d.ts
│   ├── next-auth.d.ts
│   ├── tesseract.d.ts
│   └── UserProfile.ts
├── utils
│   ├── aws
│   │   └── s3Client.ts
│   ├── db.ts
│   ├── mergeRefs.ts
│   ├── parseMedicalText.ts
│   ├── runDocling.ts
│   ├── textractClient.ts
│   └── validation.ts
└── workers
    └── parseWorker.ts

67 directories, 107 files
