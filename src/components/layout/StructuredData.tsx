/**
 * JSON-LD Structured Data for SEO.
 * Helps search engines understand the portfolio as a Person + Professional profile.
 */
export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Clement Hansel",
    jobTitle: "CTO & Technology Executive",
    description:
      "Technology executive specializing in IoT, AI/ML, system architecture, and full-stack development.",
    url: "https://clementhansel.com",
    sameAs: [
      "https://github.com/ClementHansel",
      "https://www.linkedin.com/in/clement-hansel/",
    ],
    knowsAbout: [
      "IoT Engineering",
      "System Architecture",
      "AI/ML",
      "Full Stack Development",
      "DevOps",
      "UI/UX Design",
      "Game Development",
      "Digital Marketing",
    ],
    alumniOf: {
      "@type": "Organization",
      name: "Self-directed Engineering Education",
    },
    worksFor: {
      "@type": "Organization",
      name: "Independent Consulting",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
