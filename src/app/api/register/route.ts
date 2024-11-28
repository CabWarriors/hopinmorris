import bcrypt from 'bcrypt';
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from '@/lib/dbConnect';


async function isEmailAlreadyRegistered(email: string): Promise<boolean> {
  await dbConnect(); 
  const existingUser = await User.findOne({ email });
  return !!existingUser;
}


export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const { name, email, password } = await req.json();

    // Validate the input
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are necessary." },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if the email is already registered
    const emailAlreadyRegistered = await isEmailAlreadyRegistered(email);
    if (emailAlreadyRegistered) {
      return NextResponse.json(
        { message: "Email address already registered." },
        { status: 400 }
      );
    }

    // Create the new user in the database
    await User.create({ name, email, password: hashedPassword });

    // Return success response
    return NextResponse.json({ message: "User registered!" }, { status: 200 });
  } catch (error: any) {
    console.error("Server error during registration:", error.message, error.stack);
    return NextResponse.json(
      { message: "An internal error occurred during registration." },
      { status: 500 }
    );
  }
}
