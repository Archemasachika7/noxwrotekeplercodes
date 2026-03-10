import { NextResponse } from "next/server";

const videos = [
  {
    id: "v1",
    title: "Introduction to AI",
    thumbnail: "",
    embedUrl: "https://www.youtube.com/embed/JMUxmLyrhSk",
  },
  {
    id: "v2",
    title: "Machine Learning Basics",
    thumbnail: "",
    embedUrl: "https://www.youtube.com/embed/ukzFI9rgwfU",
  },
  {
    id: "v3",
    title: "Web Development 101",
    thumbnail: "",
    embedUrl: "https://www.youtube.com/embed/zJSY8tbf_ys",
  },
];

export async function GET() {
  // Return videos in random order
  const shuffled = [...videos].sort(() => Math.random() - 0.5);
  return NextResponse.json(shuffled);
}
