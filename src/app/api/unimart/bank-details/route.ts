import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prismaClient";
import { verifyToken } from "@/lib/auth";

const prismaDelegates = prisma as any;

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const payload: any = verifyToken(authHeader || undefined);

    if (!payload || !payload.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const bankDetails = await prismaDelegates.bank_details.findUnique({
      where: { user_id: payload.userId },
      select: {
        bank_name: true,
        account_holder_name: true,
        account_number: true,
        branch: true,
      },
    });

    if (!bankDetails) {
      return NextResponse.json({ success: true, bankDetails: null }, { status: 200 });
    }

    return NextResponse.json(
      {
        success: true,
        bankDetails: {
          bankName: bankDetails.bank_name,
          accountHolderName: bankDetails.account_holder_name,
          accountNumber: bankDetails.account_number,
          branch: bankDetails.branch,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/unimart/bank-details error:", error);
    return NextResponse.json(
      { error: "Failed to fetch bank details" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const payload: any = verifyToken(authHeader || undefined);

    if (!payload || !payload.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const bankName = String(body.bankName || "").trim();
    const accountHolderName = String(body.accountHolderName || "").trim();
    const accountNumber = String(body.accountNumber || "").trim();
    const branch = String(body.branch || "").trim();

    if (!bankName || !accountHolderName || !accountNumber || !branch) {
      return NextResponse.json(
        { error: "All bank details fields are required" },
        { status: 400 }
      );
    }

    const bankDetails = await prismaDelegates.bank_details.upsert({
      where: { user_id: payload.userId },
      create: {
        user_id: payload.userId,
        bank_name: bankName,
        account_holder_name: accountHolderName,
        account_number: accountNumber,
        branch,
      },
      update: {
        bank_name: bankName,
        account_holder_name: accountHolderName,
        account_number: accountNumber,
        branch,
        updated_at: new Date(),
      },
    });

    return NextResponse.json({ success: true, bankDetails }, { status: 200 });
  } catch (error) {
    console.error("POST /api/unimart/bank-details error:", error);
    return NextResponse.json(
      { error: "Failed to save bank details" },
      { status: 500 }
    );
  }
}