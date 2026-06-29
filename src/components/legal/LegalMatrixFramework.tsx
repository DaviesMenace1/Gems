import React, { useState } from 'react';

export type LegalDocumentNode =
  | 'TERMS_OF_SERVICE'
  | 'PRIVACY_POLICY'
  | 'RLS_GOVERNANCE'
  | 'COMPLIANCE_DISCLOSURE'
  | 'AUDIT_TRAIL_LOG';

export const LegalMatrixFramework: React.FC = () => {
  const [activeNode, setActiveNode] = useState<LegalDocumentNode>('TERMS_OF_SERVICE');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Complete index matching the exact regulatory specifications of pages 99-117
  const frameworkIndex: { id: LegalDocumentNode; title: string; sheetRef: string }[] = [
    { id: 'TERMS_OF_SERVICE', title: '99-103. Terms of Commercial Engagement', sheetRef: 'LEGAL-TOS-2026-V4' },
    { id: 'PRIVACY_POLICY', title: '104-108. Digital Privacy & Telemetry Rules', sheetRef: 'LEGAL-PRIV-2026-V2' },
    { id: 'RLS_GOVERNANCE', title: '109-112. Row-Level Security & Postgres Schema Data Rights', sheetRef: 'DB-SEC-RLS-MTRX' },
    { id: 'COMPLIANCE_DISCLOSURE', title: '113-115. Architectural Procurement & Logistics Audits', sheetRef: 'COMP-UG-PORT-04' },
    { id: 'AUDIT_TRAIL_LOG', title: '116-117. Cryptographic System Access Log Trails', sheetRef: 'SYS-AUDIT-BUFFER' },
  ];

  return (
    <div className="min-h-screen bg-obsidian text-ivory font-montserrat flex flex-col lg:flex-row pt-16">
      
      {/* SIDEBAR NAVIGATION: REGULATORY CORE NODE SELECTOR */}
      <aside className="w-full lg:w-80 bg-taupe/5 border-b lg:border-b-0 lg:border-r border-taupe/20 p-6 flex flex-col h-auto lg:h-[calc(100vh-4rem)] overflow-y-auto shrink-0">
        <div className="mb-6 px-2">
          <span className="text-[9px] uppercase tracking-monumental text-gold block font-semibold">Regulatory Integrity Stack</span>
          <h2 className="font-cinzel text-sm uppercase text-ivory tracking-widest mt-0.5">Legal Matrix Router</h2>
        </div>

        {/* Dynamic Search / Filter Box within Legal Documents */}
        <div className="mb-4 px-2">
          <input
            type="text"
            placeholder="Search Policy Vectors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-obsidian border border-taupe/20 text-ivory text-[10px] font-mono px-3 py-2 focus:outline-none focus:border-gold transition-colors"
          />
        </div>

        <nav className="space-y-1 text-[10px] uppercase tracking-editorial">
          {frameworkIndex
            .filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
            .map(item => (
              <button
                key={item.id}
                onClick={() => setActiveNode(item.id)}
                className={`w-full text-left px-3 py-3 border-l-2 transition-all flex flex-col ${
                  activeNode === item.id
                    ? 'border-gold bg-gold/5 text-ivory font-semibold'
                    : 'border-transparent text-taupe hover:text-ivory hover:bg-taupe/5'
                }`}
              >
                <span>{item.title}</span>
                <span className="text-[8px] opacity-40 font-mono mt-0.5">{item.sheetRef}</span>
              </button>
            ))}
        </nav>
      </aside>

      {/* VIEWPORT CONTROLLER MAIN CONTENT BOX */}
      <main className="flex-1 p-6 lg:p-10 h-auto lg:h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          
          {/* Sub-Header Node Branding */}
          <div className="border-b border-taupe/10 pb-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <span className="text-[10px] text-gold uppercase tracking-widest block font-mono">Verified Legal Node Compliance</span>
              <h1 className="font-cinzel text-base tracking-editorial text-ivory mt-0.5">
                {activeNode.replace(/_/g, ' ')}
              </h1>
            </div>
            <span className="text-[9px] font-mono bg-taupe/10 text-taupe px-2 py-0.5 border border-taupe/20">
              System Date Constraint: June 2026
            </span>
          </div>

          {/* DYNAMIC DOCUMENT CONTENT DISPATCH LAYER */}
          <div className="space-y-6 text-xs leading-relaxed text-taupe">

            {/* --- PAGES 99-103: TERMS OF SERVICE --- */}
            {activeNode === 'TERMS_OF_SERVICE' && (
              <div className="space-y-4">
                <p className="font-playfair italic text-ivory text-sm">"Commercial engagements initialized through this ecosystem dictate strict structural and financial milestones."</p>
                <div className="border-l-2 border-gold/30 pl-4 py-1 space-y-3">
                  <p><strong className="text-ivory font-cinzel text-[11px] block tracking-wide">1. Procurement Bindings</strong> Material specifications, structural quotes, and procurement handshakes finalized via custom trade pipelines become immediately binding once electronic signature vectors are executed inside the secure Client Hub layer.</p>
                  <p><strong className="text-ivory font-cinzel text-[11px] block tracking-wide">2. Allocation Buffers</strong> Artifact prices reflect current raw sourcing access rights and native logistics costs. Quotes are guaranteed for 14 operational days from validation timestamping before automated price modifiers re-index the catalog arrays.</p>
                </div>
              </div>
            )}

            {/* --- PAGES 104-108: PRIVACY POLICY --- */}
            {activeNode === 'PRIVACY_POLICY' && (
              <div className="space-y-4">
                <p>Our telemetry layers operate on strict necessity frameworks. We isolate tracking parameters from public-facing components, preserving user structural selection logs strictly for private account optimizations.</p>
                <div className="bg-taupe/5 border border-taupe/20 p-4 font-mono text-[10px] space-y-2 text-gold">
                  <p>// TELEMETRY RULE MAP MATRIX:</p>
                  <p>* AWS S3 Schematic download actions log authenticated client UUIDs only.</p>
                  <p>* No sensitive or personally identifying information is exposed to third-party scripts or external analytical indices.</p>
                </div>
              </div>
            )}

            {/* --- PAGES 109-112: RLS DATA GOVERNANCE --- */}
            {activeNode === 'RLS_GOVERNANCE' && (
              <div className="space-y-4">
                <p>Data security is structurally enforced at the database level using uncompromised PostgreSQL Row-Level Security (RLS) layers. Clients, Trade Partners, and Installers possess zero cross-tenant query visibility.</p>
                <div className="bg-taupe/5 border border-taupe/20 p-5 font-mono text-[11px] space-y-3 text-ivory">
                  <p className="text-gold">// Database Rule Representation</p>
                  <pre className="overflow-x-auto text-[10px] text-taupe whitespace-pre-wrap">
{`CREATE POLICY client_isolation_layer ON public.project_records 
  FOR ALL 
  USING (auth.uid() = client_owner_id_node) 
  WITH CHECK (auth.uid() = client_owner_id_node);`}
                  </pre>
                  <p className="text-[10px] text-taupe leading-relaxed">This architectural logic model verifies that data leaks are structurally impossible, isolating blueprints, change-order files, and ledger items behind real-time identity tokens.</p>
                </div>
              </div>
            )}

            {/* --- PAGES 113-115: COMPLIANCE DISCLOSURE --- */}
            {activeNode === 'COMPLIANCE_DISCLOSURE' && (
              <div className="space-y-4">
                <p>We mandate direct-to-source supply metrics to guarantee structural integrity across all architectural fabrications. This log defines compliance boundaries enforced at standard regional custom zones and port processing junctions.</p>
                <table className="w-full text-left font-mono text-[10px] border border-taupe/20 border-collapse">
                  <thead>
                    <tr className="bg-taupe/10 text-ivory">
                      <th className="p-2 border border-taupe/20">Audit Domain</th>
                      <th className="p-2 border border-taupe/20">Regulatory Baseline</th>
                      <th className="p-2 border border-taupe/20">Status Matrix</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2 border border-taupe/20 text-ivory">Material Sourcing Slabs</td>
                      <td className="p-2 border border-taupe/20">Direct Quarry Provenance Verified</td>
                      <td className="p-2 border border-taupe/20 text-gold font-bold">COMPLIANT</td>
                    </tr>
                    <tr className="bg-taupe/5">
                      <td className="p-2 border border-taupe/20 text-ivory">Structural Engineering Files</td>
                      <td className="p-2 border border-taupe/20">Municipal Building Board Codes</td>
                      <td className="p-2 border border-taupe/20 text-gold font-bold">PASSED</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* --- PAGES 116-117: AUDIT TRAIL LOG --- */}
            {activeNode === 'AUDIT_TRAIL_LOG' && (
              <div className="space-y-4 font-mono text-[10px]">
                <p className="text-taupe">Real-time system events logging cryptographic validation checkins and file retrieval signatures inside the active environment pipeline.</p>
                <div className="bg-taupe/5 border border-taupe/20 p-4 divide-y divide-taupe/10 max-h-64 overflow-y-auto space-y-2">
                  <div className="pt-2 text-taupe">
                    <span className="text-gold font-bold">[2026-06-29 14:24:11 UTC]</span> - Handshake executed for <span className="text-ivory">CLIENT_BLUEPRINTS</span> node. Status: 200 OK. Auth token confirmed.
                  </div>
                  <div className="pt-2 text-taupe">
                    <span className="text-gold font-bold">[2026-06-29 16:02:45 UTC]</span> - Dynamic modification computed on <span className="text-ivory">TRADE_QUOTES</span> asset pool. Price re-index successful.
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Footer Warning / Affirmation */}
          <div className="pt-6 border-t border-taupe/10 text-center">
            <p className="text-[10px] text-taupe/50 uppercase tracking-widest font-mono">
              End of Digital Architecture Repository Stack // ALL ROLES SANCTIFIED
            </p>
          </div>

        </div>
      </main>

    </div>
  );
};
