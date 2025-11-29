import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";
import Logo from "../../assets/public/logo-dark.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  const footerLinks = {
    product: [
      { name: "FlexFi", href: "/products#products" },
      { name: "GrowFi", href: "/products#products" },
      { name: "VaultFi", href: "/products#products" },
      { name: "SwiftFi", href: "/products#products" },
    ],
    company: [
      { name: "About Us", href: "/about-us" },
      { name: "How It Works", href: "/#how-it-works" },
      { name: "Referral", href: "/#referral" },
    ],
    support: [
      { name: "Help Center", href: "/support-page" },
      { name: "FAQ", href: "/#faq" },
      { name: "Contact Us", href: "/support-page" },
      { name: "Security", href: "/security-page" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Terms of Service", href: "/terms-of-service" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-foreground text-light ">
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="">
              <img src={Logo} alt="SavFi Logo" className="w-24" />
            </Link>
            <p className="text-light/70 mt-5 mb-6 leading-relaxed">
              Nigeria's modern savings platform powered by blockchain
              technology. Save securely, earn interest, and protect your wealth.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-light/10 hover:bg-light/20 flex items-center justify-center transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h3 className="font-bold mb-4">Products</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-light/70 hover:text-light transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-light/70 hover:text-light transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-light/70 hover:text-light transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-light/70 hover:text-light transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-light/20 pt-8 mb-8">
          <div className="max-w-md">
            <h3 className="font-bold mb-2">Stay Updated</h3>
            <p className="text-light/70 mb-4 text-sm">
              Get the latest updates on new features and savings tips
            </p>
            <div className="flex flex-wrap gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-light/10 border border-light/20 text-light placeholder:text-light/50 focus:outline-none focus:border-light/40"
              />
              <button className="px-6 py-2 bg-primary cursor-pointer rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-light/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-light/70">
          <p>© 2025 SavFi. All rights reserved.</p>
          <p>• Powered by Blockchain Technology</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
