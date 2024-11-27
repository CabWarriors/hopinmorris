import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { Ride } from '@/models/ride';

export async function GET() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    const collections = await mongoose.connection.db.collections();
    const rides = await Ride.find({}).lean();
    
    return NextResponse.json({
      collections: collections.map(c => c.collectionName),
      rides,
      modelName: Ride.collection.name
    });
  } catch (error) {
    return NextResponse.json({ error: 'Debug error', details: error });
  }
}

