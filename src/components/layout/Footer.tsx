import React, { useState } from 'react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Integration Ready hook for Brevo Engine api pipeline
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-obsidian text-ivory border-t border-taupe/20 pt-16 pb-8 px-6 font-montserrat">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
        
        {/* Column 1: Newsletter Manifesto Insertion */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="font-cinzel text-lg tracking-monumental text-gold uppercase">THE INTELLIGENCE BRIEF</h3>
          <p className="text-xs text-taupe leading-relaxed max-w-sm">
            Subscribe to receive editorial chronicles on minimalist spatial structures, upcoming capsule collection drops, and architectural logs.
          </p>
          {subscribed ? (
            <p className="text-xs text-gold font-medium tracking-wide">Inclusion confirmed. Welcome to the lineage.</p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex border-b border-taupe/40 max-w-md focus-within:border-gold transition-colors pb-1">
              <input 
                type="email" 
                required
                placeholder="Enter your professional email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent border-none text-xs w-full focus:outline-none text-ivory py-2 placeholder-taupe/40"
              />
              <button type="submit" className="text-xs uppercase tracking-editorial text-gold hover:text-ivory transition-colors px-2">
                Join
              </button>
            </form>
          )}
        </div>

        {/* Column 2: Platform Links */}
        <div>
          <h4 className="font-cinzel text-xs text-gold uppercase tracking-editorial mb-4">Portals</h4>
          <ul className="space-y-2 text-xs text-taupe">
            <li><a href="/portal/trade" className="hover:text-ivory transition-colors">Trade Application Matrix</a></li>
            <li><a href="/portal/installer" className="hover:text-ivory transition-colors">Contracted Installers Portal</a></li>
            <li><a href="/portal/client" className="hover:text-ivory transition-colors">Client Collaboration Space</a></li>
          </ul>
        </div>

        {/* Column 3: Custom Care Protocols */}
        <div>
          <h4 className="font-cinzel text-xs text-gold uppercase tracking-editorial mb-4">Protocols</h4>
          <ul className="space-y-2 text-xs text-taupe">
            <li><a href="/protocols/shipping" className="hover:text-ivory transition-colors">Global Logistics & Freight</a></li>
            <li><a href="/protocols/returns" className="hover:text-ivory transition-colors">Material Custom Assurances</a></li>
            <li><a href="/protocols/maintenance" className="hover:text-ivory transition-colors">Product Maintenance Records</a></li>
          </ul>
        </div>

        {/* Column 4: Legal Frameworks */}
        <div>
          <h4 className="font-cinzel text-xs text-gold uppercase tracking-editorial mb-4">Legal</h4>
          <ul className="space-y-2 text-xs text-taupe">
            <li><a href="/legal/terms" className="hover:text-ivory transition-colors">Terms of Architectural Engagement</a></li>
            <li><a href="/legal/privacy" className="hover:text-ivory transition-colors">Privacy Cryptography Policies</a></li>
            <li><a href="/legal/cookies" className="hover:text-ivory transition-colors">Cookie Tracking Metrics</a></li>
          </ul>
        </div>

      </div>

      {/* Global Ledger Signoff Base */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-taupe/10 flex flex-col md:flex-row items-center justify-between text-[10px] text-taupe uppercase tracking-editorial">
        <p>© {new Date().getFullYear()} The Revamp Uganda. All Sovereigns Reserved.</p>
        <p className="mt-2 md:mt-0">Designed & Synchronized under Luxury Digital Standards.</p>
      </div>
    </footer>
  );
};
