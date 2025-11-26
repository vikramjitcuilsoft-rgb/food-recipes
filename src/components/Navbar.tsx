"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCategories } from "../hooks/useCategories";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // Fetch categories
  const {
    data: categories = [],
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim() === "") return;
    router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    setSearchQuery("");
    setOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg shadow-md">
      <div className="max-w-6xl mx-auto px-5 py-3 flex justify-between items-center">

        {/* LOGO */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link
            href="/"
            className="text-2xl font-extrabold tracking-tight text-orange-600"
          >
            🍔 Food<span className="text-black">Recipes</span>
          </Link>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">

          <NavLink href="/" label="Home" />
          <NavLink href="/about" label="About" />

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search recipes..."
              className="px-3 py-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-600"
            >
              <Search size={18} />
            </button>
          </form>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white shadow-inner px-5 py-3 space-y-3"
        >
          <MobileLink href="/" label="Home" onClick={() => setOpen(false)} />

          {/* Mobile Recipes Dropdown */}
          <div>
            <p className="text-gray-700 font-medium mb-2">Recipes</p>

            {categoriesLoading && <p className="text-sm text-gray-500">Loading...</p>}
            {categoriesError && <p className="text-sm text-red-500">Failed to load</p>}

            {!categoriesLoading &&
              categories.map((cat) => (
                <MobileLink
                  key={cat.idCategory}
                  href={`/category/${cat.strCategory}`}
                  label={cat.strCategory}
                  onClick={() => setOpen(false)}
                />
              ))}
          </div>

          <MobileLink href="/about" label="About" onClick={() => setOpen(false)} />

          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search recipes..."
              className="flex-1 px-3 py-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button type="submit" className="text-gray-500 hover:text-orange-600">
              <Search size={18} />
            </button>
          </form>
        </motion.div>
      )}
    </nav>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="text-gray-700 hover:text-orange-600 transition font-medium"
    >
      {label}
    </Link>
  );
}

function MobileLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block text-gray-700 hover:text-orange-600 transition font-medium text-lg"
    >
      {label}
    </Link>
  );
}
