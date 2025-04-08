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
│   │   │           ├── route.ts
│   │   │           └── upload
│   │   │               └── route.ts
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
│   │   │   └── update
│   │   │       └── route.ts
│   │   ├── patient-data
│   │   │   ├── accept
│   │   │   │   └── route.ts
│   │   │   ├── access-list
│   │   │   │   └── route.ts
│   │   │   ├── appointments
│   │   │   │   └── route.ts
│   │   │   ├── cancel
│   │   │   │   └── route.ts
│   │   │   ├── decline-request
│   │   │   │   └── route.ts
│   │   │   ├── handle-request
│   │   │   │   └── route.ts
│   │   │   ├── has-invites
│   │   │   │   └── route.ts
│   │   │   ├── history
│   │   │   │   └── route.ts
│   │   │   ├── invites
│   │   │   │   └── route.ts
│   │   │   ├── medications
│   │   │   │   └── route.ts
│   │   │   ├── procedures
│   │   │   │   └── route.ts
│   │   │   ├── reject
│   │   │   │   └── route.ts
│   │   │   ├── reject-request
│   │   │   │   └── route.ts
│   │   │   ├── request-access
│   │   │   │   └── route.ts
│   │   │   ├── requests
│   │   │   │   └── route.ts
│   │   │   ├── request-view-access
│   │   │   │   └── route.ts
│   │   │   ├── respond
│   │   │   │   └── route.ts
│   │   │   ├── respond-access
│   │   │   │   └── route.ts
│   │   │   ├── respond-view-request
│   │   │   │   └── route.ts
│   │   │   ├── revoke
│   │   │   │   └── route.ts
│   │   │   ├── revoke-access
│   │   │   │   └── route.ts
│   │   │   ├── share
│   │   │   │   └── route.ts
│   │   │   ├── stop-sharing
│   │   │   │   └── route.ts
│   │   │   ├── symptoms
│   │   │   │   └── route.ts
│   │   │   ├── tests
│   │   │   │   └── route.ts
│   │   │   └── unshare
│   │   │       └── route.ts
│   │   ├── profile
│   │   │   ├── progress
│   │   │   │   └── route.ts
│   │   │   ├── route.ts
│   │   │   ├── update
│   │   │   │   └── route.ts
│   │   │   └── update.ts
│   │   ├── shared-access
│   │   │   └── viewable-patients
│   │   │       └── route.ts
│   │   ├── test-db
│   │   │   └── route.ts
│   │   ├── testing
│   │   │   ├── reset-users
│   │   │   │   └── route.ts
│   │   │   ├── test-db
│   │   │   │   └── route.ts
│   │   │   └── user-count
│   │   │       └── route.ts
│   │   ├── users
│   │   │   └── search
│   │   │       └── route.ts
│   │   └── viewer
│   │       └── switch
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
│   │   ├── notifications
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
│   ├── PatientData
│   │   ├── Appointments.tsx
│   │   ├── index.tsx
│   │   ├── MedicalHistory.tsx
│   │   ├── Medications.tsx
│   │   ├── PrintData.tsx
│   │   ├── Profile.tsx
│   │   ├── Reminders.tsx
│   │   ├── ShareData.tsx
│   │   ├── SymptomLog.tsx
│   │   ├── TestResults.tsx
│   │   └── UpcomingTests.tsx
│   ├── PatientProfile.tsx
│   ├── ProfileProgressBar.tsx
│   ├── Providers.tsx
│   ├── SharedAccess
│   │   └── StopAccessButton.tsx
│   ├── Sidebar.tsx
│   └── ui
│       └── button.tsx
├── lib
│   ├── ai
│   │   └── gptMedicalParser.ts
│   ├── authOptions.ts
│   ├── aws
│   │   ├── s3Uploader.ts
│   │   ├── textractFallback.ts
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
│   │   ├── generateSchemaContext.ts
│   │   ├── saveParsedAI.ts
│   │   └── schemaSummary.ts
│   ├── mongodb.ts
│   ├── ocr
│   │   ├── ocrFallback.ts
│   │   └── parseWithOCR.ts
│   ├── parser
│   │   └── parseWithGPT.ts
│   ├── server
│   │   └── resolveEffectiveUser.ts
│   ├── utils
│   │   └── viewerScope.ts
│   └── utils.ts
├── middleware
│   └── auth.ts
├── middleware.ts
├── models
│   ├── AppointmentRecord.ts
│   ├── conversation.ts
│   ├── MedicalHistory.ts
│   ├── MedicalRecord.ts
│   ├── MedicationRecord.ts
│   ├── ProcedureRecord.ts
│   ├── SharedAccess.ts
│   ├── SymptomLog.ts
│   ├── TestResult.ts
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
│   ├── node-cron.d.ts
│   ├── pdf2pic.d.ts
│   ├── rtf-parser.d.ts
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

105 directories, 165 files
