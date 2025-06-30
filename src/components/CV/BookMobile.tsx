/* eslint-disable */
"use client";

import { useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import BookPageMobile from "./BookPageMobile";
import "../../styles/pageFlip.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

// Pages (reuse same as desktop)
import CoverPage from "@/components/CV/pages/CoverPage";
import IntroPage from "@/components/CV/pages/IntroPage";
import WorkExperiencePage1 from "@/components/CV/pages/WorkExperiencePage1";
import WorkExperiencePage2 from "@/components/CV/pages/WorkExperiencePage2";
import ProjectsPage from "@/components/CV/pages/ProjectsPage";
import EducationPage from "@/components/CV/pages/EducationPage";
import OrgExperiencePage from "@/components/CV/pages/OrgExperiencePage";
import AdditionalInfoPage1 from "@/components/CV/pages/AdditionalInfoPage1";
import CertificationPage from "@/components/CV/pages/CertificationPage";
import ContactPage from "@/components/CV/pages/ContactPage";
import BackCoverPage from "@/components/CV/pages/BackCoverPage";
import AdditionalInfoPage2 from "./pages/AdditionalInfoPage2";

const pages = [
  { title: "Cover", component: <CoverPage /> },
  { title: "Intro", component: <IntroPage /> },
  { title: "Experience I", component: <WorkExperiencePage1 /> },
  { title: "Experience II", component: <WorkExperiencePage2 /> },
  { title: "Projects", component: <ProjectsPage /> },
  { title: "Education", component: <EducationPage /> },
  { title: "Organizations", component: <OrgExperiencePage /> },
  { title: "Add. Info I", component: <AdditionalInfoPage1 /> },
  { title: "Add. Info II", component: <AdditionalInfoPage2 /> },
  { title: "Certifications", component: <CertificationPage /> },
  { title: "Contact", component: <ContactPage /> },
  { title: "Back", component: <BackCoverPage /> },
];

export default function BookMobile() {
  const bookRef = useRef<any>(null);
  const [pageIndex, setPageIndex] = useState(0);

  // 🔄 Updates on flip complete
  const handleFlip = (e: any) => {
    setPageIndex(e.data);
  };

  // 🎯 Top Nav & Dropdown: jump directly
  const jumpToPage = (index: number) => {
    bookRef.current?.pageFlip().turnToPage(index);
  };

  // ⬅️ Prev button
  const flipPrev = () => {
    bookRef.current?.pageFlip().flipPrev();
  };

  // ➡️ Next button
  const flipNext = () => {
    bookRef.current?.pageFlip().flipNext();
  };

  return (
    <div className="flex flex-col items-center justify-center  min-h-screen px-2 overflow-x-hidden">
      {/* 🧭 Top Navigation */}
      <nav className="w-full max-w-5xl flex flex-wrap justify-center gap-2 mb-2">
        {pages.map((p, i) => (
          <motion.button
            key={i}
            onClick={() => jumpToPage(i)}
            className={`text-xs px-3 py-1 rounded-full transition font-medium ${
              pageIndex === i
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {p.title}
          </motion.button>
        ))}
      </nav>

      {/* 📖 Book Display */}
      <div className="w-[320px] h-[600px]">
        <HTMLFlipBook
          ref={bookRef}
          width={320}
          height={600}
          minWidth={320}
          maxWidth={320}
          minHeight={600}
          maxHeight={600}
          size="fixed"
          showCover={true}
          mobileScrollSupport={true}
          usePortrait={true}
          autoSize={false}
          clickEventForward
          drawShadow
          flippingTime={600}
          disableFlipByClick={false}
          onFlip={handleFlip}
          startPage={0}
          startZIndex={0}
          maxShadowOpacity={0.5}
          useMouseEvents={false}
          className=""
          swipeDistance={30}
          showPageCorners={false}
          style={{
            width: "320px",
            height: "600px",
          }}
        >
          {pages.map((p, i) => (
            <BookPageMobile key={i} cover={i === 0 || i === pages.length - 1}>
              {p.component}
            </BookPageMobile>
          ))}
        </HTMLFlipBook>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-3 mt-4">
        <button
          onClick={flipPrev}
          className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
        >
          <ChevronLeft size={16} /> Prev
        </button>
        <button
          onClick={flipNext}
          className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
        >
          Next <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
