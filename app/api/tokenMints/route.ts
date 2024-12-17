import MintAddresses from "@/models/MintAddresses";
import dbConnect from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

// POST Request Handler
export async function POST(request: NextRequest) {
  try {
    // Connect to the database
    await dbConnect();

    // Parse the request body
    const { address } = await request.json();

    // Validate the address
    if (!address) {
      return NextResponse.json(
        { error: "Mint address is required" },
        { status: 400 }
      );
    }

    // Check if address already exists
    const existingAddress = await MintAddresses.exists({ address });
    if (existingAddress) {
      return NextResponse.json(
        { error: "Mint address already exists" },
        { status: 409 }
      );
    }

    // Create new mint address
    const newMintAddress = await MintAddresses.create({ address });

    // Return success response
    return NextResponse.json(
      {
        message: "Mint address added successfully",
        address: newMintAddress,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding mint address:", error);
    return NextResponse.json(
      { error: "Failed to add mint address" },
      { status: 500 }
    );
  }
}

// GET Request Handler
export async function GET() {
  try {
    // Connect to the database
    await dbConnect();

    // Retrieve all mint addresses
    const response = await MintAddresses.find();
    const mintAddresses = response.map((doc) => doc.address);
    // Return mint addresses
    return NextResponse.json(
      {
        message: "Mint addresses retrieved successfully",
        addresses: mintAddresses,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving mint addresses:", error);
    return NextResponse.json(
      { error: "Failed to retrieve mint addresses" },
      { status: 500 }
    );
  }
}
