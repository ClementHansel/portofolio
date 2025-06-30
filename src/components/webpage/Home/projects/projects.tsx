"use client";

import games from "@/data/web/home/projects/games";
import appsProjects from "@/data/web/home/projects/apps";
import AppCarousel from "./AppCarousel";
import GameCarousel from "./GameCarousel";
import ProjectCard from "./ProjectCard";
import Image from "next/image";

export default function Projects() {
  return (
    <section className="relative w-full bg-black py-24 px-6 text-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-yellow-400 drop-shadow-md">
          Explore My Projects
        </h2>
        <p className="text-white/70 text-lg mb-16">
          Dive into the apps and games I’ve built with passion and purpose.
        </p>

        <div className="grid grid-cols-1 gap-8">
          <ProjectCard
            icon={
              <Image
                src="/assets/icons/gamepad.svg"
                alt="Games Icon"
                width={48}
                height={48}
              />
            }
            title="Games"
            description="Fun, interactive experiences crafted with love using Unity, Three.js, and web tech."
            href="../../../../app/(main)/games"
            color="text-yellow-300"
          >
            <GameCarousel data={games} />
          </ProjectCard>

          <ProjectCard
            icon={
              <Image
                src="/assets/icons/app.svg"
                alt="Apps Icon"
                width={48}
                height={48}
              />
            }
            title="Apps"
            description="Robust and scalable full-stack apps designed to solve real-world problems with clean architecture and cloud-native practices."
            href="../../../../app/(main)/apps"
            color="text-green-400"
          >
            <AppCarousel data={appsProjects} />
          </ProjectCard>
        </div>
      </div>
    </section>
  );
}
