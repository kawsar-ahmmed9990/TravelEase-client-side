import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 ">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <h2 className="text-2xl font-semibold text-white mb-3 md:mb-0">
          TravelEase
        </h2>

        <div className="flex space-x-5 mb-3 md:mb-0">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-colors"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-400 transition-colors"
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition-colors"
          >
            <FaInstagram />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            <FaLinkedinIn />
          </a>
        </div>

        <p className="text-sm text-gray-400">
          © 2025 SkillLink. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
