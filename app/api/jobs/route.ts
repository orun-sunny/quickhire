import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Job from "@/lib/models/Job";

export async function GET() {
    try {
        await connectToDatabase();
        const jobs = await Job.find().sort({ createdAt: -1 });
        return NextResponse.json({
            success: true,
            data: jobs,
        });
    } catch (error: any) {
        return NextResponse.json(
            {
                success: false,
                message: error.message || "Failed to fetch jobs",
            },
            { status: 500 },
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();

        const contentType = req.headers.get("content-type") || "";
        let jobData: any = {};

        if (contentType.includes("multipart/form-data")) {
            const formData = await req.formData();
            jobData = {
                title: formData.get("title"),
                company: formData.get("company"),
                location: formData.get("location"),
                category: formData.get("category"),
                salary: formData.get("salary"),
                description: formData.get("description"),
            };
            // For now, we'll store the iconUrl as null or handle it if you have cloudinary setup
            // iconFile: formData.get("icon")
        } else {
            jobData = await req.json();
        }

        // Basic validation
        if (
            !jobData.title ||
            !jobData.company ||
            !jobData.location ||
            !jobData.category ||
            !jobData.description
        ) {
            return NextResponse.json(
                { success: false, message: "All fields are required" },
                { status: 400 },
            );
        }

        const job = await Job.create(jobData);

        return NextResponse.json(
            {
                success: true,
                data: job,
            },
            { status: 201 },
        );
    } catch (error: any) {
        return NextResponse.json(
            {
                success: false,
                message: error.message || "Failed to create job",
            },
            { status: 500 },
        );
    }
}
