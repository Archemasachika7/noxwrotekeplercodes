import { NextResponse } from "next/server";

export async function GET() {
  const educators = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      expertise: "Artificial Intelligence",
      role: "AI Engineer (Ex-Google)",
      yearsExperience: 12,
      company: "Google",
      photo: "",
      linkedin: "https://linkedin.com",
      bio: "Led AI research teams building large-scale ML systems at Google Brain.",
    },
    {
      id: 2,
      name: "Marcus Williams",
      expertise: "Cybersecurity",
      role: "Cybersecurity Specialist",
      yearsExperience: 10,
      company: "CrowdStrike",
      photo: "",
      linkedin: "https://linkedin.com",
      bio: "Former pentester and security architect with expertise in zero-trust systems.",
    },
    {
      id: 3,
      name: "Aisha Patel",
      expertise: "Blockchain Development",
      role: "Blockchain Developer",
      yearsExperience: 8,
      company: "Coinbase",
      photo: "",
      linkedin: "https://linkedin.com",
      bio: "Designed and deployed smart contract protocols handling $2B+ in transactions.",
    },
    {
      id: 4,
      name: "James Rodriguez",
      expertise: "Machine Learning",
      role: "ML Engineer (Ex-NVIDIA)",
      yearsExperience: 9,
      company: "NVIDIA",
      photo: "",
      linkedin: "https://linkedin.com",
      bio: "Specialized in deep learning and GPU-accelerated model training pipelines.",
    },
    {
      id: 5,
      name: "Emily Zhang",
      expertise: "Full Stack Development",
      role: "Staff Engineer (Ex-Stripe)",
      yearsExperience: 11,
      company: "Stripe",
      photo: "",
      linkedin: "https://linkedin.com",
      bio: "Built payment infrastructure handling millions of daily transactions at Stripe.",
    },
    {
      id: 6,
      name: "David Okafor",
      expertise: "Data Science",
      role: "Lead Data Scientist (Ex-Amazon)",
      yearsExperience: 10,
      company: "Amazon",
      photo: "",
      linkedin: "https://linkedin.com",
      bio: "Developed recommendation systems and data pipelines at Amazon scale.",
    },
  ];

  return NextResponse.json(educators);
}
