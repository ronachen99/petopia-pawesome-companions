import React from "react";

// simple footer that will be imported to the app componenet
const Footer = () => {
  return (
    <footer className="py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center text-gray-500">
          <span>&copy; 2023 Petopia. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
