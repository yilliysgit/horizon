
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Content grid */}
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo + korte tekst */}
        <div>
          <h2 className="text-xl font-bold text-white">MijnWebsite</h2>
          <p className="mt-3 text-sm leading-relaxed">
            Dé plek voor alles wat je zoekt.  
            Volg ons voor meer updates en informatie.
          </p>
        </div>

        {/* Navigatie */}
        <div>
          <h3 className="text-white font-semibold mb-3">Navigatie</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">Over ons</a></li>
            <li><a href="#" className="hover:text-white">Diensten</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <h3 className="text-white font-semibold mb-3">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>
              Email:{" "}
              <a
                href="mailto:info@mijnsite.com"
                className="hover:text-white"
              >
                info@mijnsite.com
              </a>
            </li>
            <li>Tel: +31 6 12345678</li>
            <li>Adres: Straatnaam 123, Amsterdam</li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-gray-800 text-center py-4 text-xs text-gray-400">
        © {new Date().getFullYear()} MijnWebsite. Alle rechten voorbehouden.
      </div>
    </footer>
  );
}
