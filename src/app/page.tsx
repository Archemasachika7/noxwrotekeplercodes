import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ScrollStory from "@/components/ScrollStory";
import CodeEditorDemo from "@/components/CodeEditorDemo";
import TrustBar from "@/components/TrustBar";
import PlatformPreview from "@/components/PlatformPreview";
import VideoSection from "@/components/VideoSection";
import Courses from "@/components/Courses";
import LiveCourses from "@/components/LiveCourses";
import Educators from "@/components/Educators";
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
import SpotlightCursor from "@/components/SpotlightCursor";
import FloatingSymbols from "@/components/FloatingSymbols";
import TerminalBootLoader from "@/components/TerminalBootLoader";
import SpotlightHoverCards from "@/components/SpotlightHoverCards";
import GitBranchTimeline from "@/components/GitBranchTimeline";
import InteractiveCodeEditor from "@/components/InteractiveCodeEditor";
import { FadeIn, SlideInLeft, SlideInRight } from "@/components/MotionWrappers";

export default function Home() {
  return (
    <>
      {/* Full-screen terminal boot-up entry animation */}
      <TerminalBootLoader />
      <div className="fixed inset-0 -z-10 bg-[#050508]" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(0,212,255,0.12),_transparent_45%),radial-gradient(circle_at_80%_20%,_rgba(77,159,255,0.12),_transparent_40%)]" />
      <GridBackground />
      <FloatingSymbols />
      <SpotlightCursor />
      <div className="relative z-10 overflow-x-hidden">
        <Navbar />
        <FadeIn>
          <Hero />
        </FadeIn>
        <SlideInLeft>
          <TrustBar />
        </SlideInLeft>
        <SlideInRight>
          <ScrollStory />
        </SlideInRight>
        <SlideInLeft>
          <CodeEditorDemo />
        </SlideInLeft>
        <SlideInRight>
          <PlatformPreview />
        </SlideInRight>
        <SlideInLeft>
          <VideoSection />
        </SlideInLeft>
        <SlideInRight>
          <Courses />
        </SlideInRight>
        {/* Spotlight Hover Cards — flashlight mouse-follow effect */}
        <SlideInLeft>
          <SpotlightHoverCards />
        </SlideInLeft>
        <SlideInRight>
          <LiveCourses />
        </SlideInRight>
        <SlideInLeft>
          <Educators />
        </SlideInLeft>
        <SlideInRight>
          <WhyKeplerCodes />
        </SlideInRight>
        {/* Git-Branch Timeline — GSAP scroll-triggered line draw */}
        <SlideInLeft>
          <GitBranchTimeline />
        </SlideInLeft>
        <SlideInRight>
          <Projects />
        </SlideInRight>
        <SlideInLeft>
          <Stats />
        </SlideInLeft>
        <SlideInRight>
          <Testimonials />
        </SlideInRight>
        <SlideInLeft>
          <FreeContent />
        </SlideInLeft>
        {/* Interactive Code Editor — Monaco + terminal drawer */}
        <SlideInRight>
          <InteractiveCodeEditor />
        </SlideInRight>
        <SlideInLeft>
          <Community />
        </SlideInLeft>
        <SlideInRight>
          <Certifications />
        </SlideInRight>
        <SlideInLeft>
          <Pricing />
        </SlideInLeft>
        <SlideInRight>
          <Comparison />
        </SlideInRight>
        <SlideInLeft>
          <FAQ />
        </SlideInLeft>
        <SlideInRight>
          <AIMentor />
        </SlideInRight>
        <SlideInLeft>
          <FinalCTA />
        </SlideInLeft>
        <FadeIn>
          <Footer />
        </FadeIn>
      </div>
    </>
  );
}
