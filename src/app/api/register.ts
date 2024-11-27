import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/user";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt';

async function isEmailAlreadyRegistered(email: string): Promise<boolean> {
    await mongooseConnect();
    const existingUser = await User.findOne({ email });
    return !!existingUser;
}


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ){
    try {
        const {name, email, password} = await req.body;
        const hashedPassword = await bcrypt.hash(password, 10)
        const emailAlreadyRegistered = await isEmailAlreadyRegistered(email);
        if (emailAlreadyRegistered) {
            return res.status(400).json({ 
            message: 'Email address already registered.' });
        }
        await User.create({name, email, password: hashedPassword})
       
        return res.status(200).json({ message: 'User registered!' });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ 
        message: 'An error occurred while registering the user.' });
    }
}