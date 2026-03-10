import { NextResponse } from "next/server";

const projects = [
  {
    id: "p1",
    title: "AI Chatbot",
    description: "An intelligent conversational AI powered by transformer models with context-aware responses and multi-language support.",
    tech: ["Python", "PyTorch", "FastAPI", "React"],
    category: "AI",
  },
  {
    id: "p2",
    title: "Crypto Trading Bot",
    description: "Automated cryptocurrency trading system using real-time market analysis, technical indicators, and smart order execution.",
    tech: ["Python", "Web3.js", "TensorFlow", "AWS"],
    category: "Blockchain",
  },
  {
    id: "p3",
    title: "Network Security Scanner",
    description: "Comprehensive vulnerability assessment tool that scans networks, identifies security weaknesses, and generates detailed reports.",
    tech: ["Python", "Nmap", "Docker", "PostgreSQL"],
    category: "Cybersecurity",
  },
  {
    id: "p4",
    title: "Stock Prediction Engine",
    description: "Machine learning system for stock price prediction using LSTM networks, sentiment analysis, and historical data patterns.",
    tech: ["Python", "TensorFlow", "Pandas", "Plotly"],
    category: "ML",
  },
  {
    id: "p5",
    title: "Smart Contract DApp",
    description: "Decentralized application for supply chain management with Ethereum smart contracts and a modern React frontend.",
    tech: ["Solidity", "Hardhat", "React", "Ethers.js"],
    category: "Blockchain",
  },
  {
    id: "p6",
    title: "Real-time Collaboration IDE",
    description: "Browser-based collaborative code editor with real-time synchronization, syntax highlighting, and integrated terminal.",
    tech: ["Next.js", "WebSocket", "Monaco", "Redis"],
    category: "Full Stack",
  },
];

export async function GET() {
  return NextResponse.json(projects);
}
