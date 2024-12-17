import { NextResponse, type NextRequest } from "next/server";
import { pinata } from "@/utils/config";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;

    const uploadData = await pinata.upload
      .file(file).group("51bde156-0d66-483f-976f-8826dfb8624c");

    const url = `https://${process.env.NEXT_PINATA_GATEWAY_URL}/ipfs/${uploadData.IpfsHash}`;

    return NextResponse.json(url, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
