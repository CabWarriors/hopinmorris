import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;
const DB_NAME = 'HopInMorris';

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

async function connectDB() {
  try {
    // If we're already connected, close the connection first
    if (mongoose.connections[0].readyState) {
      await mongoose.disconnect();
      console.log('Disconnected from previous database');
    }

    // Connect with explicit database name
    const opts = {
      dbName: DB_NAME,
      // Additional options if needed
      autoIndex: true,
    };

    await mongoose.connect(MONGODB_URI, opts);
    
    // Verify connection
    const actualDbName = mongoose.connection.db.databaseName;
    console.log('Connected to database:', actualDbName);
    
    if (actualDbName !== DB_NAME) {
      console.error(`Warning: Connected to ${actualDbName} instead of ${DB_NAME}`);
      await mongoose.disconnect();
      throw new Error('Connected to wrong database');
    }

    // List all collections to verify
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));

    return mongoose.connection;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

// For development: Handle hot reloading
declare global {
  var mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function getMongoDb() {
  if (cached.conn) {
    const dbName = cached.conn.connection.db.databaseName;
    if (dbName !== DB_NAME) {
      console.log(`Reconnecting to correct database (current: ${dbName})`);
      cached.conn = null;
    } else {
      return cached.conn;
    }
  }

  if (!cached.promise) {
    cached.promise = connectDB().then(conn => {
      cached.conn = mongoose;
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default getMongoDb;