import React, { useState } from 'react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-sm px-6 md:px-14 py-4 sticky top-0 z-50">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-semibold text-blue-600">SavFi</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center text-gray-700">
          <a href="#" className="hover:text-blue-600">
            Home
          </a>

          {/* PRODUCTS DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <button className="flex items-center gap-1 hover:text-blue-600">
              Products <span>▾</span>
            </button>

            {productsOpen && (
              <div className="absolute top-7 left-0 bg-white border shadow-md rounded-lg w-40 py-2">
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 text-sm"
                >
                  Savings Plan
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 text-sm"
                >
                  Investments
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 text-sm"
                >
                  Loans
                </a>
              </div>
            )}
          </div>

          <a href="#" className="hover:text-blue-600">
            About Us
          </a>
          <a href="#" className="hover:text-blue-600">
            Support
          </a>

          {/* CTA */}
          <button className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700">
            Get started
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span className="w-6 h-[2px] bg-gray-700"></span>
          <span className="w-6 h-[2px] bg-gray-700"></span>
          <span className="w-6 h-[2px] bg-gray-700"></span>
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden flex flex-col gap-4 mt-4 text-gray-700">
          <a href="#" className="hover:text-blue-600">
            Home
          </a>

          {/* MOBILE DROPDOWN */}
          <div>
            <button
              onClick={() => setProductsOpen(!productsOpen)}
              className="flex items-center justify-between w-full hover:text-blue-600"
            >
              Products <span>{productsOpen ? '▴' : '▾'}</span>
            </button>

            {productsOpen && (
              <div className="ml-4 mt-2 flex flex-col gap-2">
                <a href="#" className="hover:text-blue-600 text-sm">
                  Savings Plan
                </a>
                <a href="#" className="hover:text-blue-600 text-sm">
                  Investments
                </a>
                <a href="#" className="hover:text-blue-600 text-sm">
                  Loans
                </a>
              </div>
            )}
          </div>

          <a href="#" className="hover:text-blue-600">
            About Us
          </a>
          <a href="#" className="hover:text-blue-600">
            Support
          </a>

          {/* CTA */}
          <button className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 w-fit">
            Get started
          </button>
        </div>
      )}
    </nav>
  );
}
