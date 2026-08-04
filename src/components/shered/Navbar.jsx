"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { cartItems } = useCart();




const totalCartItems = (cartItems || []).reduce(
  (total, item) => total + (item.quantity || 1), 
  0
);
  useEffect(() => setMounted(true), []);

  const NAV_LINKS = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: `Cart (${totalCartItems})`, href: "/cart" },
  ];

  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow-sm border-b border-gray-100 dark:border-gray-800 px-4 sm:px-8 py-4 transition-colors duration-300 relative z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Brand Logo */}
        <Link 
          href="/" 
          className="text-xl font-bold tracking-tight text-gray-900 dark:text-white hover:opacity-90 transition-opacity"
        >
          E-Commerce
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400 font-semibold"
                    : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Action Controls (Theme Toggle & Mobile Menu Button) */}
        <div className="flex items-center space-x-3">
          {/* Theme Toggle Button */}
          {mounted ? (
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle Theme"
            >
              {resolvedTheme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>
          ) : (
            <div className="w-9 h-9 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
          )}

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg text-gray-700 dark:text-gray-200 md:hidden hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-col space-y-3">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default Navbar;