# 📄 File Report: /workspaces/aicare/aicare-app/src/components/PatientProfile.tsx

## 📁 Application Directory Structure
```
/workspaces/aicare/aicare-app
├── aicare_code_structure.md
├── backend
│   ├── eslint.config.mjs
│   ├── nest-cli.json
│   ├── package.json
│   ├── README.md
│   ├── src
│   │   ├── app.controller.spec.ts
│   │   ├── app.controller.ts
│   │   ├── app.module.ts
│   │   ├── app.service.ts
│   │   └── main.ts
│   ├── test
│   │   ├── app.e2e-spec.ts
│   │   └── jest-e2e.json
│   ├── tsconfig.build.json
│   └── tsconfig.json
├── components.json
├── cookies.txt
├── cron-local.ts
├── debugging-tool.ts
├── debug.log
├── Dockerfile
├── eng.traineddata
├── eslint.config.mjs
├── filtered_structure.txt
├── generate_structure.sh
├── next.config.mjs
├── next-env.d.ts
├── package.json
├── package-lock.json
├── pages
│   └── api
│       └── auth
│           └── [...nextauth].ts
├── postcss.config.js
├── postcss.config.mjs
├── public
│   ├── assets
│   │   ├── avatar.png
│   │   └── background.png
│   ├── default-avatar.png
│   ├── file.svg
│   ├── globe.svg
│   ├── google-icon.png
│   ├── google-icon.webp
│   ├── logo.png
│   ├── next.svg
│   ├── uploads
│   │   ├── 1742706673100-danmkyle_gmail_com.png
│   │   ├── 1742741043936-danmkyle_gmail_com.pdf
│   │   ├── 1742782797791-danmkyle_gmail_com.pdf
│   │   ├── 1742782986470-danmkyle_gmail_com.pdf
│   │   ├── 1742783008820-danmkyle_gmail_com.pdf
│   │   ├── 1742784238561-danmkyle_gmail_com.pdf
│   │   ├── 1742784330201-danmkyle_gmail_com.pdf
│   │   ├── 1742784355191-danmkyle_gmail_com.pdf
│   │   ├── 1742784364454-danmkyle_gmail_com.pdf
│   │   ├── 1742784383782-danmkyle_gmail_com.pdf
│   │   ├── 1742784414973-danmkyle_gmail_com.pdf
│   │   ├── 1742784835712-danmkyle_gmail_com.pdf
│   │   ├── 1742785368882-danmkyle_gmail_com.pdf
│   │   ├── 1742786516150-danmkyle_gmail_com.pdf
│   │   ├── 1742791679185-danmkyle_gmail_com.rtf
│   │   ├── 1742819440019-danmkyle_gmail_com.pdf
│   │   ├── 1742820593166-danmkyle_gmail_com.pdf
│   │   ├── 1742820677865-danmkyle_gmail_com.pdf
│   │   ├── 1742824281678-danmkyle_gmail_com.pdf
│   │   ├── 1742826938823-danmkyle_gmail_com.pdf
│   │   ├── 1742829105357-danmkyle_gmail_com.pdf
│   │   ├── 1742831625727-danmkyle_gmail_com.rtf
│   │   ├── 1742834236298-danmkyle_gmail_com.docx
│   │   ├── 1742834250897-danmkyle_gmail_com.docx
│   │   ├── 1742834895682-danmkyle_gmail_com.rtf
│   │   ├── 1742837138764-danmkyle_gmail_com.pdf
│   │   ├── 1742837174535-danmkyle_gmail_com.pdf
│   │   ├── 1742837619973-danmkyle_gmail_com.pdf
│   │   ├── 1742837633373-danmkyle_gmail_com.pdf
│   │   ├── 1742837945078-danmkyle_gmail_com.pdf
│   │   ├── 1742838069157-danmkyle_gmail_com.pdf
│   │   ├── 1742838241421-danmkyle_gmail_com.pdf
│   │   ├── 1742838465702-danmkyle_gmail_com.pdf
│   │   ├── 1742838614494-danmkyle_gmail_com.pdf
│   │   ├── 1742839066898-danmkyle_gmail_com.pdf
│   │   ├── 1742839262966-danmkyle_gmail_com.pdf
│   │   ├── 1742839433407-danmkyle_gmail_com.pdf
│   │   ├── 1742840141124-danmkyle_gmail_com.png
│   │   ├── 1742840374648-danmkyle_gmail_com.rtf
│   │   ├── 1742840388236-danmkyle_gmail_com.png
│   │   ├── 1742842805750-danmkyle_gmail_com.pdf
│   │   ├── 1742842822865-danmkyle_gmail_com.pdf
│   │   ├── 1742843067237-danmkyle_gmail_com.pdf
│   │   ├── 1742844442955-danmkyle_gmail_com.png
│   │   ├── 1742847566277-danmkyle_gmail_com.pdf
│   │   ├── 1742847887031-danmkyle_gmail_com.pdf
│   │   ├── 1742848041142-danmkyle_gmail_com.pdf
│   │   ├── 1742848288209-danmkyle_gmail_com.pdf
│   │   ├── 1742848302836-danmkyle_gmail_com.pdf
│   │   ├── 1742856218923-danmkyle_gmail_com.pdf
│   │   ├── 1742856251063-danmkyle_gmail_com.png
│   │   ├── 1742856254842-danmkyle_gmail_com.png
│   │   ├── 1742856865524-danmkyle_gmail_com.pdf
│   │   ├── 1742856898408-danmkyle_gmail_com.pdf
│   │   ├── 1742857029172-danmkyle_gmail_com.pdf
│   │   ├── 1742857292863-danmkyle_gmail_com.pdf
│   │   ├── 1742857472944-danmkyle_gmail_com.pdf
│   │   ├── 1742857670737-danmkyle_gmail_com.pdf
│   │   ├── 1742857736212-danmkyle_gmail_com.pdf
│   │   ├── 1742857928395-danmkyle_gmail_com.pdf
│   │   ├── 1742858146246-danmkyle_gmail_com.pdf
│   │   ├── 1742858536293-danmkyle_gmail_com.pdf
│   │   ├── 1742858760901-danmkyle_gmail_com.pdf
│   │   ├── 1742859001799-danmkyle_gmail_com.pdf
│   │   ├── 1742859362308-danmkyle_gmail_com.pdf
│   │   ├── 1742859718123-danmkyle_gmail_com.pdf
│   │   ├── 1742859944247-danmkyle_gmail_com.pdf
│   │   ├── 1742860791422-danmkyle_gmail_com.txt
│   │   ├── 1742860934691-danmkyle_gmail_com.rtf
│   │   ├── 1742861893456-danmkyle_gmail_com.pdf
│   │   ├── 1742862121273-danmkyle_gmail_com.pdf
│   │   ├── 1742862422680-danmkyle_gmail_com.pdf
│   │   ├── 1742862632402-danmkyle_gmail_com.pdf
│   │   ├── 1742863297902-danmkyle_gmail_com.pdf
│   │   ├── 1742863647571-danmkyle_gmail_com.pdf
│   │   ├── 1742863935826-danmkyle_gmail_com.pdf
│   │   └── 1742865034253-danmkyle_gmail_com.pdf
│   ├── vercel.svg
│   └── window.svg
├── README.deploy.md
├── README.md
├── reports
│   └── file-report-PatientProfile.tsx.md
├── schema_summary.json
├── scripts
│   ├── auditChatbotSetup.ts
│   ├── build
│   │   └── generate_code_snapshot.js
│   ├── check-records.ts
│   ├── generate_code_snapshot.ts
│   ├── generate-schema.ts
│   ├── ocr.ts
│   └── reports
│       └── find-related-files.sh
├── server.ts
├── smtp-test.js
├── socket.ts
├── source_code.md
├── src
│   ├── app
│   │   ├── api
│   │   │   ├── admin
│   │   │   │   ├── users
│   │   │   │   │   └── route.ts
│   │   │   │   └── users.ts
│   │   │   ├── ai
│   │   │   │   ├── parse
│   │   │   │   │   └── route.ts
│   │   │   │   └── upload
│   │   │   │       └── route.ts
│   │   │   ├── auth
│   │   │   │   ├── forgot-password
│   │   │   │   │   └── route.ts
│   │   │   │   ├── reset-password
│   │   │   │   │   └── route.ts
│   │   │   │   ├── session
│   │   │   │   │   └── route-custom.ts
│   │   │   │   └── signup
│   │   │   │       └── route.ts
│   │   │   ├── chatbot
│   │   │   │   ├── new-thread
│   │   │   │   │   └── route.ts
│   │   │   │   ├── route.ts
│   │   │   │   └── threads
│   │   │   │       ├── route.ts
│   │   │   │       └── [threadId]
│   │   │   │           ├── messages
│   │   │   │           │   └── route.ts
│   │   │   │           └── route.ts
│   │   │   ├── cron
│   │   │   │   └── route.ts
│   │   │   ├── dashboard
│   │   │   │   └── profile
│   │   │   │       └── route.ts
│   │   │   ├── medical-records
│   │   │   │   ├── delete
│   │   │   │   │   └── route.ts
│   │   │   │   ├── extract
│   │   │   │   │   └── route.ts
│   │   │   │   ├── retrieve
│   │   │   │   │   └── route.ts
│   │   │   │   ├── route.ts
│   │   │   │   ├── update
│   │   │   │   │   └── route.ts
│   │   │   │   └── upload
│   │   │   │       └── route.ts
│   │   │   ├── profile
│   │   │   │   ├── progress
│   │   │   │   │   └── route.ts
│   │   │   │   ├── route.ts
│   │   │   │   ├── update
│   │   │   │   │   └── route.ts
│   │   │   │   └── update.ts
│   │   │   ├── test-db
│   │   │   │   └── route.ts
│   │   │   └── testing
│   │   │       ├── reset-users
│   │   │       │   └── route.ts
│   │   │       ├── test-db
│   │   │       │   └── route.ts
│   │   │       └── user-count
│   │   │           └── route.ts
│   │   ├── assessment
│   │   │   └── page.tsx
│   │   ├── auth
│   │   │   ├── forgot-password
│   │   │   │   └── page.tsx
│   │   │   ├── register
│   │   │   │   └── page.tsx
│   │   │   ├── reset-password
│   │   │   │   ├── page.tsx
│   │   │   │   └── ResetPasswordClient.tsx
│   │   │   ├── signin
│   │   │   │   └── page.tsx
│   │   │   └── signup
│   │   │       └── page.tsx
│   │   ├── auth-check
│   │   │   └── page.tsx
│   │   ├── chatbot
│   │   │   ├── page.tsx
│   │   │   └── [threadId]
│   │   │       └── page.tsx
│   │   ├── dashboard
│   │   │   ├── chatbot
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── medical-records
│   │   │   └── page.tsx
│   │   ├── metadata.ts
│   │   ├── page.tsx
│   │   └── profile
│   │       ├── page.tsx
│   │       └── setup
│   │           └── page.tsx
│   ├── components
│   │   ├── AppointmentList.tsx
│   │   ├── Button.tsx
│   │   ├── chatbot
│   │   │   └── ThreadListSidebar.tsx
│   │   ├── ChatbotWidget.tsx
│   │   ├── DashboardHeader.tsx
│   │   ├── DataVisualization.tsx
│   │   ├── DraggableWidget.tsx
│   │   ├── HealthSummary.tsx
│   │   ├── Layout.tsx
│   │   ├── MedicalRecords.tsx
│   │   ├── MedicationReminders.tsx
│   │   ├── MultiStepProfile.tsx
│   │   ├── Navbar.tsx
│   │   ├── PasswordRequirements.tsx
│   │   ├── PatientProfile.tsx
│   │   ├── ProfileProgressBar.tsx
│   │   ├── Providers.tsx
│   │   ├── Sidebar.tsx
│   │   └── ui
│   │       └── button.tsx
│   ├── lib
│   │   ├── ai
│   │   │   └── gptMedicalParser.ts
│   │   ├── authOptions.ts
│   │   ├── aws
│   │   │   ├── s3Uploader.ts
│   │   │   ├── textractParser.ts
│   │   │   ├── textractTest.ts
│   │   │   └── textract.ts
│   │   ├── cron.ts
│   │   ├── db
│   │   │   └── saveParsedRecord.ts
│   │   ├── fileParsers
│   │   │   ├── parseDocx.ts
│   │   │   ├── parseHtmlCheerio.ts
│   │   │   ├── parseHtmlDocling.ts
│   │   │   ├── parseRtfDocling.ts
│   │   │   └── parseRtf.ts
│   │   ├── mongodb
│   │   │   ├── saveParsedAI.ts
│   │   │   └── schemaSummary.ts
│   │   ├── mongodb.ts
│   │   ├── parser
│   │   │   └── parseWithGPT.ts
│   │   └── utils.ts
│   ├── middleware
│   │   └── auth.ts
│   ├── middleware.ts
│   ├── models
│   │   ├── conversation.ts
│   │   ├── MedicalRecord.ts
│   │   └── user.ts
│   ├── styles
│   │   └── globals.css
│   ├── types
│   │   ├── components.d.ts
│   │   ├── formidable.d.ts
│   │   ├── global.d.ts
│   │   ├── mime-types.d.ts
│   │   ├── next-auth.d.ts
│   │   ├── tesseract.d.ts
│   │   └── UserProfile.ts
│   ├── utils
│   │   ├── aws
│   │   │   └── s3Client.ts
│   │   ├── db.ts
│   │   ├── mergeRefs.ts
│   │   ├── parseMedicalText.ts
│   │   ├── runDocling.ts
│   │   ├── textractClient.ts
│   │   └── validation.ts
│   └── workers
│       └── parseWorker.ts
├── start.sh
├── tailwind.config.js
├── test.md
├── test-openai.ts
├── trace.log
├── tree.txt
├── tsconfig.json
└── tsconfig.tsbuildinfo

81 directories, 249 files
```

## 🔗 Related Files
- /workspaces/aicare/aicare-app/src/components/PatientProfile.tsx

## 📄 File: `/workspaces/aicare/aicare-app/src/components/PatientProfile.tsx`
```tsx
"use client";
import { useState, ChangeEvent } from "react";

interface PatientProfileProps {
  name: string;
  age: number;
  gender: string;
  height: number | null;
  weight: number | null;
  bmi: number | null;
  bloodType: string;
  pregnant: boolean;
  allergies: string;
  medications: string;
  familyHistory: string;
  activityLevel: string;
  diet: string;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handlePregnantChange: (value: boolean) => void;
  editable?: boolean;
}

const PatientProfile: React.FC<PatientProfileProps> = ({
  name,
  age,
  gender,
  height,
  weight,
  bmi,
  bloodType,
  pregnant,
  allergies,
  medications,
  familyHistory,
  activityLevel,
  diet,
  handleChange,
  handlePregnantChange,
  editable = false
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Patient Profile</h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-600 hover:underline"
        >
          {isExpanded ? "🔼 Collapse" : "🔽 Expand"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            disabled
            className="w-full p-2 border rounded-md bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Age</label>
          <input
            type="number"
            name="age"
            value={age}
            disabled={!editable}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${!editable ? "bg-gray-100" : ""}`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <select
            name="gender"
            value={gender}
            disabled={!editable}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${!editable ? "bg-gray-100" : ""}`}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Blood Type</label>
          <select
            name="bloodType"
            value={bloodType}
            disabled={!editable}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${!editable ? "bg-gray-100" : ""}`}
          >
            <option value="">Select Blood Type</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>
      </div>

      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
            <input
              type="number"
              name="height"
              value={height ?? ""}
              disabled={!editable}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${!editable ? "bg-gray-100" : ""}`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
            <input
              type="number"
              name="weight"
              value={weight ?? ""}
              disabled={!editable}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${!editable ? "bg-gray-100" : ""}`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">BMI</label>
            <input
              type="number"
              name="bmi"
              value={bmi ?? ""}
              disabled
              className="w-full p-2 border rounded-md bg-gray-100"
            />
          </div>
          {gender === "Female" && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Pregnant</label>
              <select
                name="isPregnant"
                value={pregnant ? "true" : "false"}
                disabled={!editable}
                onChange={(e) => handlePregnantChange(e.target.value === "true")}
                className={`w-full p-2 border rounded-md ${!editable ? "bg-gray-100" : ""}`}
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Allergies</label>
            <input
              type="text"
              name="allergies"
              value={allergies}
              disabled={!editable}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${!editable ? "bg-gray-100" : ""}`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Medications</label>
            <input
              type="text"
              name="medications"
              value={medications}
              disabled={!editable}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${!editable ? "bg-gray-100" : ""}`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Family History</label>
            <input
              type="text"
              name="familyHistory"
              value={familyHistory}
              disabled={!editable}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${!editable ? "bg-gray-100" : ""}`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Activity Level</label>
            <input
              type="text"
              name="activityLevel"
              value={activityLevel}
              disabled={!editable}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${!editable ? "bg-gray-100" : ""}`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Diet</label>
            <input
              type="text"
              name="diet"
              value={diet}
              disabled={!editable}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${!editable ? "bg-gray-100" : ""}`}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientProfile;
```

