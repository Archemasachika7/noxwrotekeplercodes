import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import PlatformPreview from "@/components/PlatformPreview";
import VideoSection from "@/components/VideoSection";
import Courses from "@/components/Courses";
import LiveCourses from "@/components/LiveCourses";
import WhyKeplerCodes from "@/components/WhyKeplerCodes";
import Projects from "@/components/Projects";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import FreeContent from "@/components/FreeContent";
import Community from "@/components/Community";
import Certifications from "@/components/Certifications";
import Pricing from "@/components/Pricing";
import Comparison from "@/components/Comparison";
import FAQ from "@/components/FAQ";
import AIMentor from "@/components/AIMentor";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import { GridBackground } from "@/components/GridBackground";

export default function Home() {
  return (
    <>
      <GridBackground />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <TrustBar />
        <PlatformPreview />
        <VideoSection />
        <Courses />
        <LiveCourses />
        <WhyKeplerCodes />
        <Projects />
        <Stats />
        <Testimonials />
        <FreeContent />
        <Community />
        <Certifications />
        <Pricing />
        <Comparison />
        <FAQ />
        <AIMentor />
        <FinalCTA />
        <Footer />
      </div>
    </>
  );
}
