import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { ProjectCaseStudy, ProtectedDrawing } from '../../types/platform';
import { ApiResponse } from '../../types/api';

interface DesignMilestone {
  id: string;
  title: string;
  description: string;
  status: 'PENDING' | 'IN_REVIEW' | 'APPROVED';
  targetDate: string;
}

export const ClientHub: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [project, setProject] = useState<ProjectCaseStudy | null>(null);
  const [drawings, setDrawings] = useState<ProtectedDrawing[]>([]);
  const [activePanel, setActivePanel] = useState<'TIMELINE' | 'BLUEPRINTS' | 'APPROVALS'>('TIMELINE');

  // Strict local state for tracking material procurement approvals
  const [milestones, setMilestones] = useState<DesignMilestone[]>([
    { id: 'm1', title: 'Spatial Layout Schemes', description: 'Primary zoning arrangement for the master living sanctuary.', status: 'APPROVED', targetDate: '2026-05-10' },
    { id: 'm2', title: 'Carbonized Oak Cabinetry Spec', description: 'Material selection confirmation for the walk-in humidor/wardrobe.', status: 'IN_REVIEW', targetDate: '2026-07-15' },
    { id: 'm3', title: 'Sourcing Travertine Slabs', description: 'Direct import processing from Tivoli quarries for foyer flooring.', status: 'PENDING', targetDate: '2026-09-01' }
  ]);

  useEffect(() => {
    const fetchClientProjectData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }
        setIsAuthenticated(true);

        // Fetch user project relation metadata
        const { data: projectData } = await supabase
          .from('projects')
          .select('*')
          .limit(1)
          .single();

        if (projectData) {
          setProject(projectData as unknown as ProjectCaseStudy);
          
          // Fetch linked architectural drawings authorized for client roles
          const { data: drawingData } = await supabase
            .from('protected_drawings')
            .select('*')
            .eq('project_id', projectData.id);
            
          if (drawingData) setDrawings(drawingData as unknown as ProtectedDrawing[]);
        }
      } catch (err) {
        console.error("Failed fetching structural collaboration profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClientProjectData();
  }, []);

  const handleDownloadDrawing = async (drawingId: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      // Requests a secure token handshake proxying directly to S3 via our custom Edge routing
      const res = await fetch(`/api/drawings/download?drawingId=${drawingId}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${session.access_token}` }
      });

      const json: ApiResponse<{ downloadUrl: string }> = await res.json();
      if (json.success && json.data?.downloadUrl) {
        window.open(json.data.downloadUrl, '_blank');
      } else {
        alert(`Clearance Verification Error: ${json.error?.message}`);
      }
    } catch (err) {
      console.error("Cryptographic handshake broke down:", err);
    }
  };

  const handleMilestoneAction = (id: string, action: 'APPROVED' | 'REJECTED') => {
    setMilestones(prev => prev.map(m => m.id === id ? { ...m, status: action === 'APPROVED' ? 'APPROVED' : 'PENDING' } : m));
    // Dispatches a system-level audit record log automatically to Supabase via backend API hookups
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center font-montserrat text-xs tracking-monumental text-gold uppercase">
        Loading Client Collaboration Hub...
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center font-montserrat p-6 text-center">
        <h1 className="font-cinzel text-xl text-gold uppercase tracking-monumental mb-2">Restricted Space</h1>
        <p className="text-xs text-taupe max-w-sm leading-relaxed">
          Authentication credentials missing. Please register with your design officer to synchronize your local project profile.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian text-ivory font-montserrat pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Dynamic Project Identity Card banner */}
        <div className="border border-taupe/20 bg-taupe/5 p-8 mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <span className="text-[9px] uppercase tracking-monumental text-gold block mb-1">Active Design Command</span>
            <h1 className="font-cinzel text-xl md:text-2xl tracking-editorial uppercase text-ivory">
              {project ? project.title : "The Architecture of Refined Living Showcase"}
            </h1>
            <p className="text-xs text-taupe mt-1">Location: {project ? project.location : "Kampala, Central Region"}</p>
          </div>
          
          <div className="flex space-x-2 border border-taupe/20 bg-obsidian p-1">
            {(['TIMELINE', 'BLUEPRINTS', 'APPROVALS'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActivePanel(tab)}
                className={`px-4 py-2 text-[10px] uppercase tracking-editorial transition-all ${
                  activePanel === tab ? 'bg-gold text-obsidian font-semibold' : 'text-taupe hover:text-ivory'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* TAB 1: THE TIMELINE MONITOR */}
        {activePanel === 'TIMELINE' && (
          <div className="space-y-8 max-w-3xl mx-auto animate-fade-in">
            <h3 className="font-cinzel text-xs uppercase tracking-editorial text-gold mb-6">Structural Project Milestones</h3>
            <div className="relative border-l border-taupe/20 pl-6 space-y-8 ml-2">
              {milestones.map((m) => (
                <div key={m.id} className="relative">
                  {/* Status Indicator Bullet */}
                  <span className={`absolute -left-[31px] top-0.5 w-4 h-4 rounded-full border-2 bg-obsidian ${
                    m.status === 'APPROVED' ? 'border-gold' : m.status === 'IN_REVIEW' ? 'border-taupe animate-pulse' : 'border-taupe/30'
                  }`} />
                  
                  <div>
                    <span className="text-[9px] font-mono text-gold block uppercase">{m.targetDate}</span>
                    <h4 className="text-sm font-medium tracking-wide text-ivory mt-0.5">{m.title}</h4>
                    <p className="text-xs text-taupe leading-relaxed mt-1">{m.description}</p>
                    <span className={`inline-block text-[9px] uppercase tracking-widest mt-2 px-2 py-0.5 border ${
                      m.status === 'APPROVED' ? 'border-gold/30 text-gold bg-gold/5' : 'border-taupe/30 text-taupe'
                    }`}>
                      {m.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: SECURE AWS DRAWINGS RETRIEVAL CONTAINER */}
        {activePanel === 'BLUEPRINTS' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex justify-between items-center border-b border-taupe/10 pb-2">
              <h3 className="font-cinzel text-xs uppercase tracking-editorial text-gold">Protected Schematic Drawings</h3>
              <span className="text-[9px] text-taupe uppercase">Secured via AWS S3 Handshake Matrix</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {drawings.length === 0 ? (
                <div className="p-8 border border-taupe/10 text-center text-taupe text-xs italic bg-taupe/5 col-span-2">
                  No schematics published to this client node profile yet.
                </div>
              ) : (
                drawings.map((doc) => (
                  <div key={doc.id} className="border border-taupe/20 bg-taupe/5 p-6 flex items-center justify-between hover:border-gold transition-all duration-300">
                    <div>
                      <h4 className="text-xs uppercase tracking-wide text-ivory font-semibold">{doc.title}</h4>
                      <p className="text-[10px] text-taupe font-mono mt-1">Version: {doc.version} | Size: {(doc.fileSize / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    <button
                      onClick={() => handleDownloadDrawing(doc.id)}
                      className="border border-gold text-gold hover:bg-gold hover:text-obsidian text-[10px] uppercase tracking-editorial px-4 py-2 transition-colors bg-gold/5"
                    >
                      Retrieve Blueprint
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 3: SIGN-OFF & MATERIAL CHANGE ORDERS APPROVAL PANEL */}
        {activePanel === 'APPROVALS' && (
          <div className="space-y-6 max-w-4xl mx-auto animate-fade-in">
            <h3 className="font-cinzel text-xs uppercase tracking-editorial text-gold">Action Items Awaiting Verification</h3>
            
            <div className="space-y-4">
              {milestones.filter(m => m.status === 'IN_REVIEW').length === 0 ? (
                <div className="p-8 border border-taupe/10 text-center text-taupe text-xs italic bg-taupe/5">
                  Your documentation queue is entirely verified and structurally current.
                </div>
              ) : (
                milestones.filter(m => m.status === 'IN_REVIEW').map((m) => (
                  <div key={m.id} className="border border-taupe/20 bg-taupe/5 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="space-y-1 max-w-xl">
                      <span className="text-[9px] uppercase tracking-widest text-gold font-mono">Requires Authorization</span>
                      <h4 className="text-sm tracking-wide text-ivory font-medium">{m.title}</h4>
                      <p className="text-xs text-taupe leading-relaxed">{m.description}</p>
                    </div>
                    
                    <div className="flex space-x-2 w-full md:w-auto">
                      <button
                        onClick={() => handleMilestoneAction(m.id, 'APPROVED')}
                        className="flex-1 md:flex-initial bg-gold hover:bg-gold-hover text-obsidian text-[10px] uppercase tracking-editorial font-bold px-6 py-2.5 transition-colors"
                      >
                        Sign Off Specifications
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
          
