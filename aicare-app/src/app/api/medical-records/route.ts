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
