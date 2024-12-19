import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to database");
    return;
  }

  try {
    const uri =
      process.env.NEXT_PUBLIC_SOLANA_NETWORK == "devnet"
        ? process.env.MONGODB_URI
        : process.env.MONGODB_URI_MAINNET;

    console.log(uri);
    const db = await mongoose.connect(uri as string, {});
    connection.isConnected = db.connections[0].readyState;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to database: ", error);
    process.exit(1);
  }
}

export default dbConnect;
