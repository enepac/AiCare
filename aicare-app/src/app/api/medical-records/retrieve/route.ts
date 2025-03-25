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

// ✅ Handle file retrieval with enhanced parsedAI integration
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

    return NextResponse.json({
      records: records.map((record) => ({
        _id: record._id,
        fileName: record.fileName,
        fileType: record.fileType,
        uploadDate: record.uploadDate,
        filePath: record.filePath,
        parsedAI: record.parsedAI || null // clearly integrated AI insights
      }))
    });
  } catch (error) {
    console.error("❌ Error fetching medical records:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
