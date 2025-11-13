import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-gray-800 text-gray-300 dark:text-gray-200 py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <h2 className="text-3xl font-medium text-white dark:text-gray-100 mb-3 md:mb-0">
          <span className="font-bold">Travel</span>Ease
        </h2>

        <div className="flex space-x-5 mb-3 md:mb-0">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-400 dark:hover:text-sky-300 transition-colors"
          >
            <FaSquareXTwitter />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 dark:hover:text-pink-400 transition-colors"
          >
            <FaInstagram />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            <FaLinkedinIn />
          </a>
        </div>

        <p className="text-sm text-gray-400 dark:text-gray-300">
          © 2025 TravelEase. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
