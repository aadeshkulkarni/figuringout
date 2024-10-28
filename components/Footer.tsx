import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full shadow">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="flex items-center justify-center">
          <ul className="flex justify-center items-center mb-2 text-sm font-medium text-primary sm:mb-0">
            <li>
              <Link href="/terms" className="hover:underline me-4 md:me-6">
                Terms
              </Link>
            </li>
            <li>
              <a href="/policies" className="hover:underline me-4 md:me-6">
                Policies
              </a>
            </li>
            <li>
              <Link href="/privacy" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline me-4 md:me-6">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-slate-500 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 text-center dark:text-gray-400">
          © 2024{" "}
          <a href="https://Figuringout.digital/" className="hover:underline">
            Figuringout™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
