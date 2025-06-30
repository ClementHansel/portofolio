// src/components/layout/Intro.tsx

import { Card } from "../ui/Card";
import CVCard from "./CVCard";
import DashboardCard from "./dashboard";
import GameCard from "./GameCard";

const skillData = [
  {
    category: "🔧 Programming Languages",
    skills: [
      "JavaScript",
      "TypeScript",
      "Python",
      "SQL",
      "C++",
      "C#",
      "Java",
      "Rust",
      "Go",
    ],
  },
  {
    category: "🧰 Frameworks & Libraries",
    skills: [
      "React.js",
      "Next.js",
      "Angular",
      "Node.js",
      "Express.js",
      "Tailwind CSS",
      "MUI",
      "Ant Design",
      "shadcn/ui",
    ],
  },
  {
    category: "🗃️ Databases & Backend",
    skills: [
      "PostgreSQL",
      "MongoDB (basic)",
      "Firebase (basic)",
      "REST API",
      "MVC Pattern",
    ],
  },
  {
    category: "⚙️ Tools & DevOps",
    skills: [
      "Git & GitHub",
      "Docker (basic)",
      "Postman",
      "VS Code",
      "Agile / Scrum",
    ],
  },
  {
    category: "🧠 Other Skills",
    skills: [
      "Responsive Design",
      "IoT Integration",
      "LoRa",
      "MQTT",
      "OpenCV",
      "ESP32 / Arduino Programming",
      "Raspberry Pi",
      "AWS (basic)",
      "Blender",
    ],
  },
];

export default function Intro() {
  return (
    <section className="py-16 px-6 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">
          👋 Hello, My name is Clement Hansel. I&apos;m a Software Engineer
        </h2>
        <p className="text-lg mb-10">
          I build scalable software, integrate hardware systems, and bring
          creative tech experiences to life.
        </p>
        <p className="text-lg mb-10">
          The purpose of this page is to showcase my learning progress and
          skills that I acquire until now.
        </p>

        <section className="mt-6 flex flex-wrap justify-center gap-6 p-6">
          <GameCard />
          <DashboardCard />
          <CVCard />
        </section>

        <p className="mt-10 text-lg mb-10">
          This is the list of skills that I currently have
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillData.map((section) => (
            <Card key={section.category} className="p-6 text-left">
              <h3 className="text-lg font-semibold mb-4">{section.category}</h3>
              <ul className="flex flex-wrap gap-2 text-sm text-gray-700 dark:text-gray-300">
                {section.skills.map((skill) => (
                  <li
                    key={skill}
                    className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded-md"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
