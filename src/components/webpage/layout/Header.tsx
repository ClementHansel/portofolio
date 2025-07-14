"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const navItems = [
    {
      name: "Projects",
      children: [
        { name: "Games", href: "/games" },
        { name: "Apps", href: "/apps" },
      ],
    },
    { name: "About Me", href: "/about" },
    { name: "My CV", href: "/CV" },
    { name: "Blog", href: "/blog" },
    { name: "Shop", href: "/shop" },
    { name: "Documentation", href: "/documentation" },
    { name: "Contact", href: "/contact" },
    { name: "Support", href: "/support" },
    { name: "Sign in", href: "/auth" },
  ];

  // Prevent background scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-gray-900 text-white shadow-md">
      <div className="flex justify-between items-center px-6 py-4 max-w-screen-xl mx-auto">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/assets/images/logo/ch_logo.png"
            alt="Logo"
            width={50}
            height={50}
            className="cursor-pointer"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 items-center">
          {navItems.map((item, idx) =>
            item.children ? (
              <div key={idx} className="relative group">
                <span className="cursor-pointer hover:text-yellow-400 px-2 py-1 transition">
                  {item.name}
                </span>
                <div className="absolute top-full left-0 mt-2 bg-gray-900 border border-gray-700 rounded-md shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all z-50 min-w-[140px]">
                  {item.children.map((child, cidx) => (
                    <Link
                      key={cidx}
                      href={child.href}
                      className="block px-4 py-2 text-sm hover:text-yellow-400 whitespace-nowrap"
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

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-2xl z-[60]"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Slide-in Menu */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-3/4 sm:w-2/3 bg-gray-800 shadow-xl z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 space-y-6 pt-20">
          {navItems.map((item, idx) =>
            item.children ? (
              <div key={idx}>
                <span className="block font-semibold text-yellow-400 mb-2">
                  {item.name}
                </span>
                <div className="pl-4 space-y-2">
                  {item.children.map((child, cidx) => (
                    <Link
                      key={cidx}
                      href={child.href}
                      className="block text-sm text-neutral-300 hover:text-yellow-400"
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
                className="block text-neutral-300 hover:text-yellow-400"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            )
          )}
        </div>
      </div>

      {/* Overlay behind mobile menu (optional for dimming) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </header>
  );
}
