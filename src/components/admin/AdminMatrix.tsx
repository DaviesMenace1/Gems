import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { UserProfile, AuditLog, ProductCollectionItem } from '../../types/platform';
import { ApiResponse } from '../../types/api';

export const AdminMatrix: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'TELEMETRY' | 'INVENTORY' | 'AUDIT_LOGS'>('TELEMETRY');
  
  // State Storage for Admin Data Nodes
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [products, setProducts] = useState<ProductCollectionItem[]>([]);
  const [systemMetrics, setSystemMetrics] = useState({
    totalUsers: 0,
    tradeApplicationsPending: 0,
    dailyTransactionsUGX: 0
  });

  useEffect(() => {
    const verifyAdminClearance = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setIsAdmin(false);
          setLoading(false);
          return;
        }

        // Pull security profile metadata directly via RLS Layer
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        if (profile && profile.role === 'ADMIN') {
          setIsAdmin(true);
          // Concurrent pre-fetch of system data nodes
          await Promise.all([fetchAuditLogs(), fetchInventoryMatrix(), fetchSystemMetrics()]);
        }
      } catch (err) {
        console.error("Security handshake execution failure:", err);
      } finally {
        setLoading(false);
      }
    };

    verifyAdminClearance();
  }, []);

  const fetchAuditLogs = async () => {
    // Explicitly targets the secure log schema restricted by RLS policies
    const { data } = await supabase
      .from('audit_logs')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(50);
    if (data) setAuditLogs(data as unknown as AuditLog[]);
  };

  const fetchInventoryMatrix = async () => {
    const { data } = await supabase.from('projects').select('*');
    // For this boilerplate compilation, we map structural products array
    if (data) setProducts(data as unknown as ProductCollectionItem[]);
  };

  const fetchSystemMetrics = async () => {
    // Aggregated telemetry mockup data matching the live database structural states
    setSystemMetrics({
      totalUsers: 1420,
      tradeApplicationsPending: 8,
      dailyTransactionsUGX: 45000000
    });
  };

  const handleUpdateStock = async (productId: string, variantId: string, newStock: number) => {
    // In-memory update optimized for instantaneous UI re-render
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        return {
          ...p,
          variants: p.variants.map(v => v.id === variantId ? { ...v, stockCount: newStock } : v)
        };
      }
      return p;
    }));

    // Dispatches the permanent database update and registers a system-wide audit trail item
    await fetch('/api/admin/inventory/update-stock', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, variantId, stockCount: newStock })
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center font-montserrat text-xs tracking-monumental text-gold uppercase">
        Initializing Secure Telemetry Handshake...
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center font-montserrat p-6 text-center">
        <h1 className="font-cinzel text-xl text-gold uppercase tracking-monumental mb-2">Access Revoked</h1>
        <p className="text-xs text-taupe max-w-sm leading-relaxed">
          Your credentials do not carry the structural authorization parameters required to bind with the Admin Matrix interface.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian text-ivory font-montserrat pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Dashboard Title & Segment Switches */}
        <div className="border-b border-taupe/20 pb-6 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="font-cinzel text-xl md:text-2xl tracking-monumental uppercase text-ivory">Admin Control Matrix</h1>
            <p className="text-[10px] text-gold uppercase tracking-editorial mt-1">Platform Orchestration & Governance Engine</p>
          </div>
          
          <div className="flex bg-taupe/5 border border-taupe/20 p-1">
            {(['TELEMETRY', 'INVENTORY', 'AUDIT_LOGS'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-[10px] uppercase tracking-editorial transition-all ${
                  activeTab === tab ? 'bg-gold text-obsidian font-semibold' : 'text-taupe hover:text-ivory'
                }`}
              >
                {tab.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* TAB 1: REAL-TIME SYSTEM TELEMETRY */}
        {activeTab === 'TELEMETRY' && (
          <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-taupe/20 p-6 bg-taupe/5">
                <span className="text-[10px] uppercase tracking-editorial text-taupe block mb-1">Authenticated Profiles Matrix</span>
                <span className="font-cinzel text-3xl text-ivory">{systemMetrics.totalUsers}</span>
                <span className="block text-[9px] text-gold mt-2">Active Framework Nodes</span>
              </div>
              <div className="border border-taupe/20 p-6 bg-taupe/5">
                <span className="text-[10px] uppercase tracking-editorial text-taupe block mb-1">Trade Applications Queue</span>
                <span className="font-cinzel text-3xl text-gold">{systemMetrics.tradeApplicationsPending}</span>
                <span className="block text-[9px] text-taupe mt-2">Awaiting Verification Handshake</span>
              </div>
              <div className="border border-taupe/20 p-6 bg-taupe/5">
                <span className="text-[10px] uppercase tracking-editorial text-taupe block mb-1">Daily Financial Velocity</span>
                <span className="font-cinzel text-3xl text-ivory">UGX {systemMetrics.dailyTransactionsUGX.toLocaleString()}</span>
                <span className="block text-[9px] text-taupe mt-2">Routed via Flutterwave Nodes</span>
              </div>
            </div>

            {/* Quick Action System Hooks */}
            <div className="border border-taupe/20 p-6">
              <h3 className="font-cinzel text-xs uppercase tracking-editorial text-gold mb-4">Core Platform Switches</h3>
              <div className="flex flex-wrap gap-4">
                <button className="border border-gold/40 hover:border-gold px-4 py-2.5 text-[10px] uppercase tracking-editorial text-gold transition-colors bg-gold/5">
                  Force Clear CDN Asset Cache (Cloudinary)
                </button>
                <button className="border border-taupe/30 hover:border-ivory px-4 py-2.5 text-[10px] uppercase tracking-editorial text-taupe transition-colors">
                  Export Complete User Ledger (.csv)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INVENTORY ALLOCATIONS & PARAMETERS */}
        {activeTab === 'INVENTORY' && (
          <div className="border border-taupe/20 overflow-x-auto bg-taupe/5 animate-fade-in">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-taupe/20 bg-obsidian text-[10px] uppercase tracking-editorial text-taupe">
                  <th className="p-4">Structural Product Collection Item</th>
                  <th className="p-4">SKU / Variant Blueprint</th>
                  <th className="p-4">Computed Valuation</th>
                  <th className="p-4 text-right">Available Allocation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-taupe/10 text-xs text-ivory">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-taupe italic">No structural capsule entries fetched from database allocations.</td>
                  </tr>
                ) : (
                  products.map((product) => (
                    product.variants?.map((variant) => (
                      <tr key={variant.id} className="hover:bg-taupe/5 transition-colors">
                        <td className="p-4 font-medium">{product.title}</td>
                        <td className="p-4 font-mono text-taupe text-[11px]">{variant.sku}</td>
                        <td className="p-4 text-gold font-mono">{product.currency} {variant.price.toLocaleString()}</td>
                        <td className="p-4 text-right">
                          <input 
                            type="number" 
                            defaultValue={variant.stockCount}
                            onBlur={(e) => handleUpdateStock(product.id, variant.id, Number(e.target.value))}
                            className="w-16 bg-obsidian border border-taupe/30 text-xs p-1 text-center font-mono text-ivory focus:border-gold focus:outline-none"
                          />
                        </td>
                      </tr>
                    ))
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 3: IMMUTABLE ROW LEVEL SECURITY AUDIT TRAILS */}
        {activeTab === 'AUDIT_LOGS' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex justify-between items-center">
              <span className="text-[10px] uppercase tracking-editorial text-taupe">Displaying Last 50 System Transactions</span>
              <button onClick={fetchAuditLogs} className="text-[10px] uppercase tracking-editorial text-gold hover:underline">Re-index Pipeline</button>
            </div>
            
            <div className="border border-taupe/20 bg-taupe/5 max-h-[500px] overflow-y-auto divide-y divide-taupe/10 font-mono text-[11px]">
              {auditLogs.length === 0 ? (
                <div className="p-8 text-center text-taupe italic">No programmatic operations committed to the system log ledger yet.</div>
              ) : (
                auditLogs.map((log) => (
                  <div key={log.id} className="p-4 hover:bg-obsidian/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-2 transition-colors">
                    <div className="space-y-1">
                      <p className="text-gold uppercase font-semibold">{log.action}</p>
                      <p className="text-taupe">Operator Token ID: {log.userId || 'SYSTEM_NODE'}</p>
                      <p className="text-taupe/70 text-[10px]">{log.userAgent}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-ivory/80 block">{new Date(log.timestamp).toLocaleString()}</span>
                      <span className="text-taupe bg-obsidian px-2 py-0.5 rounded text-[10px] inline-block mt-1">{log.ipAddress}</span>
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
