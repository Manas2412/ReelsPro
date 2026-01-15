import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_URI!;

if (!MONGO_URI) {
    throw new Error("Please provide MONGODB_URI in the env file");
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

export async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        const opts = {
            buffeCommands: true,
            maxPoolSize: 10,
        }
        cached.promise = mongoose
            .connect(MONGO_URI, opts)
            .then(() => mongoose.connection);
    }

    try{
        cached.conn = await cached.promise;
    }catch(err){
        cached.promise = null;
        throw new Error("MongoDb Connection Error");
    }

    return cached.conn;
}