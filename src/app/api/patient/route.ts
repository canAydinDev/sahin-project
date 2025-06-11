// app/api/patient/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Client, Databases } from "node-appwrite";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT!)
    .setProject(process.env.PROJECT_ID!)
    .setKey(process.env.API_KEY!);

  const databases = new Databases(client);

  try {
    // Test olarak herhangi bir koleksiyondan ilk belgeyi çekelim
    const documents = await databases.listDocuments(
      process.env.DATABASE_ID!,
      process.env.PATIENT_COLLECTION_ID!
    );

    return NextResponse.json({
      message: "Bağlantı başarılı ✅",
      data: documents,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Appwrite bağlantı hatası ❌", error },
      { status: 500 }
    );
  }
}
