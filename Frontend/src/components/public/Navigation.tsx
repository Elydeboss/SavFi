import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "../../assets/SavFi-logo.png";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About Us", href: "/about-us" },
    { name: "Support", href: "/support-page" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-light/80 backdrop-blur-lg border-b border-border z-50">
      <div className="container mx-auto py- px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="">
            <img src={Logo} alt="SavFi Logo" className="w-30" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`font-semibold transition-colors ${
                  location.pathname === link.href
                    ? "text-blue"
                    : "text-foreground/80 hover:text-blue"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <button className="text-foreground font-semibold cursor-pointer">
                Sign In
              </button>
            </Link>
            <Link to="/login">
              <button className="bg-blue text-white rounded-full py-2.5 px-5 cursor-pointer font-semibold hover:opacity-90 transition-opacity">
                Get Started
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-slide-up">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`font-medium transition-colors py-2 ${
                    location.pathname === link.href
                      ? "text-blue"
                      : "text-foreground/80 hover:text-blue"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4">
                <button className="text-foreground/90 cursor-pointer font-semibold">
                  Sign In
                </button>
                <button className="w-full py-2.5 font-semibold cursor-pointer rounded-full text-white bg-blue hover:opacity-90 transition-opacity">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
