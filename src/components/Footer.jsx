import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 p-4 w-full mt-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto flex justify-center items-center">
        <span className="text-center text-sm">
          © {new Date().getFullYear()} DevTinder. All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
