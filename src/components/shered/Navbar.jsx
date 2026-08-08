"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { FiSun, FiMoon, FiMenu, FiX, FiUser, FiLogOut } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { clearTokens } from "@/lib/auth";

const Navbar = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();
  const { cartItems } = useCart();

  // মাউন্ট হওয়ার পর hydration mismatch এড়াতে flag সেট
  useEffect(() => {
    setMounted(true);
  }, []);

  // টোকেন চেক করে ইউজার লগইন করা আছে কিনা তা নির্ধারণ করা।
  // pathname বদলালে আবার চেক করা হয়, কারণ client-side navigation-এ
  // Navbar remount হয় না, তাই শুধু mount-এ চেক করলে login/logout-এর
  // পরে বাটন আপডেট হয় না। "authChange" ইভেন্ট শোনা হয় যাতে login/logout
  // করার সাথে সাথেই (পেজ পরিবর্তন ছাড়াই) UI আপডেট হয়।
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("access_token");
      setIsLoggedIn(!!token);
    };

    checkAuth();

    window.addEventListener("storage", checkAuth); // অন্য ট্যাবে login/logout হলে
    window.addEventListener("authChange", checkAuth); // একই ট্যাবে manual dispatch

    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("authChange", checkAuth);
    };
  }, [pathname]);

  // pathname বদলালে mobile menu অটো বন্ধ হবে (ইউজার menu open রেখে
  // অন্য কোনোভাবে নেভিগেট করলে যেন খোলা না থেকে যায়)
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // লগআউট হ্যান্ডলার
  const handleLogout = () => {
    clearTokens();
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  const totalCartItems = (cartItems || []).reduce(
    (total, item) => total + (item.quantity || 1),
    0,
  );

  const NAV_LINKS = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: `Cart (${totalCartItems})`, href: "/cart" },
  ];

  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow-sm border-b border-gray-100 dark:border-gray-800 px-4 sm:px-8 py-4 transition-colors duration-300 relative z-50 sticky top-0 ">
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

        {/* Desktop Auth Buttons & Theme Toggle */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Theme Toggle Button */}
          {mounted ? (
            <button
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle Theme"
            >
              {resolvedTheme === "dark" ? (
                <FiSun size={18} />
              ) : (
                <FiMoon size={18} />
              )}
            </button>
          ) : (
            <div className="w-9 h-9 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
          )}

          {/* Conditional Auth Links */}
          {mounted &&
            (isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
              >
                <FiLogOut size={16} />
                <span>Logout</span>
              </button>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
                >
                  Sign Up
                </Link>
              </div>
            ))}
        </div>

        {/* Mobile Action Controls (Theme Toggle & Mobile Menu Button) */}
        <div className="flex items-center space-x-3 md:hidden">
          {mounted ? (
            <button
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-yellow-400"
              aria-label="Toggle Theme"
            >
              {resolvedTheme === "dark" ? (
                <FiSun size={18} />
              ) : (
                <FiMoon size={18} />
              )}
            </button>
          ) : (
            <div className="w-9 h-9 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
          )}

          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle Menu"
            aria-expanded={isMobileMenuOpen}
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

          <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex flex-col space-y-2">
            {mounted &&
              (isLoggedIn ? (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-center px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                  >
                    Sign Up
                  </Link>
                </>
              ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;