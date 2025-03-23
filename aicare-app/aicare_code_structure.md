## AiCare Codebase Directory Structure
```
aicare-app
    .
    ├── aicare_code_structure.md
    ├── backend
    │   ├── eslint.config.mjs
    │   ├── nest-cli.json
    │   ├── package.json
    │   ├── .prettierrc
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
    ├── cookies.txt
    ├── debugging-tool.ts
    ├── debug.log
    ├── Dockerfile
    ├── .env
    ├── .env.local
    ├── eslint.config.mjs
    ├── generate_structure.sh
    ├── .gitignore
    ├── next.config.ts
    ├── next-env.d.ts
    ├── package.json
    ├── pages
    │   ├── api
    │   │   └── auth
    │   │       └── [...nextauth].ts
    │   └── auth
    ├── postcss.config.js
    ├── postcss.config.mjs
    ├── .prettierrc.json
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
    │   │   ├── 1742356863049-danmkyle@gmail.com.pdf
    │   │   ├── 1742358122224-danmkyle_gmail_com.pdf
    │   │   ├── 1742362988374-danmkyle_gmail_com.pdf
    │   │   ├── 1742516563878-danmkyle_gmail_com.pdf
    │   │   └── 1742516600004-danmkyle_gmail_com.png
    │   ├── vercel.svg
    │   └── window.svg
    ├── README.deploy.md
    ├── README.md
    ├── scripts
    │   ├── build
    │   │   └── generate_code_snapshot.js
    │   └── generate_code_snapshot.ts
    ├── smtp-test.js
    ├── source_code.md
    ├── src
    │   ├── app
    │   │   ├── api
    │   │   │   ├── admin
    │   │   │   │   ├── users
    │   │   │   │   │   └── route.ts
    │   │   │   │   └── users.ts
    │   │   │   ├── auth
    │   │   │   │   ├── forgot-password
    │   │   │   │   │   └── route.ts
    │   │   │   │   ├── reset-password
    │   │   │   │   │   └── route.ts
    │   │   │   │   ├── session
    │   │   │   │   │   └── route-custom.ts
    │   │   │   │   └── signup
    │   │   │   │       └── route.ts
    │   │   │   ├── dashboard
    │   │   │   │   └── profile
    │   │   │   │       └── route.ts
    │   │   │   ├── medical-records
    │   │   │   │   ├── retrieve
    │   │   │   │   │   └── route.ts
    │   │   │   │   └── route.ts
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
    │   │   ├── dashboard
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
    │   │   ├── Providers.tsx
    │   │   └── Sidebar.tsx
    │   ├── lib
    │   │   ├── authOptions.ts
    │   │   └── mongodb.ts
    │   ├── middleware
    │   │   └── auth.ts
    │   ├── middleware.ts
    │   ├── models
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
    │   │   └── UserProfile.ts
    │   └── utils
    │       ├── db.ts
    │       ├── mergeRefs.ts
    │       └── validation.ts
    ├── start.sh
    ├── tailwind.config.js
    ├── test-medical-record.pdf
    ├── trace.log
    ├── tree.txt
    ├── tsconfig.json
    ├── .vercel
    │   ├── project.json
    │   └── README.txt
    └── workspace_code_snapshot.md
```

## File Contents

### /workspaces/aicare/aicare-app/backend/src/app.controller.spec.ts
```
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
```

### /workspaces/aicare/aicare-app/backend/src/app.controller.ts
```
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
```

### /workspaces/aicare/aicare-app/backend/src/app.module.ts
```
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### /workspaces/aicare/aicare-app/backend/src/app.service.ts
```
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
```

### /workspaces/aicare/aicare-app/backend/src/main.ts
```
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
```

### /workspaces/aicare/aicare-app/pages/api/auth/[...nextauth].ts
```
// pages/api/auth/[...nextauth].ts

import NextAuth from "next-auth";
import { authOptions } from "../../../src/lib/authOptions";

export default NextAuth(authOptions);
```

### /workspaces/aicare/aicare-app/src/app/api/admin/users/route.ts
```
import { NextResponse } from "next/server";
import { dbConnect } from "@/utils/db";
import User from "@/models/user";

export async function GET() {
  await dbConnect();
  const users = await User.find({});
  return NextResponse.json(users);
}
```

### /workspaces/aicare/aicare-app/src/app/api/admin/users.ts
```
import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "@/middleware/auth";
import { dbConnect } from "@/utils/db";
import User from "@/models/user";

export async function GET(req: NextRequest) {
  try {
    // Ensure database is connected
    await dbConnect();

    // Apply authentication middleware
    const session = await authMiddleware(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch users from the database
    const users = await User.find({});

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
```

### /workspaces/aicare/aicare-app/src/app/api/auth/forgot-password/route.ts
```
import { dbConnect } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    await dbConnect();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1-hour expiry

    // Save token to user in DB
    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();
    console.log("✅ Reset token saved:", resetToken);

    console.log("🛠 Sending password reset email...");

    // Configure Nodemailer transport
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASS // Use App Password
      }
    });

    // Send email
    const mailOptions = {
      from: `"AiCare Support" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: "Reset Your AiCare Password",
      html: `
        <p>You requested a password reset.</p>
        <p>Click <a href="${process.env.NEXTAUTH_URL}/auth/reset-password?token=${resetToken}">
        here</a> to reset your password.</p>
        <p>If you did not request this, please ignore this email.</p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Reset email sent to:", email);

    return NextResponse.json({
      message: "Reset link sent to email!"
    });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
```

### /workspaces/aicare/aicare-app/src/app/api/auth/reset-password/route.ts
```
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/user";
import { dbConnect } from "@/lib/mongodb";

export async function POST(req: Request) {
  await dbConnect();

  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json({ message: "Missing token or password" }, { status: 400 });
    }

    // Find user with the reset token
    const user = await User.findOne({ resetToken: token });

    if (!user || !user._id) {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 });
    }

    if (!user.password) {
      return NextResponse.json(
        { message: "User does not have a password set. Please use Google login." },
        { status: 400 }
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetToken = undefined; // ✅ Use `undefined` instead of `null`
    await user.save();

    return NextResponse.json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Reset Password Error:", error);
    return NextResponse.json({ message: "Error resetting password" }, { status: 500 });
  }
}
```

### /workspaces/aicare/aicare-app/src/app/api/auth/session/route-custom.ts
```
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/authOptions";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const authHeader = req.headers.get("Authorization");

  console.log("🔍 Received Authorization Header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.error("❌ Missing or invalid Authorization header");
    return NextResponse.json({ error: "Unauthorized - Missing Token" }, { status: 401 });
  }

  const session = await getServerSession(authOptions);
  console.log("🔍 Session Retrieved:", session);

  if (!session) {
    console.error("❌ No session found from getServerSession");
    return NextResponse.json({ error: "Unauthorized - Invalid Session" }, { status: 401 });
  }

  return NextResponse.json(session);
}
```

### /workspaces/aicare/aicare-app/src/app/api/auth/signup/route.ts
```
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { validatePassword } from "@/utils/validation";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();
  await dbConnect();

  // Check if the email is already in use
  if (await User.findOne({ email })) {
    return NextResponse.json({ message: "Email already in use" }, { status: 400 });
  }

  // ✅ Enforce Secure Password Validation
  const passwordError = validatePassword(password);
  if (passwordError) {
    return NextResponse.json({ message: passwordError }, { status: 400 });
  }

  // ✅ Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const newUser = new User({ name, email, password: hashedPassword });
  await newUser.save();

  return NextResponse.json({ message: "User created successfully!" });
}
```

### /workspaces/aicare/aicare-app/src/app/api/dashboard/profile/route.ts
```
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"; // ✅ Import JWT for token verification
import User from "@/models/user";
import { dbConnect } from "@/lib/mongodb";

export async function GET(req: Request) {
  await dbConnect();

  // ✅ Extract Bearer Token
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.error("❌ Missing or invalid Authorization header");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  try {
    // ✅ Verify JWT Token
    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET!) as {
      id: string;
      email: string;
    };

    if (!decoded?.id) {
      console.error("❌ Invalid token payload");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ Fetch User Data from Database
    const user = await User.findById(decoded.id);
    if (!user) {
      console.error("❌ User not found in database");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // ✅ Return User Profile Data
    return NextResponse.json({
      name: user.name,
      email: user.email,
      age: user.age ?? null,
      gender: user.gender ?? "",
      allergies: user.allergies ?? "",
      medications: user.medications ?? "",
      familyHistory: user.familyHistory ?? "",
      activityLevel: user.activityLevel ?? "",
      diet: user.diet ?? "",
      height: user.height ?? null,
      weight: user.weight ?? null,
      bmi: user.bmi ?? null,
      bloodType: user.bloodType ?? "",
      isPregnant: user.isPregnant ?? false,
      profileCompletionSteps: user.profileCompletionSteps || []
    });
  } catch (error) {
    console.error("❌ Invalid or expired token:", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
```

### /workspaces/aicare/aicare-app/src/app/api/medical-records/retrieve/route.ts
```
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { dbConnect } from "@/lib/mongodb";
import MedicalRecord from "@/models/MedicalRecord";

// ✅ Allowed file types for security
const ALLOWED_FILE_TYPES = ["application/pdf", "image/jpeg", "image/png", "application/dicom"];

// ✅ Define a strict type for MongoDB query
interface MedicalRecordQuery {
  userEmail: string;
  fileType?: string;
}

// ✅ Handle file retrieval
export async function GET(req: NextRequest) {
  await dbConnect();

  // ✅ Extract and verify JWT token
  const authHeader = req.headers.get("Authorization") || "";
  console.log("🔍 Debug: Received Authorization Header →", authHeader);

  if (!authHeader.startsWith("Bearer ")) {
    console.warn("❌ Unauthorized request: Missing or malformed Authorization header.");
    return NextResponse.json({ error: "Unauthorized - No token provided" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];
  console.log("🔍 Debug: Extracted Token →", token);

  if (!token || token === "null") {
    console.warn("❌ Unauthorized request: Token is null or invalid.");
    return NextResponse.json({ error: "Unauthorized - Invalid token" }, { status: 401 });
  }

  let userEmail: string | undefined;

  try {
    const decodedToken = jwt.verify(token, process.env.NEXTAUTH_SECRET!) as {
      id: string;
      email: string;
      exp?: number;
    };

    console.log("🔍 Debug: Decoded Token →", decodedToken);

    // ✅ Ensure token is not expired
    if (!decodedToken || !decodedToken.email) {
      console.warn("❌ Unauthorized request: Invalid token structure.");
      return NextResponse.json({ error: "Unauthorized - Invalid token" }, { status: 401 });
    }

    if (decodedToken.exp && Date.now() >= decodedToken.exp * 1000) {
      console.warn("❌ Unauthorized request: Token has expired.");
      return NextResponse.json({ error: "Unauthorized - Token expired" }, { status: 401 });
    }

    userEmail = decodedToken.email;
    console.log("✅ Token Verified: User Email →", userEmail);
  } catch (error) {
    console.error("❌ JWT Verification Failed:", error);
    return NextResponse.json({ error: "Unauthorized - Invalid token" }, { status: 401 });
  }

  try {
    // ✅ Extract and validate query parameters
    const url = new URL(req.url);
    const fileType = url.searchParams.get("type") || undefined; // Optional file type filter
    const limit = Number(url.searchParams.get("limit")) || 10; // Optional limit (default: 10)

    // ✅ Validate file type (only allow predefined types)
    if (fileType && !ALLOWED_FILE_TYPES.includes(fileType)) {
      console.warn(`❌ Invalid file type requested: ${fileType}`);
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    // ✅ Validate limit (ensure reasonable range)
    if (isNaN(limit) || limit < 1 || limit > 100) {
      console.warn(`❌ Invalid limit requested: ${limit}`);
      return NextResponse.json({ error: "Limit must be between 1 and 100" }, { status: 400 });
    }

    // ✅ Use a strictly typed query
    const query: MedicalRecordQuery = { userEmail };
    if (fileType) {
      query.fileType = fileType;
    }

    console.log("🔍 Debug: Querying DB with →", query);

    const records = await MedicalRecord.find(query).limit(limit).sort({ uploadDate: -1 });

    console.log(`✅ Retrieved ${records.length} Records for ${userEmail}`);

    return NextResponse.json({ records });
  } catch (error) {
    console.error("❌ Error fetching medical records:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
```

### /workspaces/aicare/aicare-app/src/app/api/medical-records/route.ts
```
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import jwt from "jsonwebtoken"; // ✅ Use JWT to manually decode token
import MedicalRecord from "@/models/MedicalRecord";
import fs from "fs";
import path from "path";
import mime from "mime-types";

// ✅ Define allowed file types
const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/png", "application/dicom"];

// ✅ Define upload directory (Local for now, can be migrated to Cloud later)
const UPLOAD_DIR = path.join(process.cwd(), "public/uploads");

// ✅ Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// ✅ Handle file uploads using `formData()`
export async function POST(req: NextRequest) {
  await dbConnect();

  // ✅ Extract session manually from request headers
  const authHeader = req.headers.get("Authorization");
  console.log("🔍 Debug: Received Authorization Header →", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("❌ No valid Authorization header found.");
    return NextResponse.json({ error: "Unauthorized - No token provided" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  let userEmail: string | undefined;

  try {
    const decodedToken = jwt.verify(token, process.env.NEXTAUTH_SECRET!) as { email?: string };
    console.log("🔍 Debug: Decoded Token →", decodedToken);

    if (!decodedToken.email) {
      console.log("❌ Token is missing email.");
      return NextResponse.json({ error: "Unauthorized - Token invalid" }, { status: 401 });
    }

    userEmail = decodedToken.email;
    console.log("✅ Token Verified: User Email →", userEmail);
  } catch (error) {
    console.log("❌ JWT Verification Failed:", error);
    return NextResponse.json({ error: "Unauthorized - Invalid token" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // ✅ Validate file type
    const fileType = mime.lookup(file.name);
    if (!fileType || !ALLOWED_TYPES.includes(fileType)) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    // ✅ Generate unique file name
    const fileExtension = mime.extension(fileType);
    const sanitizedEmail = userEmail.replace(/[^a-zA-Z0-9]/g, "_"); // ✅ Remove special characters from email
    const fileName = `${Date.now()}-${sanitizedEmail}.${fileExtension}`;
    const filePath = path.join(UPLOAD_DIR, fileName);

    // ✅ Save file manually
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    // ✅ Save metadata to database
    const newRecord = new MedicalRecord({
      userEmail,
      fileName,
      fileType,
      uploadDate: new Date(),
      filePath: `/uploads/${fileName}`
    });

    await newRecord.save();
    console.log("✅ File uploaded and saved to DB:", newRecord);

    return NextResponse.json({
      message: "File uploaded successfully",
      fileName,
      filePath
    });
  } catch (error) {
    console.error("❌ Error processing file:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: false // ✅ Required for handling file uploads
  }
};
```

### /workspaces/aicare/aicare-app/src/app/api/profile/progress/route.ts
```
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/authOptions";
import User from "@/models/user";
import { dbConnect } from "@/lib/mongodb";

export async function GET() {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    console.log("❌ Unauthorized request");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { email } = session.user;
    const user = await User.findOne({ email });

    if (!user) {
      console.log("❌ User not found");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // List of profile fields that should be filled
    const requiredFields = [
      "age",
      "gender",
      "allergies",
      "medications",
      "familyHistory",
      "activityLevel",
      "diet"
    ];

    // Identify missing fields
    const missingFields = requiredFields.filter((field) => !user[field] || user[field] === "");

    console.log("🔍 Missing profile fields:", missingFields);

    // Calculate completion percentage
    const completedFields = requiredFields.length - missingFields.length;
    const completionPercentage = Math.round((completedFields / requiredFields.length) * 100);

    return NextResponse.json({
      completedSteps: Object.keys(user.toObject()).filter(
        (key) => requiredFields.includes(key) && user[key] !== "" && user[key] !== null
      ),
      missingFields,
      completionPercentage
    });
  } catch (error) {
    console.error("❌ Error fetching profile progress:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
```

### /workspaces/aicare/aicare-app/src/app/api/profile/route.ts
```
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/authOptions";
import User from "@/models/user";
import { dbConnect } from "@/lib/mongodb";

export async function GET() {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { email } = session.user;
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // ✅ Updated profile completion check (includes height, weight, BMI)
    const requiredFields = [
      "age",
      "gender",
      "bloodType",
      "diet",
      "activityLevel",
      "height",
      "weight",
      "bmi"
    ];

    const isProfileComplete = requiredFields.every(
      (field) => user[field] !== "" && user[field] !== null && user[field] !== undefined
    );

    return NextResponse.json({
      name: user.name,
      email: user.email,
      age: user.age || "",
      gender: user.gender || "",
      allergies: user.allergies || "",
      medications: user.medications || "",
      familyHistory: user.familyHistory || "",
      activityLevel: user.activityLevel || "",
      diet: user.diet || "",
      height: user.height || null,
      weight: user.weight || null,
      bmi: user.bmi || null,
      bloodType: user.bloodType || "",
      isPregnant: user.isPregnant ?? false,
      isProfileComplete // ✅ Correct profile completion status
    });
  } catch (error) {
    console.error("❌ Error fetching profile:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
```

### /workspaces/aicare/aicare-app/src/app/api/profile/update/route.ts
```
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/authOptions";
import User from "@/models/user";
import { dbConnect } from "@/lib/mongodb";

export async function PATCH(req: NextRequest) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      console.log("❌ Unauthorized request");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { email } = session.user;

    if (!req.body) {
      console.log("❌ Empty request body");
      return NextResponse.json({ error: "Empty request body" }, { status: 400 });
    }

    const updatedData = await req.json();
    console.log("🔄 Incoming Update Request:", updatedData);

    // ✅ Allowed fields for profile update
    type ProfileFields =
      | "age"
      | "gender"
      | "allergies"
      | "medications"
      | "familyHistory"
      | "activityLevel"
      | "diet"
      | "height"
      | "weight"
      | "bmi"
      | "bloodType"
      | "isPregnant";

    const allowedFields: ProfileFields[] = [
      "age",
      "gender",
      "allergies",
      "medications",
      "familyHistory",
      "activityLevel",
      "diet",
      "height",
      "weight",
      "bmi",
      "bloodType",
      "isPregnant"
    ];

    // ✅ Convert isPregnant from string to boolean
    if (updatedData.isPregnant !== undefined) {
      updatedData.isPregnant = updatedData.isPregnant === "true" || updatedData.isPregnant === true;
    }

    // ✅ Convert numerical fields properly
    const numericalFields: ProfileFields[] = ["age", "height", "weight", "bmi"];
    numericalFields.forEach((field) => {
      if (updatedData[field] !== undefined) {
        updatedData[field] = Number(updatedData[field]) || null;
      }
    });

    // ✅ Filter only the allowed fields to update
    const filteredUpdates: Partial<Record<ProfileFields, string | number | boolean>> = {};
    Object.keys(updatedData).forEach((key) => {
      if (allowedFields.includes(key as ProfileFields) && updatedData[key] !== undefined) {
        filteredUpdates[key as ProfileFields] = updatedData[key];
      }
    });

    if (Object.keys(filteredUpdates).length === 0) {
      console.log("⚠️ No valid fields to update");
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
    }

    // ✅ Fetch current user data
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      console.log("❌ User not found in database");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // ✅ Update completed profile steps
    const completedSteps = new Set(existingUser.profileCompletionSteps);

    Object.keys(filteredUpdates).forEach((key) => {
      if (filteredUpdates[key as ProfileFields]) {
        completedSteps.add(key);
      }
    });

    // ✅ Perform MongoDB Update
    const updatedUser = await User.findOneAndUpdate(
      { email },
      {
        $set: {
          ...filteredUpdates,
          profileCompletionSteps: Array.from(completedSteps)
        }
      },
      { new: true, runValidators: true }
    );

    console.log("✅ Successfully updated user:", updatedUser);

    return NextResponse.json({
      message: "✅ Profile updated successfully",
      user: updatedUser
    });
  } catch (error) {
    console.error("❌ Error updating profile:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
```

### /workspaces/aicare/aicare-app/src/app/api/profile/update.ts
```
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { dbConnect } from "@/utils/db";
import User from "@/models/user";
import { authOptions } from "../../../lib/authOptions";

export async function PATCH(req: NextRequest) {
  try {
    // Connect to the database
    await dbConnect();

    // Authenticate the user
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Parse request body
    const updates = await req.json();

    // Ensure updates contain valid data
    if (!updates || typeof updates !== "object") {
      return NextResponse.json({ message: "Invalid request data" }, { status: 400 });
    }

    // Find and update the user profile
    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Profile updated successfully",
      user: updatedUser
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
```

### /workspaces/aicare/aicare-app/src/app/api/test-db/route.ts
```
import { dbConnect } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    console.log("✅ MongoDB Test Route Called");
    return NextResponse.json({
      message: "✅ Successfully connected to MongoDB"
    });
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    return NextResponse.json({ message: "❌ Failed to connect to MongoDB" }, { status: 500 });
  }
}
```

### /workspaces/aicare/aicare-app/src/app/api/testing/reset-users/route.ts
```
import { dbConnect } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await dbConnect();

    // Delete all users (for testing only)
    await User.deleteMany({});

    return NextResponse.json({
      message: "✅ All test users removed successfully!"
    });
  } catch (error) {
    console.error("Error resetting users:", error);
    return NextResponse.json({ message: "❌ Failed to reset users" }, { status: 500 });
  }
}
```

### /workspaces/aicare/aicare-app/src/app/api/testing/test-db/route.ts
```
import { dbConnect } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    console.log("✅ MongoDB Test Route Called");
    return NextResponse.json({
      message: "✅ Successfully connected to MongoDB"
    });
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    return NextResponse.json({ message: "❌ Failed to connect to MongoDB" }, { status: 500 });
  }
}
```

### /workspaces/aicare/aicare-app/src/app/api/testing/user-count/route.ts
```
import { dbConnect } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    // Count users in the database
    const userCount = await User.countDocuments();

    return NextResponse.json({ userCount });
  } catch (error) {
    console.error("Error getting user count:", error);
    return NextResponse.json({ message: "❌ Failed to get user count" }, { status: 500 });
  }
}
```

### /workspaces/aicare/aicare-app/src/app/assessment/page.tsx
```
"use client";

const Assessment: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600">Smart Assessment Page</h1>
      <p className="text-gray-700 mt-2">This is the smart assessment page content.</p>
    </div>
  );
};

export default Assessment;
```

### /workspaces/aicare/aicare-app/src/app/auth-check/page.tsx
```
"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AuthCheckPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    // If no session, redirect to homepage
    if (!session || !session.user) {
      router.replace("/");
      return;
    }

    // Now TypeScript knows session.user is defined
    if (session.user.isProfileComplete) {
      router.replace("/dashboard");
    } else {
      router.replace("/profile");
    }
  }, [session, status, router]);

  return <p>Loading...</p>;
}
```

### /workspaces/aicare/aicare-app/src/app/auth/forgot-password/page.tsx
```
"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("✅ Password reset link sent to your email.");
    } else {
      setMessage(data.message || "❌ Failed to send reset link.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-8">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center mb-4">Forgot Password</h1>
        <p className="text-sm text-gray-600 text-center mb-4">
          Enter your email to receive a password reset link.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Send Reset Link
          </button>
        </form>

        {message && <p className="mt-4 text-sm text-center">{message}</p>}
      </div>
    </div>
  );
}
```

### /workspaces/aicare/aicare-app/src/app/auth/register/page.tsx
```
"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async () => {
    setError("");
    setSuccess("");

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();

    if (res.ok) {
      setSuccess("Account created! Redirecting to login...");
      setTimeout(() => signIn("credentials", { email, password, callbackUrl: "/profile" }), 2000);
    } else {
      setError(data.message || "Something went wrong");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Section (Black) */}
      <div className="hidden w-1/2 flex-col items-center justify-center bg-black p-8 text-white md:flex">
        <blockquote className="max-w-md space-y-4 text-lg">
          <p>
            &ldquo;This library has saved me countless hours of work and helped me deliver stunning
            designs to my clients faster than ever before.&rdquo;
          </p>
          <footer className="text-sm text-gray-400">— Sofia Davis</footer>
        </blockquote>
      </div>

      {/* Right Section (Form) */}
      <div className="flex w-full flex-col items-center justify-center p-8 md:w-1/2">
        <div className="w-full max-w-sm space-y-6">
          <h1 className="text-2xl font-semibold">Create an account</h1>

          {/* Name input */}
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-black"
          />

          {/* Email input */}
          <input
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-black"
          />

          {/* Password input */}
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-black"
          />

          {/* Error & Success Messages */}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          {/* Sign up Button */}
          <button
            onClick={handleSignup}
            className="w-full rounded bg-black px-4 py-2 text-white hover:bg-gray-800"
          >
            Sign up
          </button>

          {/* Sign in with Google */}
          <button
            type="button"
            onClick={() => signIn("google")}
            className="w-full rounded border border-gray-300 px-4 py-2 hover:bg-gray-50"
          >
            Or Sign in with Google
          </button>

          {/* Terms and Privacy */}
          <p className="text-sm text-gray-600">
            By clicking continue, you agree to our{" "}
            <a href="#" className="underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
```

### /workspaces/aicare/aicare-app/src/app/auth/reset-password/page.tsx
```
import { Suspense } from "react";
import ResetPasswordClient from "./ResetPasswordClient";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ResetPasswordClient />
    </Suspense>
  );
}
```

### /workspaces/aicare/aicare-app/src/app/auth/reset-password/ResetPasswordClient.tsx
```
"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetPasswordClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Retrieve token from search params
  useEffect(() => {
    // Safely check for searchParams, then get the token or default to null
    const maybeToken = searchParams?.get("token") || null;
    setToken(maybeToken);
  }, [searchParams]);

  // Password reset logic
  const handleResetPassword = async () => {
    setError("");

    if (!token) {
      setError("Invalid or expired reset token.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password })
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.message || "Something went wrong.");
    } else {
      setSuccess(true);
      setTimeout(() => router.push("/"), 3000); // Redirect to homepage after 3 sec
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center">Reset Password</h2>
        <p className="text-gray-600 text-center mb-4">Enter your new password below.</p>

        {/* Password Input */}
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-gray-300 p-3 my-2 focus:ring-2 focus:ring-blue-500"
        />

        {/* Confirm Password Input */}
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full rounded-lg border border-gray-300 p-3 my-2 focus:ring-2 focus:ring-blue-500"
        />

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {/* Success Message */}
        {success && (
          <p className="text-green-500 text-sm text-center">
            ✅ Password reset successful! Redirecting...
          </p>
        )}

        {/* Submit Button */}
        <button
          onClick={handleResetPassword}
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg mt-3 hover:bg-blue-700"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}
```

### /workspaces/aicare/aicare-app/src/app/auth/signin/page.tsx
```
"use client";

import { signIn } from "next-auth/react";

const SignInPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Sign In</h1>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        onClick={() => signIn("google")}
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default SignInPage;
```

### /workspaces/aicare/aicare-app/src/app/auth/signup/page.tsx
```
"use client";
import { useState } from "react";

export default function SignupPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  const validatePassword = (password: string) => {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long.");
    }

    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter.");
    }

    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter.");
    }

    if (!/[0-9]/.test(password)) {
      errors.push("Password must contain at least one number.");
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
      errors.push("Password must contain at least one special character.");
    }

    return errors;
  };

  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword);
    const errors = validatePassword(newPassword);
    setPasswordErrors([...errors]); // ✅ Fix: Ensure setPasswordErrors is updated correctly
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center">Create an Account</h2>
        <p className="text-gray-600 text-center mb-4">Enter your details below.</p>

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => handlePasswordChange(e.target.value)}
          className="w-full rounded-lg border border-gray-300 p-3 my-2 focus:ring-2 focus:ring-blue-500"
        />

        {/* Confirm Password Input */}
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full rounded-lg border border-gray-300 p-3 my-2 focus:ring-2 focus:ring-blue-500"
        />

        {/* Password Errors */}
        {passwordErrors.length > 0 && (
          <ul className="text-red-500 text-sm text-left list-disc pl-5">
            {passwordErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}

        {/* Submit Button */}
        <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg mt-3 hover:bg-blue-700">
          Sign Up
        </button>
      </div>
    </div>
  );
}
```

### /workspaces/aicare/aicare-app/src/app/dashboard/page.tsx
```
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import DashboardHeader from "@/components/DashboardHeader";
import PatientProfile from "@/components/PatientProfile";
import Sidebar from "@/components/Sidebar";
import HealthSummary from "@/components/HealthSummary";
import AppointmentList from "@/components/AppointmentList";
import MedicationReminders from "@/components/MedicationReminders";
import ChatbotWidget from "@/components/ChatbotWidget";
import DataVisualization from "@/components/DataVisualization";
import MedicalRecords from "@/components/MedicalRecords";

import type { UserProfile } from "@/types/UserProfile"; // <-- import your new interface

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // 1) Which feature/tab is active
  const [activeFeature, setActiveFeature] = useState<string>("dashboard");

  // 2) Store the user’s profile data in state
  //    Initialize to null, meaning “not yet loaded”
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    if (status === "loading") return; // still checking session

    if (!session) {
      // No session: redirect to homepage
      router.push("/");
      return;
    }

    // Session is valid, fetch the user’s profile
    async function fetchProfile() {
      try {
        const res = await fetch("/api/profile");
        if (res.ok) {
          const data: UserProfile = await res.json();
          setProfileData(data);
        } else {
          console.error("❌ Failed to fetch user profile");
        }
      } catch (error) {
        console.error("❌ Error fetching user profile:", error);
      } finally {
        setLoadingProfile(false);
      }
    }

    fetchProfile();
  }, [session, status, router]);

  // If still loading session or fetching profile, show a spinner or message
  if (status === "loading" || loadingProfile) {
    return <p>Loading your dashboard...</p>;
  }

  // If we have no profile data after loading, show an error or fallback
  if (!profileData) {
    return <p>Couldn’t load your profile. Please try again later.</p>;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen bg-gray-100">
        <Sidebar setActiveFeature={setActiveFeature} />

        <div className="flex-1 flex flex-col p-6 space-y-6 overflow-y-auto">
          <DashboardHeader />

          {activeFeature === "dashboard" && (
            <>
              {/* Pass the actual data from `profileData` to the PatientProfile */}
              <PatientProfile
                name={profileData.name}
                age={profileData.age}
                gender={profileData.gender}
                height={profileData.height}
                weight={profileData.weight}
                bmi={profileData.bmi}
                bloodType={profileData.bloodType}
                pregnant={profileData.isPregnant}
                allergies={profileData.allergies}
                medications={profileData.medications}
                familyHistory={profileData.familyHistory}
                activityLevel={profileData.activityLevel}
                diet={profileData.diet}
                handleChange={() => {}}
                handlePregnantChange={() => {}}
              />
              <HealthSummary />
              <AppointmentList />
              <MedicationReminders />
              <ChatbotWidget />
              <DataVisualization />
            </>
          )}

          {activeFeature === "medicalRecords" && <MedicalRecords />}
        </div>
      </div>
    </DndProvider>
  );
}
```

### /workspaces/aicare/aicare-app/src/app/globals.css
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### /workspaces/aicare/aicare-app/src/app/layout.tsx
```
"use client";

import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // ✅ Hide Navbar on the homepage ("/") and profile setup page ("/profile")
  const hideNavbar = pathname === "/" || pathname === "/profile";

  return (
    <SessionProvider>
      <html lang="en">
        <body>
          <div className="flex flex-col min-h-screen">
            {!hideNavbar && <Navbar />}{" "}
            {/* ✅ Navbar is shown only on pages except login & profile setup */}
            <main className="flex-grow bg-gray-100">{children}</main>
          </div>
        </body>
      </html>
    </SessionProvider>
  );
}
```

### /workspaces/aicare/aicare-app/src/app/medical-records/page.tsx
```
"use client";

import { useEffect, useState } from "react";

interface MedicalRecord {
  _id: string;
  fileName: string;
  fileType: string;
  uploadDate: string;
  filePath: string;
}

export default function MedicalRecordsPage() {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchMedicalRecords();
  }, []);

  const fetchMedicalRecords = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/medical-records/retrieve", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      });
      const data = await res.json();
      setRecords(data.records || []);
    } catch (error) {
      console.error("Error fetching medical records:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/medical-records", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },
        body: formData
      });

      if (res.ok) {
        fetchMedicalRecords();
        setFile(null);
      } else {
        console.error("Upload failed:", await res.json());
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/medical-records/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      });

      if (res.ok) {
        setRecords(records.filter((record) => record._id !== id));
      } else {
        console.error("Delete failed:", await res.json());
      }
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Medical Records</h1>

      <div className="mb-4">
        <input type="file" onChange={handleFileChange} className="border p-2 rounded" />
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="ml-2 bg-blue-500 text-white p-2 rounded"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {loading ? (
        <p>Loading medical records...</p>
      ) : records.length === 0 ? (
        <p>No medical records found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">File Name</th>
              <th className="border p-2">File Type</th>
              <th className="border p-2">Upload Date</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record._id} className="border">
                <td className="border p-2">{record.fileName}</td>
                <td className="border p-2">{record.fileType}</td>
                <td className="border p-2">{new Date(record.uploadDate).toLocaleString()}</td>
                <td className="border p-2">
                  <a href={record.filePath} download className="text-blue-500 underline">
                    Download
                  </a>
                  <button
                    onClick={() => handleDelete(record._id)}
                    className="ml-2 bg-red-500 text-white p-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
```

### /workspaces/aicare/aicare-app/src/app/metadata.ts
```
export const metadata = {
  title: "AiCare",
  description: "Healthcare Management Platform"
};
```

### /workspaces/aicare/aicare-app/src/app/page.tsx
```
"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image"; // ✅ Next.js optimized Image component

export default function LandingPage() {
  const router = useRouter();
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  // ✅ Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Login or Signup
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (isSignup) {
      // ✅ Handle Signup
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullname,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ Auto-login after signup
        const loginResult = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false
        });

        if (!loginResult?.error) {
          router.replace("/auth-check"); // ✅ Redirect to profile check
        } else {
          setError("Signup successful, but auto-login failed. Please log in manually.");
        }
      } else {
        setError(data.message || "Signup failed. Please try again.");
      }
    } else {
      // ✅ Handle Login
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.replace("/auth-check"); // ✅ Redirect to profile check
      }
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      {/* 🚀 Hero Section */}
      <div className="w-full bg-blue-600 text-white text-center py-10 px-6">
        <h1 className="text-4xl font-bold">Welcome to AiCare</h1>
        <p className="text-lg mt-2 max-w-2xl mx-auto">
          Your AI-powered healthcare assistant. Get insights, track symptoms, and manage your
          medical history seamlessly.
        </p>
      </div>

      {/* Authentication Box */}
      <div className="bg-white shadow-lg rounded-lg p-8 mt-2 w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center">
          <Image
            src="/logo.png"
            alt="AiCare Logo"
            width={160} // ✅ Adjusted size for optimization
            height={100}
            priority // ✅ Ensures logo loads fast
            className="mx-auto mb-3"
          />
          <h2 className="text-lg font-semibold">Welcome to AiCare</h2>
          <p className="text-sm text-gray-600">
            {isSignup ? "Create an Account" : "Log in to continue"}
          </p>
        </div>

        {/* Form Section */}
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {/* Full Name Field - Visible for Signup Only */}
          {isSignup && (
            <input
              type="text"
              name="fullname"
              placeholder="Full Name"
              value={formData.fullname}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500"
              required
            />
          )}

          {/* Email Input */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Password Input */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* Login/Sign Up Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700"
          >
            {isSignup ? "Create Account" : "Log In"}
          </button>
        </form>

        {/* Additional Actions */}
        <div className="mt-4 text-center space-y-2">
          {/* Toggle Between Login & Signup */}
          <button
            type="button"
            onClick={() => setIsSignup(!isSignup)}
            className="text-blue-600 hover:underline text-sm font-medium"
          >
            {isSignup ? "Already have an account? Log In" : "Don't have an account? Create Account"}
          </button>

          {/* Forgot Password */}
          <div>
            <a href="/auth/forgot-password" className="text-blue-600 text-sm hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Google Sign-In Button */}
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/auth-check" })}
            className="mt-3 w-full flex items-center justify-center space-x-2 rounded-lg border border-gray-300 px-4 py-3 hover:bg-gray-100"
          >
            <Image src="/google-icon.png" alt="Google" width={20} height={20} className="w-5 h-5" />
            <span>Sign in with Google</span>
          </button>
        </div>

        {/* Footer Section */}
        <div className="mt-4 text-center text-xs text-gray-500">
          <a href="#" className="hover:underline">
            Terms of Service
          </a>{" "}
          |{" "}
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
}
```

### /workspaces/aicare/aicare-app/src/app/profile/page.tsx
```
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MultiStepProfile from "@/components/MultiStepProfile";

export default function ProfilePage() {
  const router = useRouter();
  const [isProfileComplete, setIsProfileComplete] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkProfileCompletion() {
      try {
        const res = await fetch("/api/profile/progress");
        if (res.ok) {
          const { completionPercentage } = await res.json();
          setIsProfileComplete(completionPercentage === 100);
        }
      } catch (error) {
        console.error("❌ Error checking profile:", error);
        setIsProfileComplete(false);
      }
    }

    checkProfileCompletion();
  }, []);

  useEffect(() => {
    if (isProfileComplete) {
      router.replace("/dashboard"); // Redirect to dashboard if profile is already complete
    }
  }, [isProfileComplete, router]);

  if (isProfileComplete === null) {
    return <p>Loading...</p>;
  }

  return <MultiStepProfile />;
}
```

### /workspaces/aicare/aicare-app/src/app/profile/setup/page.tsx
```
"use client";

import { useState } from "react";

export default function ProfileSetupTest() {
  const [message, setMessage] = useState("");

  const handleTestUpdate = async () => {
    const res = await fetch("/api/profile/update", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        age: 30,
        gender: "Male",
        healthGoal: "Improve fitness"
      })
    });

    const data = await res.json();
    setMessage(data.message || "Error updating profile");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Test Profile Update</h1>
      <button className="bg-blue-500 text-white p-2 rounded mt-4" onClick={handleTestUpdate}>
        Test API
      </button>
      {message && <p className="mt-2 text-green-600">{message}</p>}
    </div>
  );
}
```

### /workspaces/aicare/aicare-app/src/components/AppointmentList.tsx
```
"use client";

export default function AppointmentList() {
  // Sample appointment data (Replace with API data in the future)
  const appointments = [
    { id: 1, doctor: "Dr. Lisa Brown", date: "March 20", time: "10:00 AM" },
    { id: 2, doctor: "Dr. John Smith", date: "April 2", time: "2:00 PM" },
    { id: 3, doctor: "Dr. Emily Davis", date: "April 10", time: "4:30 PM" }
  ];

  return (
    <section className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Appointments</h2>

      <ul className="space-y-4">
        {appointments.map((appointment) => (
          <li
            key={appointment.id}
            className="p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-sm"
          >
            <p className="text-lg font-semibold text-gray-900">{appointment.doctor}</p>
            <p className="text-gray-700">
              {appointment.date} at {appointment.time}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

### /workspaces/aicare/aicare-app/src/components/Button.tsx
```
"use client";

import * as React from "react";

type ButtonProps = {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" {...props}>
      {children}
    </button>
  );
};
```

### /workspaces/aicare/aicare-app/src/components/ChatbotWidget.tsx
```
"use client";

import { useState } from "react";

export default function ChatbotWidget() {
  const [messages, setMessages] = useState([
    { id: 1, sender: "bot", text: "Hello! How can I assist you today?" }
  ]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message to chat
    const newMessages = [...messages, { id: messages.length + 1, sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    // Simulate bot response (replace with API later)
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: prevMessages.length + 1,
          sender: "bot",
          text: "I'm analyzing your symptoms..."
        }
      ]);
    }, 1000);
  };

  return (
    <section className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">AI Chatbot</h2>

      {/* Chat Window */}
      <div className="h-48 overflow-y-auto border border-gray-300 p-4 bg-gray-100 rounded-lg mb-4">
        {messages.map((msg) => (
          <p
            key={msg.id}
            className={`p-3 my-1 rounded-md max-w-xs ${
              msg.sender === "user"
                ? "bg-blue-500 text-white self-end ml-auto"
                : "bg-gray-200 text-gray-900 self-start"
            }`}
          >
            {msg.text}
          </p>
        ))}
      </div>

      {/* Chat Input */}
      <div className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border border-gray-300 rounded-lg"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          Send
        </button>
      </div>
    </section>
  );
}
```

### /workspaces/aicare/aicare-app/src/components/DashboardHeader.tsx
```
"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

export default function DashboardHeader() {
  const { data: session } = useSession();

  return (
    <header className="flex justify-between items-center bg-gray-900 text-white p-4 rounded-lg shadow-lg">
      {/* Dashboard Title */}
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* User Profile & Notifications */}
      <div className="flex items-center space-x-4">
        {/* Notification Bell (Placeholder for real notifications) */}
        <button className="relative p-2 bg-blue-600 hover:bg-blue-700 rounded-full transition">
          🔔
        </button>

        {/* User Profile */}
        {session?.user ? (
          <div className="flex items-center space-x-3 bg-gray-800 px-4 py-2 rounded-md">
            <Image
              src={session.user.image || "/assets/avatar.png"}
              alt="User Avatar"
              width={36}
              height={36}
              className="rounded-full border border-gray-500"
            />
            <span className="text-sm">{session.user.name}</span>
          </div>
        ) : (
          <span className="text-sm text-gray-300">Not Logged In</span>
        )}
      </div>
    </header>
  );
}
```

### /workspaces/aicare/aicare-app/src/components/DataVisualization.tsx
```
"use client"; // ✅ Ensures this component runs only on the client side

import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2"; // ✅ Directly import without dynamic()
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function DataVisualization() {
  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [] as {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
      fill: boolean;
      tension: number;
    }[]
  });

  useEffect(() => {
    // Simulated health trend data (to be replaced with API data)
    const data = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Blood Pressure (mmHg)",
          data: [120, 125, 130, 128, 126, 124],
          borderColor: "#4F46E5", // AiCare Theme Color
          backgroundColor: "rgba(79, 70, 229, 0.2)", // AiCare Theme Shade
          pointBorderColor: "#4F46E5",
          fill: true,
          tension: 0.4
        },
        {
          label: "Heart Rate (bpm)",
          data: [72, 75, 78, 76, 74, 72],
          borderColor: "#DC2626", // AiCare Red Highlight
          backgroundColor: "rgba(220, 38, 38, 0.2)",
          pointBorderColor: "#DC2626",
          fill: true,
          tension: 0.4
        }
      ]
    };

    setChartData(data);
  }, []);

  return (
    <section className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Health Trends</h2>
      <div className="w-full h-64">
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
                position: "top"
              }
            },
            scales: {
              x: {
                grid: {
                  color: "rgba(0, 0, 0, 0.1)"
                }
              },
              y: {
                grid: {
                  color: "rgba(0, 0, 0, 0.1)"
                },
                ticks: {
                  stepSize: 5
                }
              }
            }
          }}
        />
      </div>
    </section>
  );
}
```

### /workspaces/aicare/aicare-app/src/components/DraggableWidget.tsx
```
"use client";

import * as React from "react"; // ✅ Fixes TypeScript import issues
import { useRef, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { motion } from "framer-motion";

// Define the widget type for Drag & Drop
const WIDGET_TYPE = "widget"; // ✅ Ensure this is defined here

// Props Interface
interface DraggableWidgetProps {
  id: string;
  index: number;
  moveWidget: (fromIndex: number, toIndex: number) => void;
  isCollapsed: boolean;
  toggleCollapse: () => void;
  children: React.ReactNode;
}

const DraggableWidget: React.FC<DraggableWidgetProps> = ({
  id,
  index,
  moveWidget,
  isCollapsed,
  toggleCollapse,
  children
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  // Define drag behavior using react-dnd
  const [{ isDragging }, drag] = useDrag({
    type: WIDGET_TYPE, // ✅ Make sure type is consistent with the defined WIDGET_TYPE
    item: { id, index }, // Pass necessary data for dragging
    collect: (monitor) => ({
      isDragging: monitor.isDragging() // Track drag status
    })
  });

  const [, drop] = useDrop({
    accept: WIDGET_TYPE, // Accept only items of type WIDGET_TYPE
    hover: (draggedItem: { index: number }) => {
      // Handle hover behavior for rearranging
      if (draggedItem.index !== index) {
        moveWidget(draggedItem.index, index); // Move the widget when dragged
        draggedItem.index = index; // Update the index
      }
    }
  });

  // Apply drag & drop using useEffect and ensure ref is properly assigned
  useEffect(() => {
    if (ref.current) {
      drag(drop(ref.current)); // Connect drag and drop to the element
    }
  }, [drag, drop]);

  return (
    <motion.div
      ref={ref} // ✅ Correctly assign the ref for drag-and-drop
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`p-4 bg-white rounded-lg shadow-md cursor-move transition-opacity duration-200 ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      {/* Widget Header */}
      <div className="flex justify-between items-center">
        <button onClick={toggleCollapse} className="text-gray-600 hover:text-gray-800">
          {isCollapsed ? "🔼 Expand" : "🔽 Collapse"}
        </button>
      </div>
      {/* Widget Content */}
      {!isCollapsed && children} {/* Render children when not collapsed */}
    </motion.div>
  );
};

export default DraggableWidget;
```

### /workspaces/aicare/aicare-app/src/components/HealthSummary.tsx
```
"use client";

export default function HealthSummary() {
  return (
    <section className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Health Summary</h2>

      {/* Unified Card Design (Similar to Medication Reminders) */}
      <div className="space-y-4">
        {/* AI Health Insights */}
        <div className="p-4 bg-blue-100 border border-blue-300 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-blue-800">AI Health Insights</h3>
          <p className="text-gray-700 mt-2">You should drink more water today.</p>
        </div>

        {/* Upcoming Appointments */}
        <div className="p-4 bg-green-100 border border-green-300 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-green-800">Upcoming Appointments</h3>
          <p className="text-gray-700 mt-2">Dr. Lisa Brown - March 20, 10:00 AM</p>
        </div>

        {/* Medication Reminders */}
        <div className="p-4 bg-yellow-100 border border-yellow-300 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-yellow-800">Medication Reminder</h3>
          <p className="text-gray-700 mt-2">Paracetamol (500mg) - 8:00 AM</p>
        </div>
      </div>
    </section>
  );
}
```

### /workspaces/aicare/aicare-app/src/components/Layout.tsx
```
import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata = {
  title: "AiCare",
  description: "Healthcare Management Platform"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow bg-gray-100">{children}</main>
        </div>
      </body>
    </html>
  );
}
```

### /workspaces/aicare/aicare-app/src/components/MedicalRecords.tsx
```
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface MedicalRecord {
  _id: string;
  fileName: string;
  fileType: string;
  uploadDate: string;
  filePath: string;
}

export default function MedicalRecords() {
  const { data: session } = useSession();
  const accessToken = session?.accessToken ?? ""; // ✅ Fix: Ensure `accessToken` is correctly retrieved

  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // ✅ Fetch user's medical records
  const fetchRecords = async () => {
    if (!accessToken) {
      setError("User not authenticated");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/medical-records/retrieve", {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (!res.ok) throw new Error("Failed to fetch records");
      const data = await res.json();
      setRecords(data.records);
    } catch (err) {
      setError("Error fetching medical records.");
      console.error("❌ Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  // ✅ Upload file
  const handleUpload = async () => {
    if (!selectedFile) return;
    if (!accessToken) {
      setError("User not authenticated");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const res = await fetch("/api/medical-records", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        body: formData
      });

      if (!res.ok) throw new Error("Upload failed");
      fetchRecords(); // Refresh records after upload
    } catch (err) {
      setError("Error uploading file.");
      console.error("❌ Upload Error:", err);
    } finally {
      setLoading(false);
      setSelectedFile(null);
    }
  };

  // ✅ Delete record
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this record?")) return;
    if (!accessToken) {
      setError("User not authenticated");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/medical-records/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (!res.ok) throw new Error("Failed to delete record");
      setRecords((prevRecords) => prevRecords.filter((record) => record._id !== id));
    } catch (err) {
      setError("Error deleting record.");
      console.error("❌ Delete Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.accessToken) {
      fetchRecords();
    }
  }, [session?.accessToken]); // ✅ Fix: Ensure reactivity to accessToken updates

  return (
    <section className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Medical Records</h2>

      {/* Upload Section */}
      <div className="mb-4 flex gap-4">
        <input type="file" onChange={handleFileChange} className="border p-2 rounded-lg" />
        <button
          onClick={handleUpload}
          disabled={!selectedFile || loading}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Records List */}
      {loading ? (
        <p>Loading...</p>
      ) : records.length === 0 ? (
        <p>No medical records found.</p>
      ) : (
        <ul className="space-y-4">
          {records.map((record) => (
            <li
              key={record._id}
              className="p-4 bg-gray-100 border border-gray-300 rounded-lg flex justify-between"
            >
              <div>
                <p className="font-semibold">{record.fileName}</p>
                <p className="text-sm text-gray-600">
                  {new Date(record.uploadDate).toLocaleDateString()}
                </p>
                <a
                  href={record.filePath}
                  download
                  className="text-blue-500 hover:underline text-sm"
                >
                  Download
                </a>
              </div>
              <button
                onClick={() => handleDelete(record._id)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
```

### /workspaces/aicare/aicare-app/src/components/MedicationReminders.tsx
```
"use client";

export default function MedicationReminders() {
  // Sample medication reminders (this will later be fetched from an API)
  const reminders = [
    {
      id: 1,
      name: "Paracetamol",
      dosage: "500mg",
      time: "8:00 AM",
      status: "Taken"
    },
    {
      id: 2,
      name: "Ibuprofen",
      dosage: "200mg",
      time: "6:00 PM",
      status: "Missed"
    },
    {
      id: 3,
      name: "Metformin",
      dosage: "850mg",
      time: "9:00 PM",
      status: "Taken"
    }
  ];

  return (
    <section className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Medication Reminders</h2>

      <ul className="space-y-4">
        {reminders.map((med) => (
          <li
            key={med.id}
            className={`p-4 rounded-lg shadow-sm flex justify-between items-center border ${
              med.status === "Missed"
                ? "bg-red-100 border-red-300"
                : "bg-green-100 border-green-300"
            } hover:shadow-md transition-shadow duration-300`}
          >
            <div>
              <p className="text-gray-900 font-medium text-lg">
                {med.name} ({med.dosage})
              </p>
              <p className="text-gray-700 text-sm">{med.time}</p>
            </div>
            <span
              className={`px-3 py-1 text-sm font-semibold rounded-lg ${
                med.status === "Missed" ? "bg-red-500 text-white" : "bg-green-500 text-white"
              }`}
            >
              {med.status}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

### /workspaces/aicare/aicare-app/src/components/MultiStepProfile.tsx
```
"use client";

import { useState, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";

const steps = ["Basic Info", "Physical Attributes", "Medical History", "Lifestyle"];

interface ProfileData {
  name: string;
  age: number;
  gender: string;
  height: number | null;
  weight: number | null;
  bmi: number | null;
  bloodType: string;
  isPregnant: boolean;
  allergies: string;
  medications: string;
  familyHistory: string;
  activityLevel: string;
  diet: string;
}

export default function MultiStepProfile() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    age: 0,
    gender: "",
    height: null,
    weight: null,
    bmi: null,
    bloodType: "",
    isPregnant: false,
    allergies: "",
    medications: "",
    familyHistory: "",
    activityLevel: "",
    diet: ""
  });

  useEffect(() => {
    async function fetchProfileData() {
      try {
        const res = await fetch("/api/profile");
        if (res.ok) {
          const data = await res.json();
          setProfile({
            name: data.name || "",
            age: data.age ?? 0,
            gender: data.gender || "",
            height: data.height ?? null,
            weight: data.weight ?? null,
            bmi: data.bmi ?? null,
            bloodType: data.bloodType || "",
            isPregnant: data.isPregnant ?? false,
            allergies: data.allergies || "",
            medications: data.medications || "",
            familyHistory: data.familyHistory || "",
            activityLevel: data.activityLevel || "",
            diet: data.diet || ""
          });
        }
      } catch (error) {
        console.error("❌ Error fetching profile:", error);
      }
    }

    fetchProfileData();
  }, []);

  // ✅ Handle Input Changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let updatedValue: string | number | boolean | null = value;

    if (["age", "height", "weight"].includes(name)) {
      updatedValue = Number(value);
    } else if (name === "isPregnant") {
      updatedValue = value === "true";
    }

    setProfile((prev) => {
      const updatedProfile = { ...prev, [name]: updatedValue };

      // ✅ Auto-calculate BMI when height or weight changes
      if (name === "height" || name === "weight") {
        const { height, weight } = updatedProfile;
        if (height && weight) {
          const heightInMeters = height / 100;
          updatedProfile.bmi = parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(1));
        } else {
          updatedProfile.bmi = null;
        }
      }

      return updatedProfile;
    });
  };

  // ✅ Step Navigation Handlers
  const handleNext = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 0));
  const handleSkip = () => router.replace("/dashboard");

  // ✅ Save Profile and Go to Dashboard
  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      await fetch("/api/profile/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile)
      });

      router.replace("/dashboard");
    } catch (error) {
      console.error("❌ Error updating profile:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold">Profile Setup</h1>
      <p className="text-gray-600 mb-4">
        Step {step + 1} of {steps.length}: {steps[step]}
      </p>

      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        {/* ✅ Step 1: Basic Info */}
        {step === 0 && (
          <>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              disabled
              className="w-full p-2 mb-3 border bg-gray-100"
            />

            <label className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              name="age"
              value={profile.age}
              onChange={handleChange}
              className="w-full p-2 mb-3 border"
            />

            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              name="gender"
              value={profile.gender}
              onChange={handleChange}
              className="w-full p-2 mb-3 border"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            {profile.gender === "Female" && (
              <>
                <label className="block text-sm font-medium text-gray-700">Pregnant</label>
                <select
                  name="isPregnant"
                  value={profile.isPregnant ? "true" : "false"}
                  onChange={handleChange}
                  className="w-full p-2 mb-3 border"
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </>
            )}
          </>
        )}

        {/* ✅ Step 2: Physical Attributes */}
        {step === 1 && (
          <>
            <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
            <input
              type="number"
              name="height"
              value={profile.height ?? ""}
              onChange={handleChange}
              className="w-full p-2 mb-3 border"
            />

            <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
            <input
              type="number"
              name="weight"
              value={profile.weight ?? ""}
              onChange={handleChange}
              className="w-full p-2 mb-3 border"
            />

            <label className="block text-sm font-medium text-gray-700">BMI</label>
            <input
              type="number"
              name="bmi"
              value={profile.bmi ?? ""}
              disabled
              className="w-full p-2 mb-3 border bg-gray-100"
            />
          </>
        )}

        {/* ✅ Step 3: Medical History */}
        {step === 2 && (
          <>
            <label className="block text-sm font-medium text-gray-700">Blood Type</label>
            <input
              type="text"
              name="bloodType"
              value={profile.bloodType}
              onChange={handleChange}
              className="w-full p-2 mb-3 border"
            />

            <label className="block text-sm font-medium text-gray-700">Allergies</label>
            <input
              type="text"
              name="allergies"
              value={profile.allergies}
              onChange={handleChange}
              className="w-full p-2 mb-3 border"
            />
          </>
        )}

        {/* ✅ Step 4: Lifestyle */}
        {step === 3 && (
          <>
            <label className="block text-sm font-medium text-gray-700">Family History</label>
            <input
              type="text"
              name="familyHistory"
              value={profile.familyHistory}
              onChange={handleChange}
              className="w-full p-2 mb-3 border"
            />

            <label className="block text-sm font-medium text-gray-700">Activity Level</label>
            <input
              type="text"
              name="activityLevel"
              value={profile.activityLevel}
              onChange={handleChange}
              className="w-full p-2 mb-3 border"
            />

            <label className="block text-sm font-medium text-gray-700">Diet</label>
            <input
              type="text"
              name="diet"
              value={profile.diet}
              onChange={handleChange}
              className="w-full p-2 mb-3 border"
            />
          </>
        )}

        {/* ✅ Step Navigation Buttons */}
        <div className="flex justify-between mt-4">
          {step > 0 && (
            <button
              onClick={handlePrev}
              className="w-2/5 bg-gray-400 text-white p-2 rounded hover:bg-gray-500"
            >
              Back
            </button>
          )}
          {step < steps.length - 1 ? (
            <button
              onClick={handleNext}
              className="w-2/5 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSaveProfile}
              className="w-2/5 bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          )}
        </div>

        <button onClick={handleSkip} className="mt-4 text-sm text-gray-500 underline">
          Skip for now
        </button>
      </div>
    </div>
  );
}
```

### /workspaces/aicare/aicare-app/src/components/Navbar.tsx
```
"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false }); // Sign out user
    router.push("/"); // Redirect to homepage
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* AiCare Logo */}
        <h1 className="text-2xl font-bold">AiCare</h1>

        {/* Navigation Links */}
        <div className="flex space-x-6 items-center">
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link href="/profile" className="hover:text-gray-300">
            Profile
          </Link>
          <Link href="/assessment" className="hover:text-gray-300">
            Smart Assessment
          </Link>

          {/* Show User Info & Logout Button ONLY if Logged In */}
          {session && session.user && (
            <div className="flex items-center space-x-3">
              <Image
                src={session.user.image || "/assets/avatar.png"} // User avatar or default avatar
                alt="User Avatar"
                width={36}
                height={36}
                className="rounded-full border border-gray-500"
              />
              <span className="text-sm">{session.user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-sm"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
```

### /workspaces/aicare/aicare-app/src/components/PasswordRequirements.tsx
```
import React from "react";

interface PasswordRequirementsProps {
  password: string;
}

export default function PasswordRequirements({ password }: PasswordRequirementsProps) {
  return (
    <div className="text-sm text-gray-600 space-y-1 mt-2">
      <p className={password.length >= 8 ? "text-green-500" : "text-red-500"}>
        {password.length >= 8 ? "✅" : "❌"} At least 8 characters
      </p>
      <p className={/[A-Z]/.test(password) ? "text-green-500" : "text-red-500"}>
        {/[A-Z]/.test(password) ? "✅" : "❌"} At least one uppercase letter
      </p>
      <p className={/[a-z]/.test(password) ? "text-green-500" : "text-red-500"}>
        {/[a-z]/.test(password) ? "✅" : "❌"} At least one lowercase letter
      </p>
      <p className={/[0-9]/.test(password) ? "text-green-500" : "text-red-500"}>
        {/[0-9]/.test(password) ? "✅" : "❌"} At least one number
      </p>
      <p className={/[!@#$%^&*(),.?":{}|<>]/.test(password) ? "text-green-500" : "text-red-500"}>
        {/[!@#$%^&*(),.?":{}|<>]/.test(password) ? "✅" : "❌"} At least one special character
      </p>
    </div>
  );
}
```

### /workspaces/aicare/aicare-app/src/components/PatientProfile.tsx
```
"use client";
import { useState } from "react";
import { ChangeEvent } from "react"; // ✅ Import ChangeEvent from React

interface PatientProfileProps {
  name: string;
  age: number;
  gender: string;
  height: number | null;
  weight: number | null;
  bmi: number | null;
  bloodType: string;
  pregnant: boolean; // ✅ Ensure correct prop name
  allergies: string;
  medications: string;
  familyHistory: string;
  activityLevel: string;
  diet: string;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handlePregnantChange: (value: boolean) => void; // ✅ This must be passed from Dashboard
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
  handlePregnantChange // ✅ Accept new handler
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

      {/* Essential Details (Always Visible) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
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
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <select
            name="gender"
            value={gender}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
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
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
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

      {/* Expanded Details (Hidden Until Expanded) */}
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
            <input
              type="number"
              name="height"
              value={height || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
            <input
              type="number"
              name="weight"
              value={weight || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">BMI</label>
            <input
              type="number"
              name="bmi"
              value={bmi || ""}
              disabled
              className="w-full p-2 border rounded-md bg-gray-100"
            />
          </div>

          {/* ✅ Show Pregnant Field Only for Female */}
          {/* ✅ Show Pregnant Field Only for Female */}
          {gender === "Female" && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Pregnant</label>
              <select
                name="isPregnant"
                value={pregnant ? "true" : "false"}
                onChange={(e) => handlePregnantChange(e.target.value === "true")} // ✅ Pass boolean directly
                className="w-full p-2 border rounded-md"
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
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Medications</label>
            <input
              type="text"
              name="medications"
              value={medications}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Family History</label>
            <input
              type="text"
              name="familyHistory"
              value={familyHistory}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Activity Level</label>
            <input
              type="text"
              name="activityLevel"
              value={activityLevel}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Diet</label>
            <input
              type="text"
              name="diet"
              value={diet}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientProfile;
```

### /workspaces/aicare/aicare-app/src/components/Providers.tsx
```
"use client";

import { SessionProvider } from "next-auth/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
```

### /workspaces/aicare/aicare-app/src/components/Sidebar.tsx
```
"use client";

import { useState } from "react";

interface SidebarProps {
  setActiveFeature: (feature: string) => void;
}

export default function Sidebar({ setActiveFeature }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`h-screen p-4 transition-all text-white shadow-md ${
        isCollapsed ? "w-16 bg-indigo-700" : "w-64 bg-gradient-to-b from-indigo-600 to-blue-800"
      }`}
    >
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="mb-4 p-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition"
      >
        {isCollapsed ? "➡️" : "⬅️"}
      </button>

      {/* Navigation Links */}
      <nav className="space-y-4">
        <button
          onClick={() => setActiveFeature("dashboard")}
          className="block p-2 hover:bg-indigo-700 rounded transition w-full text-left"
        >
          🏠 {isCollapsed ? "" : "Dashboard"}
        </button>
        <button
          onClick={() => setActiveFeature("chatbot")}
          className="block p-2 hover:bg-indigo-700 rounded transition w-full text-left"
        >
          💬 {isCollapsed ? "" : "Chatbot"}
        </button>
        <button
          onClick={() => setActiveFeature("appointments")}
          className="block p-2 hover:bg-indigo-700 rounded transition w-full text-left"
        >
          📅 {isCollapsed ? "" : "Appointments"}
        </button>
        <button
          onClick={() => setActiveFeature("medications")}
          className="block p-2 hover:bg-indigo-700 rounded transition w-full text-left"
        >
          💊 {isCollapsed ? "" : "Medications"}
        </button>
        <button
          onClick={() => setActiveFeature("medicalRecords")}
          className="block p-2 hover:bg-indigo-700 rounded transition w-full text-left"
        >
          📂 {isCollapsed ? "" : "Medical Records"}
        </button>
        <button
          onClick={() => setActiveFeature("settings")}
          className="block p-2 hover:bg-indigo-700 rounded transition w-full text-left"
        >
          ⚙️ {isCollapsed ? "" : "Settings"}
        </button>
      </nav>
    </aside>
  );
}
```

### /workspaces/aicare/aicare-app/src/lib/authOptions.ts
```
import type { NextAuthOptions } from "next-auth";
// import type { Account, Profile, User as NextAuthUser } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { dbConnect } from "@/utils/db";
import User, { type IUser } from "@/models/user";

type ExtendedUser = {
  id: string;
  email?: string | null;
  name?: string | null;
  image?: string | null;
  isProfileComplete?: boolean;
};

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        await dbConnect();

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        const user = (await User.findOne({ email: credentials.email }).lean()) as IUser | null;
        if (!user?._id) {
          throw new Error("User not found");
        }

        // Check if user registered with Google
        if (!user.password) {
          throw new Error("User registered with Google. Please sign in with Google.");
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Invalid credentials");
        }

        // Return user object for JWT callback
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          image: user.image ?? null,
          isProfileComplete: user.isProfileComplete ?? false
        } as ExtendedUser;
      }
    })
  ],

  session: {
    strategy: "jwt"
  },

  callbacks: {
    async signIn({ user, account, profile }) {
      await dbConnect();
      if (account?.provider === "google" && profile) {
        const extUser = user as ExtendedUser;
        const existingUser = (await User.findOne({ email: extUser.email })) as IUser | null;
        if (!existingUser) {
          const newUser = await User.create({
            name: extUser.name,
            email: extUser.email,
            googleId: account.providerAccountId,
            image: extUser.image,
            isProfileComplete: false,
            profileCompletionSteps: []
          });
          extUser.id = newUser._id.toString();
          extUser.isProfileComplete = newUser.isProfileComplete ?? false;
        } else {
          extUser.id = existingUser._id.toString();
          extUser.isProfileComplete = existingUser.isProfileComplete ?? false;
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        const extUser = user as ExtendedUser;
        token.id = extUser.id;
        token.email = extUser.email ?? "";
        token.name = extUser.name ?? "";
        token.image = extUser.image ?? "";
        token.isProfileComplete = extUser.isProfileComplete ?? false;
        token.accessToken = jwt.sign(
          { id: extUser.id, email: extUser.email },
          process.env.NEXTAUTH_SECRET!,
          { expiresIn: "30d" }
        );
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id ?? "",
        name: token.name ?? "",
        email: token.email ?? "",
        image: token.image ?? "",
        isProfileComplete: Boolean(token.isProfileComplete)
      };
      session.accessToken = token.accessToken ?? "";
      return session;
    }
  },

  debug: true
};
```

### /workspaces/aicare/aicare-app/src/lib/mongodb.ts
```
/* eslint-disable no-var */
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("⚠️ MONGODB_URI is not defined in environment variables.");
}

// ✅ Define a global type for mongoose caching
interface MongooseCache {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
}

// ✅ Explicitly extend `globalThis` to avoid TypeScript errors
declare global {
  // Use `var` here to ensure it's declared in the global scope

  var mongooseCache: MongooseCache | undefined;
}

// ✅ Use a local-scoped cache with proper typing
const cached: MongooseCache = globalThis.mongooseCache ?? {
  conn: null,
  promise: null
};

export async function dbConnect(): Promise<mongoose.Connection> {
  if (cached.conn) {
    console.log("✅ Using existing MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("⏳ Connecting to MongoDB...");
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "AiCareDB",
        bufferCommands: false
      })
      .then((mongoose) => {
        console.log("✅ Successfully connected to MongoDB");
        return mongoose.connection;
      })
      .catch((error) => {
        console.error("❌ MongoDB connection error:", error);
        throw new Error("MongoDB connection failed");
      });
  }

  cached.conn = await cached.promise;
  globalThis.mongooseCache = cached; // ✅ Properly assigning to `globalThis`
  return cached.conn;
}
```

### /workspaces/aicare/aicare-app/src/middleware/auth.ts
```
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function authMiddleware(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  return session;
}
```

### /workspaces/aicare/aicare-app/src/middleware.ts
```
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

/**
 * This middleware:
 * 1. Skips checks for NextAuth routes and Next.js internal paths (avoiding sign-in loops).
 * 2. Verifies the user’s JWT token (cookie-based by default).
 * 3. Optionally checks the user’s profile completion and redirects to /profile if incomplete.
 */
export async function middleware(req: NextRequest) {
  // 1) Skip middleware for auth routes, Next.js internal assets, or static files.
  if (
    req.nextUrl.pathname.startsWith("/api/auth") ||
    req.nextUrl.pathname.startsWith("/_next") ||
    req.nextUrl.pathname.startsWith("/static") ||
    req.nextUrl.pathname.startsWith("/favicon.ico")
  ) {
    return NextResponse.next();
  }

  // 2) Retrieve token from cookies via NextAuth JWT strategy.
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    // Redirect to homepage if not logged in
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 3) Optional: Check profile completion status
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/profile/progress`, {
      headers: { Cookie: req.headers.get("cookie") ?? "" }
    });

    if (res.ok) {
      const { completionPercentage } = await res.json();
      if (completionPercentage < 100 && req.nextUrl.pathname !== "/profile") {
        return NextResponse.redirect(new URL("/profile", req.url));
      }
    }
  } catch (error) {
    console.error("❌ Error fetching profile progress:", error);
  }

  return NextResponse.next();
}

// Apply middleware only to dashboard routes
export const config = {
  matcher: ["/dashboard/:path*"]
};
```

### /workspaces/aicare/aicare-app/src/models/MedicalRecord.ts
```
import mongoose, { Schema, Document } from "mongoose";

interface IMedicalRecord extends Document {
  userEmail: string;
  fileName: string;
  fileType: string;
  uploadDate: Date;
  filePath: string;
}

const MedicalRecordSchema = new Schema<IMedicalRecord>({
  userEmail: { type: String, required: true },
  fileName: { type: String, required: true },
  fileType: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
  filePath: { type: String, required: true }
});

const MedicalRecord =
  mongoose.models.MedicalRecord ||
  mongoose.model<IMedicalRecord>("MedicalRecord", MedicalRecordSchema);

export default MedicalRecord;
```

### /workspaces/aicare/aicare-app/src/models/User.ts
```
import mongoose, { Schema, Document, Model, Types } from "mongoose";

/**
 * 1) Define the IUser interface, explicitly including `_id` as `Types.ObjectId`.
 */
export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  googleId?: string;
  image?: string;
  resetToken?: string;
  resetTokenExpiry?: Date;
  role: "Admin" | "User";
  age?: number;
  gender?: string;
  allergies?: string;
  medications?: string;
  familyHistory?: string;
  activityLevel?: string;
  diet?: string;
  height?: number;
  weight?: number;
  bmi?: number;
  bloodType?: string;
  isPregnant?: boolean;
  isProfileComplete?: boolean;
  profileCompletionSteps: string[];
}

/**
 * 2) Define the schema with the same fields, referencing `IUser`.
 */
const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: {
      type: String,
      required: function () {
        return !this.googleId;
      }
    },
    googleId: { type: String, default: null },
    image: { type: String, default: null },
    resetToken: { type: String, default: null },
    resetTokenExpiry: { type: Date, default: null },
    role: { type: String, enum: ["Admin", "User"], default: "User" },

    age: { type: Number, min: 0 },
    height: { type: Number, min: 50, max: 250 },
    weight: { type: Number, min: 2, max: 300 },
    bmi: { type: Number, min: 10, max: 60 },
    gender: { type: String, trim: true },
    allergies: { type: String, trim: true },
    medications: { type: String, trim: true },
    familyHistory: { type: String, trim: true },
    activityLevel: { type: String, trim: true },
    diet: { type: String, trim: true },
    bloodType: { type: String, enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", ""] },
    isPregnant: { type: Boolean, default: false },

    isProfileComplete: { type: Boolean, default: false },
    profileCompletionSteps: { type: [String], default: [] }
  },
  { timestamps: true }
);

/**
 * 3) Auto-calculate BMI before saving
 */
UserSchema.pre("save", function (next) {
  if (this.height && this.weight) {
    const heightInMeters = this.height / 100;
    this.bmi = parseFloat((this.weight / (heightInMeters * heightInMeters)).toFixed(1));
  } else {
    this.bmi = undefined;
  }
  next();
});

/**
 * 4) Fix Model Registration in Next.js to Prevent Recompilation
 */
const User = (mongoose.models.User as Model<IUser>) || mongoose.model<IUser>("User", UserSchema);

export default User;
```

### /workspaces/aicare/aicare-app/src/styles/globals.css
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### /workspaces/aicare/aicare-app/src/types/components.d.ts
```
declare module "@/components/MedicalRecords" {
  const component: React.FC;
  export default component;
}
```

### /workspaces/aicare/aicare-app/src/types/formidable.d.ts
```
declare module "formidable" {
  import { IncomingMessage } from "http";

  export interface Fields {
    [key: string]: string | string[];
  }

  export interface File {
    filepath: string;
    originalFilename?: string | null;
    mimetype?: string | null;
    size: number;
  }

  export interface Files {
    [key: string]: File | File[];
  }

  export class IncomingForm {
    constructor(
      options?: Partial<{
        multiples: boolean;
        uploadDir: string;
        keepExtensions: boolean;
      }>
    );
    parse(
      req: IncomingMessage,
      callback?: (err: Error | null, fields: Fields, files: Files) => void
    ): void;
  }
}
```

### /workspaces/aicare/aicare-app/src/types/global.d.ts
```
import mongoose from "mongoose";

interface MongooseCache {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
}

// ✅ Use `interface GlobalThis` instead of `var` to avoid ESLint errors
declare global {
  interface GlobalThis {
    globalMongoose: MongooseCache;
  }
}

export {}; // Ensure TypeScript treats this file as a module
```

### /workspaces/aicare/aicare-app/src/types/mime-types.d.ts
```
declare module "mime-types" {
  export function lookup(filename: string): string | false;
  export function contentType(filename: string): string | false;
  export function extension(type: string): string | false;
  export function charset(type: string): string | false;
}
```

### /workspaces/aicare/aicare-app/src/types/next-auth.d.ts
```
import { DefaultSession } from "next-auth";

/**
 * Augment NextAuth's default Session & JWT interfaces
 */
declare module "next-auth" {
  interface User {
    isProfileComplete?: boolean;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string;
      isProfileComplete?: boolean;
    } & DefaultSession["user"];
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    email?: string;
    name?: string;
    image?: string;
    isProfileComplete?: boolean;
    accessToken?: string;
  }
}
```

### /workspaces/aicare/aicare-app/src/types/UserProfile.ts
```
export interface UserProfile {
  name: string;
  email: string;
  age: number;
  gender: string;
  height: number | null;
  weight: number | null;
  bmi: number | null;
  bloodType: string;
  isPregnant: boolean;
  allergies: string;
  medications: string;
  familyHistory: string;
  activityLevel: string;
  diet: string;
}
```

### /workspaces/aicare/aicare-app/src/utils/db.ts
```
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("⚠️ Missing MONGODB_URI in environment variables");
}

// ✅ Use a simple, local module-scoped variable instead of globalThis
let cachedConnection: mongoose.Connection | null = null;
let cachedPromise: Promise<mongoose.Connection> | null = null;

export async function dbConnect() {
  if (cachedConnection) return cachedConnection;

  if (!cachedPromise) {
    cachedPromise = mongoose
      .connect(MONGODB_URI, {
        dbName: "AiCareDB",
        bufferCommands: false
      })
      .then((mongoose) => mongoose.connection);
  }

  cachedConnection = await cachedPromise;
  return cachedConnection;
}
```

### /workspaces/aicare/aicare-app/src/utils/mergeRefs.ts
```
export function mergeRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
  return (instance: T | null) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === "function") {
        ref(instance);
      } else if (typeof ref === "object" && "current" in ref) {
        (ref as React.MutableRefObject<T | null>).current = instance;
      }
    });
  };
}
```

### /workspaces/aicare/aicare-app/src/utils/validation.ts
```
export function validatePassword(password: string, returnArray = false): string | string[] | null {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must include at least one uppercase letter");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Password must include at least one lowercase letter");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("Password must include at least one number");
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push("Password must include at least one special character");
  }

  if (returnArray) return errors;
  return errors.length > 0 ? errors[0] : null; // Return first error or null if valid
}
```

