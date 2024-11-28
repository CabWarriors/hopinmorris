import mongoose, { Connection } from "mongoose";

declare global {
  // Declare global `mongoose` with the correct types for caching the connection
  var mongoose: { conn: Connection | null; promise: Promise<Connection> | null };
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
  }

  if (cached.conn) {
    console.log("Using cached MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("Creating new MongoDB connection");
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      // Cast the result to the correct type
      console.log("MongoDB connected successfully");
      return mongoose.connection; // Access the `connection` property of the mongoose object
    }).catch((err) => {
      console.error("MongoDB connection error:", err);
      throw err;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null; // Reset the promise in case of failure
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
