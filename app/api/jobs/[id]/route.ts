import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Job from "@/lib/models/Job";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        await connectToDatabase();
        const { id } = await params;

        const job = await Job.findById(id);
        if (!job) {
            return NextResponse.json(
                { success: false, message: "Job not found" },
                { status: 404 },
            );
        }

        return NextResponse.json({
            success: true,
            data: job,
        });
    } catch (error: any) {
        return NextResponse.json(
            {
                success: false,
                message: error.message || "Failed to fetch job",
            },
            { status: 400 },
        );
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        await connectToDatabase();
        const { id } = await params;

        const deletedJob = await Job.findByIdAndDelete(id);

        if (!deletedJob) {
            return NextResponse.json(
                { success: false, message: "Job not found" },
                { status: 404 },
            );
        }

        return NextResponse.json({
            success: true,
            message: "Job deleted successfully",
        });
    } catch (error: any) {
        return NextResponse.json(
            {
                success: false,
                message: error.message || "Failed to delete job",
            },
            { status: 500 },
        );
    }
}
