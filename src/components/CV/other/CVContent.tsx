"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  about,
  softwareEngineeringExperience,
  otherExperience,
  projects,
  education,
  certifications,
  additionalInfo,
} from "@/data/CV";
import {
  CertificationItem,
  EducationItem,
  ProjectItem,
  WorkExperienceItem,
} from "@/types/cv";
import TimelineItem from "./TimelineItem";

const sectionVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  exit: { opacity: 0, y: -100, transition: { duration: 0.4 } },
};

const CVContent = () => {
  const sections = [
    {
      id: "about",
      content: (
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">About Me</h2>
          <p className="leading-7 text-gray-700 max-w-3xl mx-auto text-justify">
            {about}
          </p>
        </div>
      ),
      side: "center",
    },
    {
      id: "work-experience",
      content: (
        <div className="space-y-10">
          <h2 className="text-3xl font-bold mb-6">Work Experience</h2>
          {softwareEngineeringExperience.map(
            (item: WorkExperienceItem, idx: number) => (
              <TimelineItem
                key={`se-${idx}`}
                id={`se-${idx}`}
                title={item.title}
                subtitle={`${item.company} — ${item.location}`}
                period={item.period}
                bullets={item.bullets}
                side="left"
              />
            )
          )}
          {otherExperience.map((item: WorkExperienceItem, idx: number) => (
            <TimelineItem
              key={`ot-${idx}`}
              id={`ot-${idx}`}
              title={item.title}
              subtitle={`${item.company} — ${item.location}`}
              period={item.period}
              bullets={item.bullets}
              side="left"
            />
          ))}
        </div>
      ),
      side: "left",
    },
    {
      id: "project-experience",
      content: (
        <div className="space-y-10">
          <h2 className="text-3xl font-bold mb-6">Project Experience</h2>
          {projects.map((proj: ProjectItem, idx: number) => (
            <TimelineItem
              key={idx}
              id={`proj-${idx}`}
              title={proj.title}
              subtitle={proj.organization}
              period={proj.period}
              bullets={proj.bullets}
              side="right"
            />
          ))}
        </div>
      ),
      side: "right",
    },
    {
      id: "education",
      content: (
        <div className="space-y-10">
          <h2 className="text-3xl font-bold mb-6">Education</h2>
          {education.map((item: EducationItem, idx: number) => (
            <TimelineItem
              key={idx}
              id={`edu-${idx}`}
              title={item.degree}
              subtitle={item.school}
              period={item.period}
              bullets={item.notes || []}
              side="left"
            />
          ))}
        </div>
      ),
      side: "left",
    },
    {
      id: "additional-info",
      content: (
        <div className="space-y-10">
          <h2 className="text-3xl font-bold mb-6">Additional Information</h2>
          {additionalInfo.technicalSkills.map((skillSet, idx) => (
            <TimelineItem
              key={`tech-${idx}`}
              id={`tech-${idx}`}
              title={skillSet.category}
              subtitle="Technical Skill Category"
              period=""
              bullets={skillSet.items}
              icon="💻"
              side="left"
            />
          ))}
          <TimelineItem
            id="soft-skills"
            title="Soft Skills"
            subtitle="Personal & Professional Strengths"
            period=""
            bullets={additionalInfo.softSkills}
            icon="🧠"
            side="left"
          />
        </div>
      ),
      side: "left",
    },
    {
      id: "certifications",
      content: (
        <div className="space-y-10">
          <h2 className="text-3xl font-bold mb-6">Certifications</h2>
          {certifications.map((item: CertificationItem, idx: number) => (
            <TimelineItem
              key={idx}
              id={`cert-${idx}`}
              title={item.title}
              subtitle={item.issuer}
              period={item.date}
              bullets={[]}
              side="right"
            />
          ))}
        </div>
      ),
      side: "right",
    },
  ];

  return (
    <div className="w-full h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="h-screen w-full flex items-center justify-center snap-start"
        >
          <AnimatePresence>
            <motion.div
              className="w-full px-6 md:px-12"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              exit="exit"
              viewport={{ once: false, amount: 0.6 }}
            >
              {section.content}
            </motion.div>
          </AnimatePresence>
        </section>
      ))}
    </div>
  );
};

export default CVContent;
