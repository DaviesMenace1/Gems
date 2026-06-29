import React, { useState } from 'react';
import { ProductCollectionItem, ProjectCaseStudy } from '../../types/platform';

export type PublicRoute =
  | 'HOME' | 'ABOUT_MANIFESTO' | 'SERVICES_INDEX' | 'INTERIOR_DESIGN' | 'ARCHITECTURE'
  | 'RENOVATION' | 'COMMERCIAL_DESIGN' | 'HOSPITALITY_DESIGN' | 'PROJECT_MANAGEMENT'
  | 'GLOBAL_SOURCING' | 'PROCUREMENT' | 'WHITE_GLOVE_INSTALLATION' | 'STYLING'
  | 'PORTFOLIO_INDEX' | 'PROJECT_DETAIL';

interface FrontOfHouseClusterProps {
  initialRoute?: PublicRoute;
  selectedProjectSlug?: string;
}

export const FrontOfHouseCluster: React.FC<FrontOfHouseClusterProps> = ({ 
  initialRoute = 'HOME', 
  selectedProjectSlug 
}) => {
  const [currentRoute, setCurrentRoute] = useState<PublicRoute>(initialRoute);
  const [portfolioFilter, setPortfolioFilter] = useState<string>('ALL');
  const [activeHeroSlide, setActiveHeroSlide] = useState<number>(0);

  // High-fidelity content registries mapping exact editorial layout frameworks
  const serviceDirectory = [
    { id: 'INTERIOR_DESIGN', route: 'INTERIOR_DESIGN' as PublicRoute, title: '04. Interior Design', subtitle: 'Bespoke Private Sanctuaries', desc: 'Complete conceptualization and meticulous furnishing of high-end residential spaces.' },
    { id: 'ARCHITECTURE', route: 'ARCHITECTURE' as PublicRoute, title: '05. Architecture', subtitle: 'Structural Masterpieces', desc: 'Monolithic, sustainable building layouts designed for permanence and spatial poetry.' },
    { id: 'RENOVATION', route: 'RENOVATION' as PublicRoute, title: '06. Renovation & Remodeling', subtitle: 'Structural Revitalization', desc: 'Preserving heritage while instilling cutting-edge modern utility into historic frames.' },
    { id: 'COMMERCIAL_DESIGN', route: 'COMMERCIAL_DESIGN' as PublicRoute, title: '07. Commercial Design', subtitle: 'Corporate Identity Assets', desc: 'High-performance workspace architecture optimized for executive operations.' },
    { id: 'HOSPITALITY_DESIGN', route: 'HOSPITALITY_DESIGN' as PublicRoute, title: '08. Hospitality Design', subtitle: 'Immersive Editorial Venues', desc: 'Bespoke resort, lounge, and high-end dining sanctuaries optimized for guest experience.' },
    { id: 'PROJECT_MANAGEMENT', route: 'PROJECT_MANAGEMENT' as PublicRoute, title: '09. Project Management', subtitle: 'Frictionless Execution Control', desc: 'Rigid timeline governance, contractor auditing, and strict quality control matrices.' },
    { id: 'GLOBAL_SOURCING', route: 'GLOBAL_SOURCING' as PublicRoute, title: '10. Global Sourcing Spec', subtitle: 'Exclusive Material Networks', desc: 'Direct-to-quarry and designer-atelier networks mapping rare finishes globally.' },
    { id: 'PROCUREMENT', route: 'PROCUREMENT' as PublicRoute, title: '11. Procurement Services', subtitle: 'Fiscal Supply Governance', desc: 'Logistics budget enforcement, custom order tracking, and strategic material acquisition.' },
    { id: 'WHITE_GLOVE_INSTALLATION', route: 'WHITE_GLOVE_INSTALLATION' as PublicRoute, title: '12. White Glove Installation', subtitle: 'Flawless Site Execution', desc: 'Uncompromised white-glove uncrating, final art placement, and meticulous assembly.' },
    { id: 'STYLING', route: 'STYLING' as PublicRoute, title: '13. Styling & Creative Direction', subtitle: 'The Final Aesthetic Layer', desc: 'Curation of objets d’art, sensory items, and fine textiles to complete the space.' }
  ];

  const portfolioRegistry: ProjectCaseStudy[] = [
    { id: 'proj-1', title: 'The Nakasero Monolith Villa', slug: 'nakasero-monolith', description: 'A raw concrete and premium walnut structural sanctuary overlooking the capital.', location: 'Nakasero Ridge', clientRole: 'PRIVATE_CLIENT', category: 'RESIDENTIAL', images: ['/assets/p1.jpg'], tags: ['Walnut', 'Travertine', 'Minimalist'] },
    { id: 'proj-2', title: 'The Kololo Executive Atelier', slug: 'kololo-atelier', description: 'High-performance workspace matrix engineered for an institutional asset fund.', location: 'Kololo Hill', clientRole: 'COMMERCIAL', category: 'COMMERCIAL', images: ['/assets/p2.jpg'], tags: ['Obsidian Steel', 'Acoustic Felt'] },
    { id: 'proj-3', title: 'Nile Canopy Safari Oasis', slug: 'nile-canopy', description: 'A ultra-luxury structural pavilion network layout tracing the river bend.', location: 'Jinja Delta', clientRole: 'HOSPITALITY', category: 'HOSPITALITY', images: ['/assets/p3.jpg'], tags: ['Local Teak', 'Raw Brass'] }
  ];

  const [activeProject, setActiveProject] = useState<ProjectCaseStudy>(
    portfolioRegistry.find(p => p.slug === selectedProjectSlug) || portfolioRegistry[0]
  );

  return (
    <div className="min-h-screen bg-obsidian text-ivory font-montserrat flex flex-col">
      
      {/* PERSISTENT Front-of-House Contextual Sub-Bar */}
      <div className="bg-obsidian border-b border-taupe/10 py-3 px-6 text-[9px] uppercase tracking-monumental flex flex-wrap justify-between items-center gap-2 mt-16 z-20">
        <div className="flex space-x-4">
          <button onClick={() => setCurrentRoute('HOME')} className={`hover:text-gold transition-colors ${currentRoute === 'HOME' ? 'text-gold font-bold' : 'text-taupe'}`}>01. Home</button>
          <button onClick={() => setCurrentRoute('ABOUT_MANIFESTO')} className={`hover:text-gold transition-colors ${currentRoute === 'ABOUT_MANIFESTO' ? 'text-gold font-bold' : 'text-taupe'}`}>02. About Brand</button>
          <button onClick={() => setCurrentRoute('SERVICES_INDEX')} className={`hover:text-gold transition-colors ${currentRoute.startsWith('SER') || serviceDirectory.some(s => s.route === currentRoute) ? 'text-gold font-bold' : 'text-taupe'}`}>03. Services Matrix</button>
          <button onClick={() => setCurrentRoute('PORTFOLIO_INDEX')} className={`hover:text-gold transition-colors ${currentRoute.startsWith('PROJ') || currentRoute === 'PORTFOLIO_INDEX' ? 'text-gold font-bold' : 'text-taupe'}`}>14. Architecture Portfolio</button>
        </div>
        <span className="text-gold hidden sm:inline">REVAMP UG // DIGITAL FLAGSHIP SYSTEM</span>
      </div>

      {/* VIEWPORT CONTROLLER VIEW RENDERING ENGINE */}
      <main className="flex-1">
        
        {/* Page 1: HOME LAYOUT HERO CANVAS */}
        {currentRoute === 'HOME' && (
          <div className="animate-fade-in">
            {/* Immersive Editorial Hero Canvas */}
            <div className="relative h-[85vh] bg-taupe/5 flex items-center justify-center border-b border-taupe/20 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent z-10" />
              <div className="text-center space-y-4 max-w-3xl px-6 relative z-10">
                <span className="text-[10px] uppercase tracking-monumental text-gold block font-semibold animate-pulse">Now Formulating Architecture</span>
                <h1 className="font-cinzel text-3xl sm:text-5xl tracking-monumental text-ivory uppercase leading-tight">The Architecture of Refined Living</h1>
                <p className="font-playfair text-xs sm:text-sm italic text-taupe max-w-xl mx-auto leading-relaxed">Crafting spatial permanence through raw monolithic materials, strict proportions, and elite customization assets.</p>
                <div className="pt-4">
                  <button onClick={() => setCurrentRoute('PORTFOLIO_INDEX')} className="bg-gold text-obsidian text-[10px] font-bold tracking-editorial uppercase px-6 py-3 hover:bg-gold-hover transition-all">Explore Case Studies</button>
                </div>
              </div>
            </div>

            {/* Selected Architectural Manifestos Preview Block */}
            <div className="max-w-6xl mx-auto py-20 px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="space-y-4">
                <span className="text-[9px] uppercase tracking-monumental text-gold block">The Studio Manifesto</span>
                <h2 className="font-cinzel text-xl text-ivory uppercase tracking-editorial">Uncompromised Materiality & Structural Governance</h2>
                <p className="text-xs text-taupe leading-relaxed">We refuse the transient nature of modern trends. Our Kampala design studio synthesizes volcanic stone, native architectural hardwoods, and custom metal casting structures into tailored spatial legacies for multi-generational longevity.</p>
              </div>
              <div className="aspect-[4/3] bg-taupe/5 border border-taupe/20 p-8 flex flex-col justify-between">
                <span className="font-mono text-[10px] text-gold font-bold">// IMMUTABLE CORE STANDARD</span>
                <p className="font-playfair text-sm italic text-ivory">"Space is an asset of profound psychological configuration. We do not simply decorate surfaces; we define the structural metrics of physical atmosphere."</p>
                <span className="text-[9px] uppercase tracking-widest text-taupe">REVAMP UG Architectural Direction</span>
              </div>
            </div>
          </div>
        )}

        {/* Page 2: ABOUT BRAND & SOURCING MANIFESTO */}
        {currentRoute === 'ABOUT_MANIFESTO' && (
          <div className="max-w-4xl mx-auto py-16 px-6 space-y-12 animate-fade-in">
            <div className="space-y-2 border-b border-taupe/10 pb-6">
              <span className="text-[10px] text-gold uppercase tracking-monumental block">Institutional Advantage</span>
              <h1 className="font-cinzel text-2xl uppercase tracking-editorial text-ivory">Architectural Integrity & Global Supply Mastery</h1>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 font-mono text-[11px] text-taupe">
              <div className="border border-taupe/20 p-4 bg-taupe/5">
                <p className="text-gold font-bold mb-1">01 / DIRECT PROVENANCE</p>
                Every block of travertine and slice of carbonized oak is monitored directly from extraction parameters to final setting.
              </div>
              <div className="border border-taupe/20 p-4 bg-taupe/5">
                <p className="text-gold font-bold mb-1">02 / SECURE LEDGERING</p>
                Architectural client change-orders are handled with absolute transparency via our built-in Row-Level secure frameworks.
              </div>
              <div className="border border-taupe/20 p-4 bg-taupe/5">
                <p className="text-gold font-bold mb-1">03 / GUILD ALLIANCES</p>
                We unite international logistics with certified local contractors to implement absolute precision at the construction site.
              </div>
            </div>

            <div className="space-y-4 text-xs text-taupe leading-relaxed">
              <p>Founded to serve the unyielding demands of high-net-worth curators, corporate entities, and private estates across East Africa, our studio bridges the historic rift between world-class furniture fabrication and on-site engineering execution.</p>
              <p>Through completely verticalized procurement paths, we isolate our clients from manufacturing supply line irregularities, delivering a completely managed design pipeline with absolute cost accountability and uncompromising execution excellence.</p>
            </div>
          </div>
        )}

        {/* Page 3: SERVICES MASTER GRID PORTAL */}
        {currentRoute === 'SERVICES_INDEX' && (
          <div className="max-w-6xl mx-auto py-16 px-6 animate-fade-in">
            <div className="mb-12">
              <span className="text-[10px] text-gold uppercase tracking-monumental block">The Capability Matrix</span>
              <h1 className="font-cinzel text-2xl uppercase tracking-editorial text-ivory mt-1">End-to-End Design & Execution Services</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {serviceDirectory.map(service => (
                <div 
                  key={service.id} 
                  onClick={() => setCurrentRoute(service.route)}
                  className="border border-taupe/20 bg-taupe/5 p-6 hover:border-gold transition-all duration-300 cursor-pointer flex flex-col justify-between group h-44"
                >
                  <div>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-cinzel text-xs uppercase tracking-wide text-ivory group-hover:text-gold transition-colors">{service.title}</h3>
                      <span className="text-[9px] font-mono text-taupe group-hover:text-ivory">SPEC ROW_</span>
                    </div>
                    <p className="text-[10px] text-gold uppercase tracking-widest font-mono mt-1">{service.subtitle}</p>
                    <p className="text-xs text-taupe mt-3 leading-relaxed line-clamp-2">{service.desc}</p>
                  </div>
                  <span className="text-[9px] uppercase tracking-editorial text-gold font-bold group-hover:underline block text-right mt-2">Initialize Service View &rarr;</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pages 4-13: DYNAMIC INDIVIDUAL SERVICE CAPABILITY CANVAS */}
        {serviceDirectory.some(s => s.route === currentRoute) && (
          <div className="max-w-3xl mx-auto py-16 px-6 space-y-8 animate-fade-in">
            {(() => {
              const currentService = serviceDirectory.find(s => s.route === currentRoute);
              if (!currentService) return null;
              return (
                <>
                  <div className="space-y-1 border-b border-taupe/10 pb-4">
                    <button onClick={() => setCurrentRoute('SERVICES_INDEX')} className="text-[9px] font-mono text-gold uppercase hover:underline">&larr; Return to Service Grid</button>
                    <h1 className="font-cinzel text-xl uppercase tracking-editorial text-ivory pt-2">{currentService.title} Specification</h1>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-gold">{currentService.subtitle}</p>
                  </div>

                  <div className="p-6 bg-taupe/5 border border-taupe/20 rounded font-playfair text-sm italic text-ivory leading-relaxed">
                    "{currentService.desc} Handled by an appointed senior studio lead officer from inception metrics to ultimate white-glove field completion keys."
                  </div>

                  <div className="space-y-4 text-xs text-taupe leading-relaxed">
                    <h3 className="font-cinzel text-xs text-ivory uppercase tracking-wide font-semibold">Standard Execution Framework</h3>
                    <p>Every operational branch of this discipline interfaces directly with our central procurement pipeline and database layer. This ensures that custom spatial dimensions dictate raw manufacturing configurations instantly, generating direct cost modifiers before fabrication contracts are issued.</p>
                    
                    <ul className="list-disc pl-4 space-y-2 font-mono text-[11px] text-gold/80">
                      <li>Strict integration with AWS S3 protected schematic engineering vaults.</li>
                      <li>Rigid milestone oversight logs protected via secure Postgres RLS layers.</li>
                      <li>Direct material supply tracking utilizing regional port handling protocols.</li>
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-taupe/10">
                    <button onClick={() => setCurrentRoute('SERVICES_INDEX')} className="w-full border border-taupe/30 hover:border-gold hover:text-gold text-[10px] uppercase font-bold tracking-editorial py-3 transition-colors">
                      Review Alternate Architecture Service Nodes
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {/* Page 14: PORTFOLIO FILTERABLE ARCHIVE PORTAL */}
        {currentRoute === 'PORTFOLIO_INDEX' && (
          <div className="max-w-6xl mx-auto py-16 px-6 space-y-10 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 border-b border-taupe/10 pb-6">
              <div>
                <span className="text-[10px] text-gold uppercase tracking-monumental block">The Monolith Registry</span>
                <h1 className="font-cinzel text-2xl uppercase tracking-editorial text-ivory mt-1">Built Work & Portfolio Case Studies</h1>
              </div>
              
              {/* Category Segment Filter Swaps */}
              <div className="flex bg-taupe/5 border border-taupe/20 p-1 text-[9px] font-bold uppercase tracking-editorial">
                {['ALL', 'RESIDENTIAL', 'COMMERCIAL', 'HOSPITALITY'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setPortfolioFilter(cat)}
                    className={`px-3 py-1.5 transition-all ${portfolioFilter === cat ? 'bg-gold text-obsidian font-bold' : 'text-taupe hover:text-ivory'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Portfolio Grid Layout Maps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {portfolioRegistry
                .filter(p => portfolioFilter === 'ALL' || p.category === portfolioFilter)
                .map(project => (
                  <div 
                    key={project.id}
                    onClick={() => {
                      setActiveProject(project);
                      setCurrentRoute('PROJECT_DETAIL');
                    }}
                    className="border border-taupe/20 bg-taupe/5 overflow-hidden group cursor-pointer hover:border-gold transition-all duration-300"
                  >
                    <div className="aspect-[16/10] bg-taupe/10 border-b border-taupe/20 relative flex items-center justify-center text-taupe font-mono text-[10px]">
                      [ High-Fidelity Asset Visual Mapping Node ]
                    </div>
                    <div className="p-5 space-y-2">
                      <div className="flex justify-between items-baseline">
                        <span className="text-[9px] font-mono text-gold uppercase">{project.location}</span>
                        <span className="text-[8px] bg-taupe/10 px-1.5 py-0.5 text-taupe uppercase tracking-widest">{project.category}</span>
                      </div>
                      <h3 className="font-cinzel text-xs text-ivory uppercase font-semibold group-hover:text-gold transition-colors">{project.title}</h3>
                      <p className="text-xs text-taupe line-clamp-2 leading-relaxed font-playfair italic">{project.description}</p>
                      <div className="pt-2 flex flex-wrap gap-1">
                        {project.tags.map((t, idx) => (
                          <span key={idx} className="text-[8px] border border-taupe/10 text-taupe/70 px-1.5 py-0.5 font-mono">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Page 15: DYNAMIC SPECIFIC PROJECT CASE STUDY DETAIL VIEW */}
        {currentRoute === 'PROJECT_DETAIL' && activeProject && (
          <div className="max-w-4xl mx-auto py-16 px-6 space-y-8 animate-fade-in">
            <div className="space-y-1 border-b border-taupe/10 pb-4">
              <button onClick={() => setCurrentRoute('PORTFOLIO_INDEX')} className="text-[9px] font-mono text-gold uppercase hover:underline">&larr; Return to Portfolio Registry</button>
              <h1 className="font-cinzel text-2xl uppercase tracking-editorial text-ivory pt-2">{activeProject.title}</h1>
              <div className="flex space-x-4 text-[9px] uppercase tracking-widest font-mono text-taupe">
                <
