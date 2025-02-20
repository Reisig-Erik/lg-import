import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone } from 'lucide-react';

function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 pt-16">
      <div className="grid grid-cols-4 gap-8 mb-12">
        {/* Company Info */}
        <div>
          <h4 className="font-semibold text-lg mb-4">Libregold</h4>
          <p className="text-sm text-gray-400 mb-6">
            Your trusted partner in precious metal investments since 2020. We provide secure, transparent, and efficient gold trading services.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-white transition">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/about" className="text-gray-400 hover:text-white transition">About Us</Link>
            </li>
            <li>
              <Link to="/products" className="text-gray-400 hover:text-white transition">Products</Link>
            </li>
            <li>
              <Link to="/how-it-works" className="text-gray-400 hover:text-white transition">How It Works</Link>
            </li>
            <li>
              <Link to="/blog" className="text-gray-400 hover:text-white transition">Blog</Link>
            </li>
            <li>
              <Link to="/careers" className="text-gray-400 hover:text-white transition">Careers</Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-semibold text-lg mb-4">Support</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/help" className="text-gray-400 hover:text-white transition">Help Center</Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-400 hover:text-white transition">Contact Us</Link>
            </li>
            <li>
              <Link to="/shipping" className="text-gray-400 hover:text-white transition">Shipping Information</Link>
            </li>
            <li>
              <Link to="/returns" className="text-gray-400 hover:text-white transition">Returns Policy</Link>
            </li>
            <li>
              <Link to="/track-order" className="text-gray-400 hover:text-white transition">Track Your Order</Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-gray-400">
              <Mail className="w-5 h-5" />
              <a href="mailto:support@libregold.com" className="hover:text-white transition">
                support@libregold.com
              </a>
            </li>
            <li className="flex items-center gap-3 text-gray-400">
              <Phone className="w-5 h-5" />
              <a href="tel:+1234567890" className="hover:text-white transition">
                +1 (234) 567-890
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-8 flex justify-between items-center text-sm text-gray-400">
        <div className="flex gap-6">
          <Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-white transition">Terms of Service</Link>
          <Link to="/cookies" className="hover:text-white transition">Cookie Policy</Link>
        </div>
        <p>&copy; {new Date().getFullYear()} Libregold. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;