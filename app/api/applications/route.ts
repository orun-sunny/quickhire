import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import connectToDatabase from "@/lib/db";
import Application from "@/lib/models/Application";
import Job from "@/lib/models/Job";

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();
        const body = await req.json();

        const { job_id, name, email, resume_link, cover_note } = body;

        // Validation
        if (!job_id || !name || !email || !resume_link || !cover_note) {
            return NextResponse.json(
                { success: false, message: "All fields are required" },
                { status: 400 },
            );
        }

        // Check if job exists
        const job = await Job.findById(job_id);
        if (!job) {
            return NextResponse.json(
                { success: false, message: "Job not found" },
                { status: 404 },
            );
        }

        const application = await Application.create({
            job_id,
            name,
            email,
            resume_link,
            cover_note,
        });

        return NextResponse.json(
            {
                success: true,
                data: application,
            },
            { status: 201 },
        );
    } catch (error: any) {
        return NextResponse.json(
            {
                success: false,
                message: error.message || "Server error",
            },
            { status: 500 },
        );
    }
}
