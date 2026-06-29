import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

// Complete role-based navigation specification containing all 24 sub-dashboard pages
export type PortalSection =
  // 38-44: Client Hub Pages
  | 'CLIENT_OVERVIEW' | 'CLIENT_PROJECTS' | 'CLIENT_BLUEPRINTS' | 'CLIENT_INVOICES' | 'CLIENT_APPROVALS' | 'CLIENT_COMMS' | 'CLIENT_PROFILE'
  // 45-50: Trade Partner Pages
  | 'TRADE_OVERVIEW' | 'TRADE_QUOTES' | 'TRADE_ORDERS' | 'TRADE_LIBRARY' | 'TRADE_LOYALTY' | 'TRADE_SUPPORT'
  // 51-55: Installer Alliance Pages
  | 'INSTALLER_OVERVIEW' | 'INSTALLER_JOBS' | 'INSTALLER_SPECS' | 'INSTALLER_REPORTS' | 'INSTALLER_SUPPORT'
  // 56-61: Inner Circle Member Pages
  | 'MEMBER_OVERVIEW' | 'MEMBER_VAULT' | 'MEMBER_HISTORY' | 'MEMBER_ANALYTICS' | 'MEMBER_EVENTS' | 'MEMBER_SETTINGS';

interface PortalEcosystemClusterProps {
  userRole: 'CLIENT' | 'TRADE' | 'INSTALLER' | 'MEMBER';
  initialSection?: PortalSection;
}

export const PortalEcosystemCluster: React.FC<PortalEcosystemClusterProps> = ({ userRole, initialSection }) => {
  // Gracefully fallback to the correct domain overview depending on initial properties
  const getFallbackSection = (): PortalSection => {
    if (initialSection) return initialSection;
    switch (userRole) {
      case 'TRADE': return 'TRADE_OVERVIEW';
      case 'INSTALLER': return 'INSTALLER_OVERVIEW';
      case 'MEMBER': return 'MEMBER_OVERVIEW';
      default: return 'CLIENT_OVERVIEW';
    }
  };

  const [activeSection, setActiveSection] = useState<PortalSection>(getFallbackSection());
  const [tradeTier, setTradeTier] = useState<'SILVER' | 'GOLD' | 'BLACK_DIAMOND'>('GOLD');

  // Multi-tier mock states mapping individual functional interactions 
  const [portalState] = useState({
    activeQuotes: [
      { id: 'q-902', specification: 'Penthouse Perimeter Trim', terms: 'Trade Net 30', valuation: 18450000 }
    ],
    allocatedJobs: [
      { id: 'job-101', site: 'Nakasero Ridge Estate', structuralTask: 'Affixing Fluted Oak Paneling', status: 'DISPATCHED' }
    ],
    vaultCapsules: [
      { id: 'v-01', title: 'The Carbonized Ash Dining Frame', availability: '3 Units Remaining Worldwide' }
    ]
  });

  // Structural dynamic navigation array assembler matching exact page layout parameters
  const navigationManifest: { id: PortalSection; label: string; role: typeof userRole }[] = [
    { id: 'CLIENT_OVERVIEW', label: '38. Portal Hub Overview', role: 'CLIENT' },
    { id: 'CLIENT_PROJECTS', label: '39. Active Projects Tracker', role: 'CLIENT' },
    { id: 'CLIENT_BLUEPRINTS', label: '40. AWS S3 Schematic Vault', role: 'CLIENT' },
    { id: 'CLIENT_INVOICES', label: '41. Invoices & Disbursements', role: 'CLIENT' },
    { id: 'CLIENT_APPROVALS', label: '42. Change-Order Verification', role: 'CLIENT' },
    { id: 'CLIENT_COMMS', label: '43. Secure Studio Comms Log', role: 'CLIENT' },
    { id: 'CLIENT_PROFILE', label: '44. Client Profile Credentials', role: 'CLIENT' },
    
    { id: 'TRADE_OVERVIEW', label: '45. Trade Command Center', role: 'TRADE' },
    { id: 'TRADE_QUOTES', label: '46. Commercial Pricing Engine', role: 'TRADE' },
    { id: 'TRADE_ORDERS', label: '47. Procurement Ledger', role: 'TRADE' },
    { id: 'TRADE_LIBRARY', label: '48. BIM & Spec Media Assets', role: 'TRADE' },
    { id: 'TRADE_LOYALTY', label: '49. Tier Privilege Telemetry', role: 'TRADE' },
    { id: 'TRADE_SUPPORT', label: '50. Priority Help Desk Tickets', role: 'TRADE' },
    
    { id: 'INSTALLER_OVERVIEW', label: '51. Contractor Assignment Hub', role: 'INSTALLER' },
    { id: 'INSTALLER_JOBS', label: '52. Allocated Field Works', role: 'INSTALLER' },
    { id: 'INSTALLER_SPECS', label: '53. Architectural Assembly Specs', role: 'INSTALLER' },
    { id: 'INSTALLER_REPORTS', label: '54. Site Condition Clearances', role: 'INSTALLER' },
    { id: 'INSTALLER_SUPPORT', label: '55. Engineering Help Line', role: 'INSTALLER' },
    
    { id: 'MEMBER_OVERVIEW', label: '56. Inner Circle Dashboard', role: 'MEMBER' },
    { id: 'MEMBER_VAULT', label: '57. Private Capsule Vault', role: 'MEMBER' },
    { id: 'MEMBER_HISTORY', label: '58. Personal Sourcing Log', role: 'MEMBER' },
    { id: 'MEMBER_ANALYTICS', label: '59. Fine Living Points Tracker', role: 'MEMBER' },
    { id: 'MEMBER_EVENTS', label: '60. Private Gallery Bookings', role: 'MEMBER' },
    { id: 'MEMBER_SETTINGS', label: '61. Communication Baselines', role: 'MEMBER' },
  ];

  return (
    <div className="min-h-screen bg-obsidian text-ivory font-montserrat flex flex-col lg:flex-row pt-16">
      
      {/* SIDEBAR: AUTOMATED NAV STRUCT FILTERED BY SECURE ROLE LAYER */}
      <aside className="w-full lg:w-76 bg-taupe/5 border-b lg:border-b-0 lg:border-r border-taupe/20 p-5 flex flex-col h-auto lg:h-[calc(100vh-4rem)] overflow-y-auto shrink-0">
        <div className="mb-6 px-2">
          <span className="text-[9px] uppercase tracking-monumental text-gold block font-semibold">User Domain Node</span>
          <h2 className="font-cinzel text-sm uppercase text-ivory tracking-widest mt-0.5">{userRole} Portal Environment</h2>
        </div>

        <nav className="space-y-1 text-[10px] uppercase tracking-editorial">
          {navigationManifest
            .filter(item => item.role === userRole)
            .map(item => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full text-left px-3 py-2.5 border-l-2 transition-all ${
                  activeSection === item.id
                    ? 'border-gold bg-gold/5 text-ivory font-semibold'
                    : 'border-transparent text-taupe hover:text-ivory hover:bg-taupe/5'
                }`}
              >
                {item.label}
              </button>
            ))}
        </nav>
      </aside>

      {/* VIEWPORT CONTROLLER MAIN CONTENT BOX */}
      <main className="flex-1 p-6 lg:p-10 h-auto lg:h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
          
          {/* Sub-Header Node Branding */}
          <div className="border-b border-taupe/10 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <span className="text-[10px] text-gold uppercase tracking-widest block font-mono">Secure Client Channel</span>
              <h1 className="font-cinzel text-lg tracking-editorial text-ivory mt-0.5">{activeSection.replace(/_/g, ' ')}</h1>
            </div>
          </div>

          {/* DYNAMIC SUB-VIEW CONDITIONAL DISPATCH LAYER */}
          <div className="space-y-6 text-xs">

            {/* --- CLIENT PORTAL VIEWS (38-44) --- */}
            {activeSection === 'CLIENT_OVERVIEW' && (
              <div className="p-6 bg-taupe/5 border border-taupe/20 leading-relaxed text-taupe">
                Welcome back to your luxury interface window. From this secure environment, you can access verified project milestones, track active financial disbursements, and coordinate directly with your lead studio architectural officers.
              </div>
            )}
            {activeSection === 'CLIENT_PROJECTS' && (
              <div className="border border-taupe/20 p-5">
                <span className="text-[10px] text-gold block mb-1">Project Code: REV-KLA-049</span>
                <h3 className="font-cinzel text-sm text-ivory uppercase tracking-wide">Kololo Hill Residential Sanctuary</h3>
                <div className="w-full bg-taupe/10 h-1.5 mt-4 relative rounded-full overflow-hidden">
                  <div className="bg-gold w-3/4 h-full" />
                </div>
                <p className="text-[10px] text-taupe mt-2 text-right">Structural Framework Assembly: 75% Complete</p>
              </div>
            )}
            {activeSection === 'CLIENT_BLUEPRINTS' && (
              <div className="p-4 border border-taupe/20 bg-taupe/5 flex justify-between items-center">
                <div>
                  <p className="font-medium text-ivory">01_Ground_Floor_Masonry_Zoning.pdf</p>
                  <p className="text-[10px] text-taupe font-mono">Size: 42.1 MB | Approved Variant</p>
                </div>
                <button className="border border-gold text-gold hover:bg-gold hover:text-obsidian px-3 py-1.5 text-[10px] uppercase font-bold tracking-editorial transition-colors bg-gold/5">
                  Fetch Encryption Handshake
                </button>
              </div>
            )}
            {activeSection === 'CLIENT_INVOICES' && (
              <div className="border border-taupe/20 bg-taupe/5 p-4 font-mono flex justify-between items-center">
                <div>
                  <p className="text-ivory">Milestone Call #2: Timber Sourcing Allocation</p>
                  <p className="text-[10px] text-taupe">Due Date: July 15, 2026</p>
                </div>
                <span className="text-gold font-bold">UGX 45,000,000</span>
              </div>
            )}
            {activeSection === 'CLIENT_APPROVALS' && (
              <div className="p-5 border border-gold/20 bg-gold/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-ivory font-medium">Change-Order Spec: Nero Marquina Countertop Swap</h4>
                  <p className="text-taupe text-[11px] mt-1">Replaces standard white marble slabs with deep dramatic Spanish dark-veined stone.</p>
                </div>
                <button className="bg-gold text-obsidian font-bold text-[10px] tracking-editorial uppercase px-4 py-2 hover:bg-gold-hover transition-colors shrink-0">
                  Execute Electronic Signature
                </button>
              </div>
            )}
            {activeSection === 'CLIENT_COMMS' && (
              <div className="border border-taupe/20 p-4 space-y-4">
                <div className="bg-taupe/10 p-3 max-w-lg rounded">
                  <p className="text-[10px] text-gold font-mono mb-1">Lead Studio Architect — 10:24 AM</p>
                  <p className="text-ivory">The structural foundations layout package has cleared local architectural municipal review lines.</p>
                </div>
              </div>
            )}
            {activeSection === 'CLIENT_PROFILE' && (
              <p className="text-taupe italic">Authorized account multi-factor encryption matrix configuration records are handled via row security blocks.</p>
            )}

            {/* --- TRADE PARTNER PORTAL VIEWS (45-50) --- */}
            {activeSection === 'TRADE_OVERVIEW' && (
              <div className="p-6 border border-taupe/20 bg-taupe/5 flex justify-between items-center">
                <div>
                  <span className="text-[10px] text-taupe block uppercase">Assigned B2B Class</span>
                  <span className="font-cinzel text-lg text-gold tracking-widest">{tradeTier} PARTNER</span>
                </div>
                <span className="text-xs text-taupe max-w-xs text-right leading-relaxed">Entitles your specification office to an unconditional 25% net wholesale pricing structure across all internal architectural capsule inventories.</span>
              </div>
            )}
            {activeSection === 'TRADE_QUOTES' && (
              <div className="space-y-4">
                {portalState.activeQuotes.map(q => (
                  <div key={q.id} className="p-4 border border-taupe/20 bg-taupe/5 flex justify-between items-center font-mono">
                    <div>
                      <p className="text-ivory font-semibold">{q.specification} (ID: {q.id})</p>
                      <p className="text-[10px] text-taupe">Agreement Protocol: {q.terms}</p>
                    </div>
                    <span className="text-gold font-bold">UGX {q.valuation.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            )}
            {activeSection === 'TRADE_ORDERS' && (
              <p className="text-taupe text-center py-6 border border-taupe/20 italic">No historical procurement transactions associated with your active company token cluster.</p>
            )}
            {activeSection === 'TRADE_LIBRARY' && (
              <p className="text-taupe">Access direct high-fidelity CAD wireframes, BIM structural configurations, and dimensional layout parameters for all custom furniture elements.</p>
            )}
            {activeSection === 'TRADE_LOYALTY' && (
              <div className="border border-taupe/20 p-5 bg-taupe/5 font-mono">
                <p className="text-ivory">Current Seasonal Purchase Volume: UGX 114,000,000</p>
                <p className="text-[10px] text-gold mt-1">Sustain UGX 150,000,000 by end of winter to activate Black Diamond pricing tier.</p>
              </div>
            )}
            {activeSection === 'TRADE_SUPPORT' && (
              <button className="border border-gold text-gold bg-gold/5 text-[10px] tracking-editorial uppercase px-4 py-2 font-bold">
                Open Priority Commercial Ticket
              </button>
            )}

            {/* --- INSTALLER ALLIANCE PORTAL VIEWS (51-55) --- */}
            {activeSection === 'INSTALLER_OVERVIEW' && (
              <p className="text-taupe leading-relaxed">Welcome to the Field Operations Terminal. Access structural engineering blueprint readouts and upload critical completion certificates from physical building sites.</p>
            )}
            {activeSection === 'INSTALLER_JOBS' && (
              <div className="space-y-4">
                {portalState.allocatedJobs.map(j => (
                  <div key={j.id} className="p-4 border border-taupe/20 bg-taupe/5 flex justify-between items-center">
                    <div>
                      <p className="text-ivory font-semibold">{j.structuralTask}</p>
                      <p className="text-[10px] text-taupe">Destination Location Matrix: {j.site}</p>
                    </div>
                    <span className="text-[10px] bg-gold/20 text-gold font-mono px-2 py-0.5 border border-gold/30">{j.status}</span>
                  </div>
                ))}
              </div>
            )}
            {activeSection === 'INSTALLER_SPECS' && (
              <p className="text-taupe italic">Technical structural engineering joinery specification sheets populate based on assigned jobs in active dispatch buffers.</p>
            )}
            {activeSection === 'INSTALLER_REPORTS' && (
              <div className="p-4 border border-taupe/20 space-y-3">
                <p className="text-ivory">Upload Signed Field Condition Form (.jpg / .pdf)</p>
                <input type="file" className="text-[10px] text-taupe file:bg-taupe/10 file:border-taupe/30 file:text-ivory file:text-[10px] file:px-3 file:py-1 file:mr-3" />
              </div>
            )}
            {activeSection === 'INSTALLER_SUPPORT' && (
              <p className="text-taupe">Emergency Site Coordination Hotline: <span className="text-gold font-mono">+256 414 REVUG</span></p>
            )}

            {/* --- INNER CIRCLE MEMBER PORTAL VIEWS (56-61) --- */}
            {activeSection === 'MEMBER_OVERVIEW' && (
              <div className="p-6 border border-gold/20 bg-gold/5 text-center space-y-2">
                <h3 className="font-cinzel text-base text-gold tracking-monumental uppercase">The Vault Access Granted</h3>
                <p className="text-xs text-taupe max-w-md mx-auto leading-relaxed">Your personal profile holds authenticated access tokens to restricted single-run capsule releases and direct designer text channels.</p>
              </div>
            )}
            {activeSection === 'MEMBER_VAULT' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {portalState.vaultCapsules.map(v => (
                  <div key={v.id} className="border border-taupe/20 p-4 bg-taupe/5 flex flex-col justify-between h-32">
                    <div>
                      <h4 className="font-cinzel text-xs text-ivory tracking-wide uppercase">{v.title}</h4>
                      <p className="text-[10px] text-gold mt-1">{v.availability}</p>
                    </div>
                    <button className="w-full bg-gold text-obsidian text-[10px] font-bold uppercase tracking-editorial py-2 mt-2">
                      Secure Allocation Rights
                    </button>
                  </div>
                ))}
              </div>
            )}
            {activeSection === 'MEMBER_HISTORY' && (
              <p className="text-taupe text-center py-4 border border-taupe/20 italic">Your personal archival selection ledger is current.</p>
            )}
            {activeSection === 'MEMBER_ANALYTICS' && (
              <div className="border border-taupe/20 p-5 bg-taupe/5 font-mono flex justify-between items-baseline">
                <span className="text-xs text-taupe uppercase tracking-wider">Fine Living Balance Metrics:</span>
                <span className="text-xl text-gold font-bold">4,850 PTS</span>
              </div>
            )}
            {activeSection === 'MEMBER_EVENTS' && (
              <div className="border border-taupe/20 p-4 bg-taupe/5 text-xs flex justify-between items-center">
                <div>
                  <p className="text-ivory font-medium">Bespoke Monolith Showcase & Cocktail Gala</p>
                  <p className="text-[10px] text-taupe">July 18, 2026 — 7:00 PM | Nakasero Private Studio</p>
                </div>
                <button className="border border-gold text-gold hover:bg-gold hover:text-obsidian text-[10px] font-bold uppercase px-3 py-1.5 tracking-editorial transition-colors bg-gold/5">
                  Confirm R.S.V.P Token
                </button>
              </div>
            )}
            {activeSection === 'MEMBER_SETTINGS' && (
              <div className="flex items-center space-x-2 border border-taupe/20 p-4">
                <input type="checkbox" id="exclusives" defaultChecked className="accent-gold" />
                <label htmlFor="exclusives" className="text-[10px] text-ivory uppercase tracking-wide">Dispatch Instant Messaging Tokens for Ultra-Limited Artifact Drops</label>
              </div>
            )}

          </div>

        </div>
      </main>

    </div>
  );
};
