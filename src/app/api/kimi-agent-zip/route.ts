import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

const ZIP_FILE_NAME = "Kimi_Agent_Deployment_v14.zip";

export async function GET() {
  try {
    const zipPath = path.join(process.cwd(), ZIP_FILE_NAME);
    const zipFile = await fs.readFile(zipPath);

    return new NextResponse(zipFile, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${ZIP_FILE_NAME}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error: unknown) {
    if ((error as NodeJS.ErrnoException)?.code === "ENOENT") {
      return NextResponse.json(
        { error: "Kimi agent deployment zip file not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Failed to read Kimi agent deployment zip file." },
      { status: 500 }
    );
  }
}
