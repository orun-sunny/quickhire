import mongoose from 'mongoose';


/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let cached = (global as any).mongoose;

if (!cached) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
        // If this is happening during a static build, we shouldn't crash the build.
        // However, if this is happening at runtime, it's a critical error.
        if (process.env.NODE_ENV === 'production' && !process.env.VERCEL_URL) {
            console.warn('MONGODB_URI is missing during build. This is expected if you are statically generating pages. If your build fails here, ensure the environment variable is added to Vercel.');
            return null;
        }

        throw new Error(
            'MONGODB_URI is missing. Please define it in .env.local (local development) ' +
            'or in your Project Settings > Environment Variables on your hosting provider (production).'
        );
    }
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
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

export default connectToDatabase;
