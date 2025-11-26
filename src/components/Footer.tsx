"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
      <div className="max-w-6xl mx-auto px-6">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white">Food Recipes Hub</h2>
            <p className="mt-3 text-sm text-gray-400">
              Discover simple, tasty, and easy-to-follow recipes from around the world.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
              <li><Link href="/terms-and-conditions" className="hover:text-white">Terms & Conditions</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
            <p className="text-sm text-gray-400">Have questions or feedback?</p>
            <p className="text-sm mt-1 text-gray-300">Email: support@foodrecipeshub.com</p>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Food Recipes Hub. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
