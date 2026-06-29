import React, { useState, useEffect } from 'react';
import { UserProfile } from '../../types/platform';
import { supabase } from '../../lib/supabaseClient';

interface HeaderProps {
  onOpenAIConcierge: () => void;
  cartCount: number;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAIConcierge, cartCount }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Check current auth profile configuration
    const fetchSession = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        if (data) setProfile(data as unknown as UserProfile);
      }
    };
    fetchSession();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out border-b ${
          isScrolled 
            ? 'bg-obsidian/95 border-taupe/20 py-4 shadow-xl' 
            : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Brand Logo - Monumental Editorial Type */}
          <a href="/" className="flex flex-col select-none group">
            <span className="font-cinzel text-xl md:text-2xl tracking-monumental text-ivory transition-colors group-hover:text-gold">
              THE REVAMP
            </span>
            <span className="font-montserrat text-[9px] tracking-editorial text-taupe uppercase pl-0.5">
              Uganda
            </span>
          </a>

          {/* Core Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-10">
            <button 
              onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
              className="font-montserrat text-xs tracking-editorial uppercase text-ivory hover:text-gold transition-colors duration-300"
            >
              Collections {isMegaMenuOpen ? '▲' : '▼'}
            </button>
            <a href="/architecture" className="font-montserrat text-xs tracking-editorial uppercase text-ivory hover:text-gold transition-colors duration-300">
              Architecture & Portfolios
            </a>
            <a href="/bespoke" className="font-montserrat text-xs tracking-editorial uppercase text-ivory hover:text-gold transition-colors duration-300">
              Bespoke Request
            </a>
          </nav>

          {/* Action Center (AI Concierge, Portals, Cart) */}
          <div className="flex items-center space-x-6">
            {/* AI Concierge Trigger */}
            <button 
              onClick={onOpenAIConcierge}
              className="flex items-center space-x-2 border border-gold/30 hover:border-gold px-4 py-1.5 transition-all duration-300 bg-obsidian/40"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse"></span>
              <span className="font-montserrat text-[10px] uppercase tracking-editorial text-gold">AI Concierge</span>
            </button>

            {/* Portal Link Based on User Profile Clearance */}
            {profile ? (
              <a 
                href={`/portal/${profile.role.toLowerCase()}`}
                className="font-montserrat text-xs tracking-editorial text-ivory hover:text-gold transition-all uppercase underline underline-offset-4"
              >
                Dashboard ({profile.firstName})
              </a>
            ) : (
              <a href="/auth/login" className="font-montserrat text-xs tracking-editorial text-ivory hover:text-gold transition-all uppercase">
                Sign In
              </a>
            )}

            {/* Micro Shopping Basket Tracker */}
            <a href="/cart" className="relative p-2 text-ivory hover:text-gold transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold rounded-full text-[9px] font-bold text-obsidian flex items-center justify-center font-montserrat">
                  {cartCount}
                </span>
              )}
            </a>
          </div>
        </div>
      </header>

      {/* Luxury Dropdown Mega Menu Framework */}
      {isMegaMenuOpen && (
        <div className="fixed top-[73px] left-0 w-full bg-obsidian border-b border-taupe/20 z-40 animate-fade-in py-12 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-cinzel text-xs text-gold uppercase tracking-editorial mb-4">The Avant-Garde</h4>
              <ul className="space-y-2 font-montserrat text-xs text-taupe">
                <li><a href="/collections/avant-garde/lounge" className="hover:text-ivory transition-colors">Lounge & Structural Seating</a></li>
                <li><a href="/collections/avant-garde/lighting" className="hover:text-ivory transition-colors">Sculptural Architectural Lighting</a></li>
                <li><a href="/collections/avant-garde/tables" className="hover:text-ivory transition-colors">Monolithic Centerpieces</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-cinzel text-xs text-gold uppercase tracking-editorial mb-4">Minimalist Obsidian</h4>
              <ul className="space-y-2 font-montserrat text-xs text-taupe">
                <li><a href="/collections/obsidian/casegoods" className="hover:text-ivory transition-colors">Carbonized Oak Casegoods</a></li>
                <li><a href="/collections/obsidian/hardware" className="hover:text-ivory transition-colors">Polished Steel Architectural Hardware</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-cinzel text-xs text-gold uppercase tracking-editorial mb-4">Classic Ivory</h4>
              <ul className="space-y-2 font-montserrat text-xs text-taupe">
                <li><a href="/collections/ivory/textiles" className="hover:text-ivory transition-colors">Raw Silk & Belgian Linen Settings</a></li>
                <li><a href="/collections/ivory/marbles" className="hover:text-ivory transition-colors">Travertine & Calacatta Structural Additions</a></li>
              </ul>
            </div>
            <div className="bg-taupe/5 p-6 border border-taupe/10 flex flex-col justify-between">
              <div>
                <span className="font-montserrat text-[10px] text-gold uppercase tracking-editorial block mb-2">Bespoke Fabrication</span>
                <p className="font-playfair text-sm italic text-ivory leading-relaxed">
                  "Every piece tailored exactly to your floorplans' technical dimensions."
                </p>
              </div>
              <a href="/bespoke" className="mt-4 font-montserrat text-[11px] uppercase tracking-editorial text-gold hover:underline">
                Consult Design Matrix →
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
