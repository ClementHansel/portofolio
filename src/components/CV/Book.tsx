"use client";

import { useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import BookPage from "./BookPage";
import "../../styles/pageFlip.css";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Import pages
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

export default function Book() {
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
    <div className="flex flex-col items-center justify-between min-h-screen p-4 gap-4">
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
      <HTMLFlipBook
        ref={bookRef}
        width={600}
        height={800}
        size="fixed"
        minWidth={600}
        maxWidth={600}
        minHeight={800}
        maxHeight={800}
        showCover
        mobileScrollSupport={false}
        clickEventForward
        drawShadow
        flippingTime={600}
        disableFlipByClick={false}
        onFlip={handleFlip}
        className=""
      >
        {pages.map((p, i) => (
          <BookPage key={i} cover={i === 0 || i === pages.length - 1}>
            {p.component}
          </BookPage>
        ))}
      </HTMLFlipBook>

      {/* 🔽 Bottom Navigation */}
      <div className="flex items-center gap-3 mt-4 text-sm">
        <button
          onClick={flipPrev}
          className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
        >
          <ChevronLeft size={16} /> Prev
        </button>

        <div className="relative">
          <select
            value={pageIndex}
            onChange={(e) => jumpToPage(Number(e.target.value))}
            className="border border-gray-300 rounded px-2 py-1 appearance-none bg-white shadow"
            title="Go to Page"
          >
            {pages.map((p, i) => (
              <option key={i} value={i}>
                {i + 1} / {pages.length} - {p.title}
              </option>
            ))}
          </select>
        </div>

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
