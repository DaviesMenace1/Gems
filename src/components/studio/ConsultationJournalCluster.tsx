import React, { useState } from 'react';

export type StudioViewMode = 'JOURNAL_INDEX' | 'ARTICLE_VIEW' | 'INTAKE_WIZARD';

interface JournalArticle {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  content: string[];
}

export const ConsultationJournalCluster: React.FC = () => {
  const [viewMode, setViewMode] = useState<StudioViewMode>('JOURNAL_INDEX');
  const [wizardStep, setWizardStep] = useState<number>(1);
  
  // Intake Wizard parameters data capture state
  const [intakeForm, setIntakeForm] = useState({
    projectType: 'RESIDENTIAL_ESTATE',
    scopeMetrics: 'FULL_ARCHITECTURAL_BUILD',
    estimatedScale: 'UNDER_500_SQM',
    investmentTier: 'PREMIUM_CORE',
    siteStatus: 'LAND_ACQUIRED_VERIFIED',
    targetDate: ''
  });

  // Editorial Journal Static Content Registry (Pages 23-25)
  const journalRegistry: JournalArticle[] = [
    {
      id: 'art-01',
      title: '023. The Raw Concrete Manifesto: Honoring Monolithic Form in Tropical Climates',
      category: 'ARCHITECTURAL THEORY',
      date: 'May 14, 2026',
      excerpt: 'An investigation into structural thermal mass, local volcanic aggregate casting, and the brutalist rejection of transient surface decoration.',
      content: [
        'Architecture in equatorial matrices demands structural permanence over applied ornament. By examining the structural intersection of raw concrete casting with intense tropical rain tracks, our studio prioritizes raw materials that gain aesthetic value through environmental patination.',
        'We isolate concrete formulas utilizing regional aggregates, maximizing density parameters to guarantee deep structural insulation shields while creating a visceral spatial backdrop that elevates interior textile curation panels.'
      ]
    },
    {
      id: 'art-02',
      title: '024. Spatial Tectonics & Psychological Calibration: Crafting Restful Transitions',
      category: 'INTERIOR CURATION',
      date: 'June 02, 2026',
      excerpt: 'Analyzing the micro-metrics of ceiling elevation adjustments and material thresholds on private residential flow networks.',
      content: [
        'Volumetric compression controls human movement maps. Elevating transitional entry tracks while simultaneously dampening acoustic reflections via perimeter fluted wood creates an involuntary psychological shifting window from public exposure to ultimate sanctuary conditions.',
        'This piece uncovers the strict millimeter guidelines utilized by our design office to program spatial transitions across high-end luxury residential estates.'
      ]
    }
  ];

  const [activeArticle, setActiveArticle] = useState<JournalArticle>(journalRegistry[0]);

  return (
    <div className="min-h-screen bg-obsidian text-ivory font-montserrat flex flex-col pt-16">
      
      {/* PERSISTENT CONTEXT BAR: Media and Consultation Telemetry */}
      <div className="bg-taupe/5 border-b border-taupe/10 py-3 px-6 text-[9px] uppercase tracking-monumental flex justify-between items-center z-10">
        <div className="flex space-x-6 font-mono">
          <button 
            onClick={() => setViewMode('JOURNAL_INDEX')} 
            className={`hover:text-gold transition-colors ${viewMode.startsWith('JOURNAL') || viewMode === 'ARTICLE_VIEW' ? 'text-gold font-bold' : 'text-taupe'}`}
          >
            23-25. The Editorial Journal
          </button>
          <button 
            onClick={() => { setViewMode('INTAKE_WIZARD'); setWizardStep(1); }} 
            className={`hover:text-gold transition-colors ${viewMode === 'INTAKE_WIZARD' ? 'text-gold font-bold' : 'text-taupe'}`}
          >
            26-27. Consultation Intake Wizard
          </button>
        </div>
        <span className="text-gold hidden sm:inline">// CORE CREATIVE LAYER ACTIVE</span>
      </div>

      {/* CORE VIEW RENDERING SYSTEM */}
      <main className="flex-1 p-6 lg:p-12 max-w-4xl w-full mx-auto">

        {/* PAGES 23 & 24: JOURNAL ARCHIVE MASTER INDEX */}
        {viewMode === 'JOURNAL_INDEX' && (
          <div className="space-y-10 animate-fade-in">
            <div className="max-w-xl space-y-1">
              <span className="text-[10px] text-gold uppercase tracking-monumental block">Curation Thought Leadership</span>
              <h1 className="font-cinzel text-2xl uppercase tracking-editorial text-ivory">The Studio Journal Ledger</h1>
              <p className="text-xs text-taupe font-playfair italic">Documenting material experiments, architectural philosophy guidelines, and spatial engineering methodology directly from the studio drafting table.</p>
            </div>

            <div className="divide-y divide-taupe/20 space-y-8">
              {journalRegistry.map(article => (
                <div key={article.id} className="pt-8 first:pt-0 group grid grid-cols-1 md:grid-cols-4 gap-4 items-baseline">
                  <div className="font-mono text-[9px] text-gold uppercase">{article.category} // {article.date}</div>
                  <div className="md:col-span-3 space-y-3">
                    <h2 
                      onClick={() => { setActiveArticle(article); setViewMode('ARTICLE_VIEW'); }}
                      className="font-cinzel text-sm text-ivory uppercase tracking-wide group-hover:text-gold cursor-pointer transition-colors leading-snug"
                    >
                      {article.title}
                    </h2>
                    <p className="text-xs text-taupe leading-relaxed font-sans">{article.excerpt}</p>
                    <button 
                      onClick={() => { setActiveArticle(article); setViewMode('ARTICLE_VIEW'); }}
                      className="text-[9px] font-mono text-gold uppercase tracking-editorial font-bold block hover:underline"
                    >
                      Access Text Layout &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PAGE 25: INDIVIDUAL EDITORIAL ARTICLE VIEW CANVAS */}
        {viewMode === 'ARTICLE_VIEW' && activeArticle && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <button 
                onClick={() => setViewMode('JOURNAL_INDEX')} 
                className="text-[9px] font-mono text-gold uppercase hover:underline"
              >
                &larr; Return to Journal Ledger
              </button>
            </div>

            <div className="space-y-3 border-b border-taupe/10 pb-6">
              <div className="font-mono text-[9px] text-gold uppercase tracking-wider">{activeArticle.category} // ARCHIVE ID: {activeArticle.id}</div>
              <h1 className="font-cinzel text-xl text-ivory uppercase tracking-editorial leading-tight">{activeArticle.title}</h1>
              <p className="text-[10px] text-taupe font-mono">Published Operational Sequence: {activeArticle.date}</p>
            </div>

            {/* Simulated Editorial Canvas Imagery Slot */}
            <div className="aspect-[21/9] bg-taupe/5 border border-taupe/20 flex items-center justify-center text-taupe font-mono text-[10px] uppercase tracking-widest">
              [ High-Fidelity Conceptual Architectural Spread Graphic ]
            </div>

            <div className="space-y-6 max-w-2xl text-xs text-taupe leading-relaxed font-sans">
              {activeArticle.content.map((paragraph, idx) => (
                <p key={idx} className="first-letter:text-xl first-letter:font-cinzel first-letter:text-gold first-letter:mr-1">{paragraph}</p>
              ))}
            </div>

            <div className="pt-6 border-t border-taupe/10">
              <button 
                onClick={() => setViewMode('JOURNAL_INDEX')}
                className="w-full border border-taupe/30 hover:border-gold hover:text-gold text-[10px] uppercase font-bold tracking-editorial py-3 transition-colors text-center"
              >
                Browse Alternative Conceptual Columns
              </button>
            </div>
          </div>
        )}

        {/* PAGES 26 & 27: COMPREHENSIVE INTERACTIVE INTAKE WIZARD */}
        {viewMode === 'INTAKE_WIZARD' && (
          <div className="space-y-8 animate-fade-in max-w-xl mx-auto border border-taupe/20 bg-taupe/5 p-6 lg:p-8">
            
            {/* Step Counter Headers */}
            <div className="flex justify-between items-center border-b border-taupe/10 pb-4">
              <div>
                <span className="text-[9px] text-gold font-mono uppercase block">Step {wizardStep} of 3</span>
                <h2 className="font-cinzel text-sm uppercase text-ivory tracking-widest mt-0.5">Project Parameter Matrix</h2>
              </div>
              <div className="flex space-x-1">
                {[1, 2, 3].map(i => (
                  <div key={i} className={`h-1 w-6 rounded-full transition-all ${wizardStep >= i ? 'bg-gold' : 'bg-taupe/20'}`} />
                ))}
              </div>
            </div>

            {/* STEP 1: TYPOLOGY AND OPERATIONAL SCOPE */}
            {wizardStep === 1 && (
              <div className="space-y-4 font-mono text-[10px]">
                <div className="space-y-2">
                  <label className="text-ivory uppercase tracking-wide block">01. Architectural Asset Class</label>
                  <select 
                    value={intakeForm.projectType}
                    onChange={(e) => setIntakeForm({...intakeForm, projectType: e.target.value})}
                    className="w-full bg-obsidian border border-taupe/20 text-ivory p-3 text-[11px] focus:border-gold focus:outline-none"
                  >
                    <option value="RESIDENTIAL_ESTATE">Private Residential Estate Compound</option>
                    <option value="COMMERCIAL_HEADQUARTERS">Corporate / Institutional Workspace Headquarters</option>
                    <option value="HOSPITALITY_BOUTIQUE">Bespoke Resort / Boutique Lounges</option>
                  </select>
                </div>

                <div className="space-y-2 pt-2">
                  <label className="text-ivory uppercase tracking-wide block">02. Scope of Spatial Intervention</label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { id: 'FULL_ARCHITECTURAL_BUILD', label: 'Ground-Up Core Architecture & Curation' },
                      { id: 'INTERIOR_RESTORATION', label: 'Interior Shell Architectural Remodeling & Furnishing' },
                      { id: 'CURATION_STYLING', label: 'Bespoke Curation & Obj d’Art Placement Only' }
                    ].map(opt => (
                      <div 
                        key={opt.id}
                        onClick={() => setIntakeForm({...intakeForm, scopeMetrics: opt.id})}
                        className={`p-3 border cursor-pointer text-[10px] transition-all ${intakeForm.scopeMetrics === opt.id ? 'border-gold bg-gold/5 text-ivory' : 'border-taupe/20 text-taupe hover:border-taupe/50'}`}
                      >
                        {opt.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: METRICS, SCALE AND INVESTMENT INDEX */}
            {wizardStep === 2 && (
              <div className="space-y-4 font-mono text-[10px]">
                <div className="space-y-2">
                  <label className="text-ivory uppercase tracking-wide block">03. Volumetric Plan Footprint Scale</label>
                  <select 
                    value={intakeForm.estimatedScale}
                    onChange={(e) => setIntakeForm({...intakeForm, estimatedScale: e.target.value})}
                    className="w-full bg-obsidian border border-taupe/20 text-ivory p-3 text-[11px] focus:border-gold focus:outline-none"
                  >
                    <option value="UNDER_500_SQM">Under 500 SQM Footprint Area</option>
                    <option value="500_TO_1500_SQM">500 SQM &mdash; 1,500 SQM Footprint Area</option>
                    <option value="OVER_1500_SQM">Over 1,500 SQM Monolithic Footprint Area</option>
                  </select>
                </div>

                <div className="space-y-2 pt-2">
                  <label className="text-ivory uppercase tracking-wide block">04. Projected Procurement Capital Allocation Threshold</label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { id: 'PREMIUM_CORE', label: 'UGX 150,000,000 — UGX 500,000,000 Baseline' },
                      { id: 'ELITE_HIGH_END', label: 'UGX 500,000,000 — UGX 1,500,000,000 Advanced' },
                      { id: 'MONOLITH_SOVEREIGN', label: 'Sovereign Asset Threshold [UGX 1.5B+ Uncapped]' }
                    ].map(opt => (
                      <div 
                        key={opt.id}
                        onClick={() => setIntakeForm({...intakeForm, investmentTier: opt.id})}
                        className={`p-3 border cursor-pointer text-[10px] transition-all ${intakeForm.investmentTier === opt.id ? 'border-gold bg-gold/5 text-ivory' : 'border-taupe/20 text-taupe hover:border-taupe/50'}`}
                      >
                        {opt.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: SITE CONDITION VERIFICATION & HANDSHAKE RESOLUTION */}
            {wizardStep === 3 && (
              <div className="space-y-4 font-mono text-[10px]">
                <div className="space-y-2">
                  <label className="text-ivory uppercase tracking-wide block">05. Physical Site Asset Status</label>
                  <select 
                    value={intakeForm.siteStatus}
                    onChange={(e) => setIntakeForm({...intakeForm, siteStatus: e.target.value})}
                    className="w-full bg-obsidian border border-taupe/20 text-ivory p-3 text-[11px] focus:border-gold focus:outline-none"
                  >
                    <option value="LAND_ACQUIRED_VERIFIED">Site Acquired & Title Deeds Verified</option>
                    <option value="ACQUISITION_IN_NEGOTIATION">Site Target Identified / In Active Acquisition Negotiation</option>
                    <option value="REQUIRES_STUDIO_SELECTION">Sourcing Land Sourcing Strategy Assistance Required</option>
                  </select>
                </div>

                <div className="space-y-2 pt-2">
                  <label className="text-ivory uppercase tracking-wide block">06. Target Engineering Mobilization Date</label>
                  <input 
                    type="date"
                    value={intakeForm.targetDate}
                    onChange={(e) => setIntakeForm({...intakeForm, targetDate: e.target.value})}
                    className="w-full bg-obsidian border border-taupe/20 text-ivory p-3 text-[11px] focus:border-gold focus:outline-none focus:text-gold"
                  />
                </div>

                <div className="p-3 bg-gold/5 border border-gold/20 rounded text-[9px] font-sans leading-relaxed text-taupe">
                  By executing this configuration pipeline, these structural parameters are hashed directly into a telemetry log, matching your profile token with an appointed senior layout design architect.
                </div>
              </div>
            )}

            {/* Step Navigation Controls Row */}
            <div className="pt-4 flex justify-between items-center font-mono text-[9px] tracking-editorial uppercase">
              <button
                disabled={wizardStep === 1}
                onClick={() => setWizardStep(prev => prev - 1)}
                className="px-4 py-2 border border-taupe/20 text-taupe hover:border-ivory hover:text-ivory disabled:opacity-20 transition-all"
              >
                &larr; Recede
              </button>

              {wizardStep < 3 ? (
                <button
                  onClick={() => setWizardStep(prev => prev + 1)}
                  className="px-4 py-2 bg-gold text-obsidian font-bold hover:bg-gold-hover transition-all"
                >
                  Advance Matrix &rarr;
                </button>
              ) : (
                <button
                  onClick={() => {
                    alert('Intake configuration parameters successfully synchronized with studio telemetry streams.');
                    setViewMode('JOURNAL_INDEX');
                  }}
                  disabled={!intakeForm.targetDate}
                  className="px-6 py-2.5 bg-gold text-obsidian font-bold hover:bg-gold-hover disabled:bg-taupe/20 disabled:text-taupe transition-all"
                >
                  Finalize Studio Alignment
                </button>
              )}
            </div>

          </div>
        )}

      </main>
    </div>
  );
};
