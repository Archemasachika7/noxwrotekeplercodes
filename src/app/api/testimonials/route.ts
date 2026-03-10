import { NextResponse } from "next/server";

const testimonials = [
  {
    id: "t1",
    name: "Priya Sharma",
    role: "Software Engineer",
    company: "Google",
    review: "Kepler Codes completely transformed my career. The project-based approach and AI mentor helped me crack my dream job at Google. The community support was incredible throughout my journey.",
    photo: "",
  },
  {
    id: "t2",
    name: "James Wilson",
    role: "ML Engineer",
    company: "Amazon",
    review: "The Machine Learning course was the most comprehensive I've ever taken. Real-world projects, not just theory. I went from zero ML knowledge to building production models in 3 months.",
    photo: "",
  },
  {
    id: "t3",
    name: "Aisha Patel",
    role: "Security Analyst",
    company: "Microsoft",
    review: "The Cybersecurity track gave me hands-on experience that no other platform could. The live cohort sessions with industry experts were invaluable for my career transition.",
    photo: "",
  },
  {
    id: "t4",
    name: "Carlos Rodriguez",
    role: "Blockchain Developer",
    company: "Coinbase",
    review: "From knowing nothing about blockchain to building production DApps — Kepler Codes made it happen. The mentors are genuinely invested in your success.",
    photo: "",
  },
  {
    id: "t5",
    name: "Lisa Chen",
    role: "Full Stack Developer",
    company: "Netflix",
    review: "The Full Stack Engineering course is phenomenal. The curriculum stays current with industry trends, and the projects are exactly what interviewers look for.",
    photo: "",
  },
  {
    id: "t6",
    name: "Raj Kumar",
    role: "Data Scientist",
    company: "NVIDIA",
    review: "Best investment I've made in my career. The combination of structured learning, real projects, and placement support is unmatched. Landed my role at NVIDIA within 2 months of completing the course.",
    photo: "",
  },
];

export async function GET() {
  return NextResponse.json(testimonials);
}
