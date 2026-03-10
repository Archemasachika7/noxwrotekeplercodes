import { NextResponse } from "next/server";

const liveCourses = [
  {
    id: "lc1",
    title: "AI Engineering Bootcamp",
    instructor: "Dr. Sarah Chen",
    startDate: "Apr 15, 2025",
    seatsRemaining: 8,
    totalSeats: 30,
    price: "$299",
  },
  {
    id: "lc2",
    title: "Full Stack Development Cohort",
    instructor: "David Kim",
    startDate: "Apr 20, 2025",
    seatsRemaining: 12,
    totalSeats: 40,
    price: "$249",
  },
  {
    id: "lc3",
    title: "Cybersecurity Professional Track",
    instructor: "Alex Rivera",
    startDate: "May 1, 2025",
    seatsRemaining: 5,
    totalSeats: 25,
    price: "$349",
  },
  {
    id: "lc4",
    title: "Machine Learning Intensive",
    instructor: "Prof. James Wright",
    startDate: "May 10, 2025",
    seatsRemaining: 15,
    totalSeats: 35,
    price: "$279",
  },
  {
    id: "lc5",
    title: "Blockchain Developer Program",
    instructor: "Maya Johnson",
    startDate: "May 20, 2025",
    seatsRemaining: 3,
    totalSeats: 20,
    price: "$329",
  },
  {
    id: "lc6",
    title: "DSA & System Design Mastery",
    instructor: "Rahul Mehta",
    startDate: "Jun 1, 2025",
    seatsRemaining: 18,
    totalSeats: 50,
    price: "$199",
  },
];

export async function GET() {
  return NextResponse.json(liveCourses);
}
