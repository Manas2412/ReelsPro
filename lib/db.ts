import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_URI!;

/* eslint-disable no-var */
declare global {
    var mongoose: {
        conn: mongoose.Connection | null;
        promise: Promise<mongoose.Connection> | null;
    };
}
/* eslint-enable no-var */

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

export async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn
    }

    if (!MONGO_URI) {
        throw new Error("Please provide MONGODB_URI in the env file");
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: true,
            maxPoolSize: 10,
        }
        cached.promise = mongoose
            .connect(MONGO_URI, opts)
            .then(() => mongoose.connection);
    }

    try {
        cached.conn = await cached.promise;
    } catch (err) {
        cached.promise = null;
        console.error("MongoDB connection error:", err);
        throw new Error("MongoDb Connection Error");
    }

    return cached.conn;
}