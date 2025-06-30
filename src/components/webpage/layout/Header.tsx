"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    {
      name: "Projects",
      children: [
        { name: "Games", href: "/(main)/games" },
        { name: "Apps", href: "/(main)/apps" },
      ],
    },
    { name: "About Me", href: "/(main)/about" },
    { name: "My CV", href: "/(main)/CV" },
    { name: "Blog", href: "/(main)/blog" },
    { name: "Shop", href: "/(main)/shop" },
    { name: "Documentation", href: "/(main)/documentation" },
    { name: "Contact", href: "/(main)/contact" },
    { name: "Support", href: "/(main)/support" },
    { name: "Sign in", href: "/(main)/signin" },
  ];

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-gray-900 text-white shadow-md">
      <div className="flex justify-between items-center px-6 py-4 max-w-screen mx-auto">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/assets/images/logo/ch_logo.png"
            alt="Logo"
            width={50}
            height={50}
            className="cursor-pointer"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 items-center">
          {navItems.map((item, idx) =>
            item.children ? (
              <div key={idx} className="relative hover-delay-group">
                {/* Trigger */}
                <span className="cursor-pointer hover:text-yellow-400 px-2 py-1 transition">
                  {item.name}
                </span>

                {/* Submenu */}
                <div
                  className="absolute top-full left-0 hover-delay-enter bg-gray-900 border border-gray-700 rounded-md shadow-lg flex flex-col z-50 min-w-[120px]"
                  // remove mt-2 to eliminate gap
                >
                  {item.children.map((child, cidx) => (
                    <Link
                      key={cidx}
                      href={child.href}
                      className="px-4 py-2 text-sm hover:text-yellow-400 transition whitespace-nowrap"
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={idx}
                href={item.href}
                className="hover:text-yellow-400 transition px-2 py-1"
              >
                {item.name}
              </Link>
            )
          )}
        </nav>

        {/* Hamburger (Mobile) */}
        <button
          className="md:hidden text-xl z-50"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-2/3 bg-gray-800 shadow-lg z-40 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 space-y-4 pt-20">
          {navItems.map((item, idx) =>
            item.children ? (
              <div key={idx}>
                <span className="block font-semibold mb-1">Projects</span>
                <div className="pl-4 space-y-1">
                  {item.children.map((child, cidx) => (
                    <Link
                      key={cidx}
                      href={child.href}
                      className="block text-sm hover:text-yellow-400"
                      onClick={() => setIsOpen(false)}
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={idx}
                href={item.href}
                className="block hover:text-yellow-400"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            )
          )}
        </div>
      </div>
    </header>
  );
}
