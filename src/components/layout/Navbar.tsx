"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (pathname === "/") {
        const sections = ["notice", "committee", "events", "about"];
        let currentSection = "/";
        const scrollPosition = window.scrollY + 120;

        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const offsetTop = element.offsetTop;
            const offsetHeight = element.offsetHeight;

            if (
              scrollPosition >= offsetTop &&
              scrollPosition < offsetTop + offsetHeight
            ) {
              currentSection = `/#${section}`;
            }
          }
        }

        if (window.scrollY < 100) {
          currentSection = "/";
        }
        setActiveLink(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);

    setTimeout(() => {
      handleScroll();
    }, 100);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (pathname.startsWith("/events") && pathname !== "/events") {
        setActiveLink("/#events");
      } else if (pathname !== "/") {
        setActiveLink(pathname);
      }
    }
  }, [pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Notice Board", path: "/#notice" },
    { name: "Committee", path: "/#committee" },
    { name: "Events", path: "/#events" },
    { name: "About Us", path: "/#about" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-xl shadow-sm py-3 border-b border-slate-100"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            <Link
              href="/"
              className="flex items-center gap-3 group z-50"
              onClick={() => {
                setActiveLink("/");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 p-1 flex items-center justify-center group-hover:shadow-md transition-all">
                <div className="relative w-full h-full">
                  <Image
                    src="/logo.png"
                    alt="MSA DIU Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <span className="font-black text-xl tracking-tight bg-gradient-to-r from-pink-400 to-purple-700 bg-clip-text text-transparent hover:from-pink-500 hover:to-purple-800 transition-colors">
                MSA <span className="text-slate-400 font-medium">|</span> DIU
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1 bg-white/50 backdrop-blur-md px-2 py-1.5 rounded-full border border-slate-200/50 shadow-sm">
              {navLinks.map((link) => {
                const isActive = activeLink === link.path;

                return (
                  <Link
                    href={link.path}
                    key={link.name}
                    onClick={() => setActiveLink(link.path)}
                  >
                    <div
                      className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
                        isActive
                          ? "bg-indigo-50 text-indigo-600 shadow-sm"
                          : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50"
                      }`}
                    >
                      {link.name}
                    </div>
                  </Link>
                );
              })}
            </nav>

            <div className="hidden md:block">
              <Link href="/contact" onClick={() => setActiveLink("/contact")}>
                <button className="bg-gradient-to-tr from-emerald-200 to-slate-400 hover:from-emerald-300 hover:to-slate-500 cursor-pointer text-black px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 shadow-sm hover:shadow-indigo-500/30 hover:-translate-y-0.5 hover:scale-105">
                  Contact Admin
                </button>
              </Link>
            </div>

            <button
              className="md:hidden z-50 w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-700 shadow-sm border border-slate-100 cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <CloseOutlined /> : <MenuOutlined />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white md:hidden pt-24 px-6 pb-6 overflow-y-auto"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => {
                const isActive = activeLink === link.path;
                return (
                  <Link
                    href={link.path}
                    key={link.name}
                    onClick={() => {
                      setActiveLink(link.path);
                      setIsOpen(false);
                    }}
                  >
                    <div
                      className={`text-xl font-bold py-3 border-b border-slate-50 transition-colors ${
                        isActive
                          ? "text-indigo-600"
                          : "text-slate-800 hover:text-indigo-600"
                      }`}
                    >
                      {link.name}
                    </div>
                  </Link>
                );
              })}

              <div className="mt-6 pt-6 border-t border-slate-100">
                <Link
                  href="/contact"
                  onClick={() => {
                    setActiveLink("/contact");
                    setIsOpen(false);
                  }}
                >
                  <div className="w-full bg-slate-900 hover:bg-indigo-600 text-white text-center py-4 rounded-2xl font-bold text-lg transition-colors shadow-sm cursor-pointer">
                    Contact Admin
                  </div>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
