import React, { useState } from "react";
import { Menu, X, Smartphone, CheckCircle2, ArrowRight } from "lucide-react";
import First from "../assets/img/Rectangle 1889.png";
import second from "../assets/img/Rectangle 1890.png";
import third from "../assets/img/Rectangle 1891.png";
import fourth from "../assets/img/Rectangle 1892.png";
import firth from "../assets/img/Rectangle 1893.png";
import sixth from "../assets/img/Rectangle 1894.png";

import Img1 from "../assets/img/Rectangle 1912.png";
import Img2 from "../assets/img/Rectangle 1916.png";
import Img3 from "../assets/img/Rectangle 1918.png";
import Img4 from "../assets/img/Rectangle 1920.png";
import Img5 from "../assets/img/Rectangle 1922.png";

import Team1 from "../assets/img/Ellipse 4.png";
import Team2 from "../assets/img/Ellipse 5.png";
import Team3 from "../assets/img/Ellipse 6.png";
import Team4 from "../assets/img/Ellipse 7.png";
import Team5 from "../assets/img/Ellipse 8.png";
import Team6 from "../assets/img/Ellipse 9.png";
import Team7 from "../assets/img/Ellipse 10.png";
import Team8 from "../assets/img/Ellipse 11.png";

const SavFiAbout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Data for "What defines us" section
  const values = [
    {
      title: "Customer First",
      desc: "Our customers are the heart of everything we do. We build products that solve their real-world problems and prioritize their financial well-being above all else.",
      img: Img1,
    },
    {
      title: "Better Together",
      desc: "We believe in the power of collaboration. By working together with our users and partners, we create a stronger financial ecosystem for everyone.",
      img: Img2,
    },
    {
      title: "Transparency Always",
      desc: "We operate with complete openness. No hidden fees, no complex jargon—just clear, honest financial services you can understand.",
      img: Img3,
    },
    {
      title: "Security You Can Trust",
      desc: "Your asset security is our top priority. We employ bank-grade security measures and cutting-edge technology to keep your funds safe.",
      img: Img4,
    },
    {
      title: "Innovation That Never Stops",
      desc: "The financial world is evolving, and so are we. We constantly innovate to bring you the best tools for wealth management in the digital age.",
      img: Img5,
    },
  ];

  // Data for Team section
  const team = [
    {
      name: "Elijah Tom",
      role: "Founder / frontend dev",
      img: Team1,
    },
    {
      name: "Kelly Mbaga",
      role: "Product Manager",
      img: Team2,
    },
    {
      name: "Solomon Odunayo",
      role: "Engineering Lead",
      img: Team3,
    },
    {
      name: "Abolaji Oladokun",
      role: "Legal & Compliance",
      img: Team4,
    },
    {
      name: "Bianca Onwa",
      role: "Growth & Marketing",
      img: Team5,
    },
    {
      name: "Chima Umeji",
      role: "Product Design",
      img: Team6,
    },
    {
      name: "Isaac Asuquo",
      role: "Backend Engineer",
      img: Team7,
    },
    {
      name: "Abas Nwachukwu",
      role: "Frontend Engineer",
      img: Team8,
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      {/* --- Navigation --- */}
      <nav className="flex justify-between items-center px-6 py-8 max-w-7xl mx-auto">
        <div className="text-2xl font-bold text-blue-500 cursor-pointer">
          SavFi
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8 text-gray-600 font-medium">
          <a href="#" className="hover:text-blue-500">
            Home
          </a>
          <a href="#" className="hover:text-blue-500">
            Products
          </a>
          <a href="#" className="text-blue-500 font-bold">
            About Us
          </a>
          <a href="#" className="hover:text-blue-500">
            Contact
          </a>
        </div>

        <button className="hidden md:block px-6 py-2 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition">
          Sign In
        </button>

        {/* Mobile Menu Toggle */}
        <button onClick={toggleMenu} className="md:hidden text-gray-600">
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg p-4 flex flex-col space-y-4 absolute w-full z-50">
          <a href="#" className="text-gray-600 hover:text-blue-500">
            Home
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-500">
            Products
          </a>
          <a href="#" className="text-blue-500 font-bold">
            About Us
          </a>
          <button className="px-6 py-2 bg-blue-500 text-white rounded-full font-semibold w-full">
            Sign In
          </button>
        </div>
      )}

      {/* --- Hero Section --- */}
      <header className="px-6 py-12 md:py-20 max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-blue-500 leading-tight mb-8 max-w-4xl mx-auto">
          Reinventing wealth management for Africans with stablecoins.
        </h1>
        <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-16">
          We are building a financial ecosystem that empowers individuals to
          grow their wealth through secure, automated, and high-yield savings
          opportunities.
        </p>

        {/* Updated Image Grid - Stack/Tall/Stack/Tall Pattern */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:h-[600px] mb-20 mt-80">
          {/* Column 1: Stacked Images */}
          <div className="flex flex-col gap-4 h-full">
            <div className="h-48 md:h-auto md:flex-1 rounded-2xl overflow-hidden shadow-lg relative group">
              <img
                src={First}
                alt="Team working"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
            <div className="h-48 md:h-auto md:flex-1 rounded-2xl overflow-hidden shadow-lg relative group">
              <img
                src={second}
                alt="Professional woman"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
          </div>

          {/* Column 2: Tall Image */}
          <div className="rounded-2xl overflow-hidden shadow-lg h-full group">
            <img
              src={third}
              alt="Modern Office"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
          </div>

          {/* Column 3: Stacked Images */}
          <div className="flex flex-col gap-4 h-full">
            <div className="h-48 md:h-auto md:flex-1 rounded-2xl overflow-hidden shadow-lg relative group">
              <img
                src={fourth}
                alt="Meeting"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
            <div className="h-48 md:h-auto md:flex-1 rounded-2xl overflow-hidden shadow-lg relative group">
              <img
                src={firth}
                alt="Office discussion"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
          </div>

          {/* Column 4: Tall Image */}
          <div className="rounded-2xl overflow-hidden shadow-lg h-full group">
            <img
              src={sixth}
              alt="Handshake"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
          </div>
        </div>
      </header>

      {/* --- About Us Text --- */}
      <section className="py-16 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-500 mb-8">
          About us.
        </h2>
        <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
          <p>
            We are on a mission to bring financial freedom to everyone. By
            leveraging the power of stablecoins and decentralized finance, we
            provide tools that were previously accessible only to the wealthy.
          </p>
          <p>
            Our platform is designed to be simple, secure, and transparent,
            ensuring that you can focus on what matters most—living your
            life—while your money works for you.
          </p>
        </div>
      </section>

      {/* --- What defines us (Values) --- */}
      <section className="py-20 px-6 bg-blue-50/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-500 mb-16">
            What defines us.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-36 ">
            {values.map((val, index) => (
              <div
                key={index}
                className="bg-blue-50 rounded-2xl overflow-hidden hover:shadow-xl transition duration-300 flex flex-col group"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={val.img}
                    alt={val.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-blue-500 mb-3">
                    {val.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Team Section --- */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-6xl font-bold text-center text-blue-500 mb-16">
          The right talents, the perfect team.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 justify-items-center">
          {team.map((member, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center w-full max-w-xs"
            >
              {/* Circle Image Container with Gradient Border Effect */}
              <div className="relative p-1 rounded-full bg-gradient-to-tr from-blue-400 to-blue-200 mb-6">
                <div className="p-1 bg-white rounded-full">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-50 h-50 rounded-full object-cover transition duration-300"
                  />
                </div>
              </div>

              <h3 className="text-xl font-bold text-blue-600">{member.name}</h3>
              <p className="text-gray-500 text-sm mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- Footer (Reused) --- */}
      <footer className="bg-gray-900 text-white">
        {/* Newsletter Section */}
        <div className="bg-blue-500 py-12 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <h3 className="text-2xl font-bold text-white max-w-xs text-center md:text-left">
              Subscribe to our newsletter today.
            </h3>
            <div className="flex w-full md:w-auto bg-white/20 p-2 rounded-full backdrop-blur-sm">
              <input
                type="email"
                placeholder="Email Address"
                className="bg-transparent border-none text-white placeholder-blue-100 px-4 py-2 outline-none flex-grow w-full md:w-64"
              />
              <button className="bg-white text-blue-500 px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Links Section */}
        <div className="px-6 py-16 max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          <div>
            <h4 className="font-bold text-lg mb-6">Company</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Press
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Product</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  VauFi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  GrowFi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  HushFi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  SwiftFi
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h4 className="font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2">
                <Smartphone size={16} /> +234 812 345 6789
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight size={16} /> support@savfi.com
              </li>
              <li className="flex items-start gap-2">
                <div className="w-4 mt-1">
                  <CheckCircle2 size={16} />
                </div>{" "}
                Lagos, Nigeria
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 p-6 text-center text-gray-500 text-xs">
          &copy; {new Date().getFullYear()} SavFi. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default SavFiAbout;
