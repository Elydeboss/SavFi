import React, { useState } from "react";
import {
  Menu,
  X,
  ChevronDown,
  PiggyBank, // FlexFi
  Lock, // VaultFi
  Sprout, // GrowFi
  Zap, // SwiftFi
} from "lucide-react";

import { Link } from "react-router-dom";

// Data for the Product Dropdown Modal - NOW INCLUDES DEDICATED HREFS
const products = [
  {
    name: "FlexFi",
    description: "Flexible savings",
    color: "text-blue-500",
    icon: PiggyBank,
    bg: "bg-blue-50",
    href: "/flexfi", // Dedicated path
  },
  {
    name: "VaultFi",
    description: "Locked Savings",
    color: "text-purple-600",
    icon: Lock,
    bg: "bg-purple-50",
    href: "/vaultfi", // Dedicated path
  },
  {
    name: "GrowFi",
    description: "Growth Plan",
    color: "text-green-600",
    icon: Sprout,
    bg: "bg-green-50",
    href: "/Growfi", // Dedicated path
  },
  {
    name: "SwiftFi",
    description: "Quick Saving Plan",
    color: "text-yellow-600",
    icon: Zap,
    bg: "bg-yellow-50",
    href: "/products/swiftfi", // Dedicated path
  },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsProductDropdownOpen(false); // Close dropdown if opening mobile menu
  };

  const toggleProductDropdown = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent the navigation link from triggering default behavior
    if (e) e.preventDefault();
    setIsProductDropdownOpen(!isProductDropdownOpen);
  };

  return (
    <div className="pt-4 font-sans text-gray-800">
      {/* --- Navigation --- */}
      <nav className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto ">
        <div className="text-2xl font-bold text-blue-500 cursor-pointer flex items-center">
          SavFi
        </div>

        {/* Desktop Nav with Dropdown */}
        <div className="hidden md:flex items-center space-x-8 text-gray-600 font-medium">
          <a href="#" className="hover:text-blue-500">
            Home
          </a>

          {/* Products Dropdown Trigger */}
          <div className="relative">
            <button
              onClick={toggleProductDropdown}
              className="flex items-center text-blue-500 font-bold focus:outline-none"
            >
              Products
              <ChevronDown
                size={18}
                className={`ml-1 transition-transform duration-200 ${
                  isProductDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Products Dropdown Content (Modal) */}
            {isProductDropdownOpen && (
              <div
                className="absolute left-1/2 transform -translate-x-1/2 mt-4 w-96 p-6 bg-white rounded-3xl shadow-2xl border border-blue-200 animate-fade-in"
                onMouseLeave={() => setIsProductDropdownOpen(false)}
              >
                <div className="grid grid-cols-2 gap-4">
                  {products.map((product) => (
                    <a
                      key={product.name}
                      href={product.href} // Using the dedicated href
                      className={`p-4 rounded-xl ${product.bg} hover:shadow-md transition duration-200 flex flex-col items-center text-center group`}
                      onClick={() => setIsProductDropdownOpen(false)} // Close on click
                    >
                      <product.icon
                        size={28}
                        className={`${product.color} mb-1.5 transition-transform group-hover:scale-110`}
                      />
                      <span className={`text-lg font-bold ${product.color}`}>
                        {product.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {product.description}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link to="/about">
            {" "}
            <a href="#" className="hover:text-blue-500">
              About Us
            </a>
          </Link>

          <Link to=""></Link>
          <a href="#" className="hover:text-blue-500">
            Support
          </a>
        </div>

        <Link to="/signup">
          {" "}
          <button className="hidden md:block px-6 py-2 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition shadow-md">
            Get started
          </button>
        </Link>

        {/* Mobile Menu Toggle */}
        <button onClick={toggleMenu} className="md:hidden text-gray-600">
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-xl p-4 flex flex-col space-y-4 absolute w-full z-40">
          <a href="#" className="text-gray-600 hover:text-blue-500">
            Home
          </a>
          {/* Mobile Products Link - Opens Modal Content Directly */}
          <div className="p-2 border border-blue-200 rounded-xl bg-blue-50">
            <h4 className="text-blue-500 font-bold mb-3">Our Products</h4>
            <div className="grid grid-cols-2 gap-3">
              {products.map((product) => (
                <a
                  key={product.name}
                  href={product.href} // Using the dedicated href
                  className={`p-2 rounded-lg ${product.bg} hover:shadow-sm transition duration-200 flex flex-col items-center text-center`}
                  onClick={() => setIsMenuOpen(false)} // Close menu on click
                >
                  <product.icon size={20} className={`${product.color} mb-1`} />
                  <span className={`text-sm font-bold ${product.color}`}>
                    {product.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {product.description}
                  </span>
                </a>
              ))}
            </div>
          </div>
          <a href="#" className="text-gray-600 hover:text-blue-500">
            About Us
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-500">
            Support
          </a>
          <button className="px-6 py-2 bg-blue-500 text-white rounded-full font-semibold w-full">
            Get started
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
