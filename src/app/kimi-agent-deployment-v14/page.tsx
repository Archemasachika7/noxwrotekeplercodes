import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kimi Agent Deployment v14 UI",
  description: "Embedded UI from Kimi_Agent_Deployment_v14.zip",
};

export default function KimiAgentDeploymentV14Page() {
  return (
    <main className="min-h-screen bg-black">
      <iframe
        src="/kimi-agent-deployment-v14-static/app.html?embedded=1"
        title="Kimi Agent Deployment v14 UI"
        className="h-screen w-full border-0"
        sandbox="allow-scripts allow-same-origin"
      />
    </main>
  );
}
