"use client";

import SkillCard from "./SkillCard";

const skillsData = [
  {
    title: "Languages",
    items: ["TypeScript", "Python", "HTML5", "CSS3", "PHP", "SQL", "Go"],
  },
  {
    title: "Frameworks & Libraries",
    items: ["React", "Next.js", "Node.js", "Express.js", "Tailwind CSS"],
  },
  {
    title: "Databases",
    items: ["PostgreSQL", "MongoDB", "Firebase"],
  },
  {
    title: "DevOps & Infrastructure",
    items: ["Docker", "Kubernetes", "CI/CD", "Nginx", "Cloud Deployment"],
  },
  {
    title: "Tools",
    items: ["VS Code", "Git", "GitHub", "Postman"],
  },
  {
    title: "Concepts",
    items: [
      "IoT Integration",
      "LoRa",
      "MQTT",
      "REST API",
      "MVC",
      "Responsive Design",
    ],
  },
  {
    title: "Development Methodologies",
    items: ["Agile", "Scrum"],
  },
];

const Skills = () => {
  return (
    <section
      id="skills"
      className="py-20 px-4 sm:px-6 lg:px-12 bg-black text-center"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-yellow-400 drop-shadow-md">
          Technical Skills
        </h2>
        <p className=" text-white/80 mb-12 max-w-2xl mx-auto">
          Here are the tools, languages, and concepts I work with regularly in
          full-stack and IoT development.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {skillsData.map((skill, index) => (
            <SkillCard
              key={skill.title}
              title={skill.title}
              items={skill.items}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
