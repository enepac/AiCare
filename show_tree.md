Generating directory tree for AiCare (application files only)...
.
|-- .devcontainer
|   |-- Dockerfile
|   `-- devcontainer.json
|-- .dockerignore
|-- aicare-app
|   |-- .env.local
|   |-- .gitignore
|   |-- .prettierrc.json
|   |-- README.md
|   |-- aicare_code_structure.md
|   |-- backend
|   |   |-- .prettierrc
|   |   |-- README.md
|   |   |-- eslint.config.mjs
|   |   |-- nest-cli.json
|   |   |-- package.json
|   |   |-- src
|   |   |   |                               `-- app.controller.spec.ts
|   |   |   |                               `-- app.controller.ts
|   |   |   |                               `-- app.module.ts
|   |   |   |                               `-- app.service.ts
|   |   |                                   `-- main.ts
|   |   |-- test
|   |   |   |                               `-- app.e2e-spec.ts
|   |   |                                   `-- jest-e2e.json
|   |   |-- tsconfig.build.json
|   |   `-- tsconfig.json
|   |-- cookies.txt
|   |-- debug.log
|   |-- debugging-tool.ts
|   |-- eslint.config.mjs
|   |-- generate_structure.sh
|   |-- next-env.d.ts
|   |-- next.config.ts
|   |-- package.json
|   |-- pages
|   |   |-- api
|   |   |                                   `-- auth
|   |   |                                   `-- [...nextauth].ts
|   |   `-- auth
|   |-- postcss.config.js
|   |-- postcss.config.mjs
|   |-- public
|   |   |-- assets
|   |   |   |-- avatar.png
|   |   |   `-- background.png
|   |   |-- default-avatar.png
|   |   |-- file.svg
|   |   |-- globe.svg
|   |   |-- google-icon.png
|   |   |-- google-icon.webp
|   |   |-- logo.png
|   |   |-- next.svg
|   |   |-- uploads
|   |   |   |-- 1742356863049-danmkyle@gmail.com.pdf
|   |   |   |-- 1742358122224-danmkyle_gmail_com.pdf
|   |   |   `-- 1742362988374-danmkyle_gmail_com.pdf
|   |   |-- vercel.svg
|   |   `-- window.svg
|   |-- scripts
|   |   |-- build
|   |   |   `-- generate_code_snapshot.js
|   |   `-- generate_code_snapshot.ts
|   |-- smtp-test.js
|   |-- source_code.md
|   |-- src
|   |   |-- app
|   |   |   |-- api
|   |   |   |   |                           `-- admin
|   |   |   |   |   |                       `-- users
|   |   |   |   |   |                       `-- route.ts
|   |   |   |   |   `-- users.ts
|   |   |   |   |-- auth
|   |   |   |   |   |-- [...nextauth]
|   |   |   |   |   |-- forgot-password
|   |   |   |   |   |                       `-- route.ts
|   |   |   |   |   |-- reset-password
|   |   |   |   |   |                       `-- route.ts
|   |   |   |   |   |-- session
|   |   |   |   |   |                       `-- route.ts
|   |   |   |   |   `-- signup
|   |   |   |   |                           `-- route.ts
|   |   |   |   |-- dashboard
|   |   |   |   |   `-- profile
|   |   |   |   |                           `-- route.ts
|   |   |   |   |-- medical-records
|   |   |   |   |   |-- retrieve
|   |   |   |   |   |                       `-- route.ts
|   |   |   |   |   `-- route.ts
|   |   |   |   |-- profile
|   |   |   |   |   |-- progress
|   |   |   |   |   |                       `-- route.ts
|   |   |   |   |   |-- route.ts
|   |   |   |   |   |-- update
|   |   |   |   |   |                       `-- route.ts
|   |   |   |   |   `-- update.ts
|   |   |   |   |-- test-db
|   |   |   |   |   `-- route.ts
|   |   |   |   `-- testing
|   |   |   |       |-- reset-users
|   |   |   |       |                       `-- route.ts
|   |   |   |       |-- test-db
|   |   |   |       |                       `-- route.ts
|   |   |   |       `-- user-count
|   |   |   |                               `-- route.ts
|   |   |   |-- assessment
|   |   |   |   `-- page.tsx
|   |   |   |-- auth
|   |   |   |   |-- forgot-password
|   |   |   |   |   `-- page.tsx
|   |   |   |   |-- register
|   |   |   |   |   `-- page.tsx
|   |   |   |   |-- reset-password
|   |   |   |   |   `-- page.tsx
|   |   |   |   |-- signin
|   |   |   |   |   `-- page.tsx
|   |   |   |   `-- signup
|   |   |   |       `-- page.tsx
|   |   |   |-- auth-check
|   |   |   |   `-- page.tsx
|   |   |   |-- dashboard
|   |   |   |   `-- page.tsx
|   |   |   |-- favicon.ico
|   |   |   |-- globals.css
|   |   |   |-- layout.tsx
|   |   |   |-- medical-records
|   |   |   |   `-- page.tsx
|   |   |   |-- metadata.ts
|   |   |   |-- page.tsx
|   |   |   `-- profile
|   |   |       |-- page.tsx
|   |   |       `-- setup
|   |   |           `-- page.tsx
|   |   |-- components
|   |   |   |-- AppointmentList.tsx
|   |   |   |-- Button.tsx
|   |   |   |-- ChatbotWidget.tsx
|   |   |   |-- DashboardHeader.tsx
|   |   |   |-- DataVisualization.tsx
|   |   |   |-- DraggableWidget.tsx
|   |   |   |-- HealthSummary.tsx
|   |   |   |-- Layout.tsx
|   |   |   |-- MedicalRecords.tsx
|   |   |   |-- MedicationReminders.tsx
|   |   |   |-- MultiStepProfile.tsx
|   |   |   |-- Navbar.tsx
|   |   |   |-- PasswordRequirements.tsx
|   |   |   |-- PatientProfile.tsx
|   |   |   |-- Providers.tsx
|   |   |   `-- Sidebar.tsx
|   |   |-- lib
|   |   |   `-- mongodb.ts
|   |   |-- middleware
|   |   |   `-- auth.ts
|   |   |-- middleware.ts
|   |   |-- models
|   |   |   |-- MedicalRecord.ts
|   |   |   `-- user.ts
|   |   |-- styles
|   |   |   `-- globals.css
|   |   |-- types
|   |   |   |-- components.d.ts
|   |   |   |-- formidable.d.ts
|   |   |   |-- global.d.ts
|   |   |   `-- mime-types.d.ts
|   |   `-- utils
|   |       |-- db.ts
|   |       |-- mergeRefs.ts
|   |       `-- validation.ts
|   |-- start.sh
|   |-- tailwind.config.js
|   |-- test-medical-record.pdf
|   |-- trace.log
|   |-- tree.txt
|   |-- tsconfig.json
|   `-- workspace_code_snapshot.md
|-- data
|-- debugger
|   `-- debug_codebase.ts
|-- generate_filtered_structure.sh
|-- related_codes.md
|-- show_tree.md
|-- show_tree.sh
|-- source_code.md
|-- trace_dependencies.sh
`-- tree.txt

58 directories, 128 files
