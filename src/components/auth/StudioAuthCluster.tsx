import React, { useState } from 'react';

export type AuthMode = 'LOGIN' | 'REGISTER' | 'MFA_CHALLENGE' | 'PASSWORD_RESET' | 'RESET_CONFIRM';

export const StudioAuthCluster: React.FC = () => {
  const [authMode, setAuthMode] = useState<AuthMode>('LOGIN');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [mfaToken, setMfaToken] = useState<string>('');
  const [roleSelection, setRoleSelection] = useState<string>('CLIENT');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulated auth network latency handshake matching Page 28-37 telemetry constraints
    setTimeout(() => {
      setIsLoading(false);
      if (authMode === 'LOGIN') {
        setAuthMode('MFA_CHALLENGE');
      } else if (authMode === 'MFA_CHALLENGE') {
        alert('Identity verification verified. Vault keys assigned.');
        setAuthMode('LOGIN');
      } else {
        alert('State transition executed successfully.');
        setAuthMode('LOGIN');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-obsidian text-ivory font-montserrat flex flex-col justify-center items-center p-6 pt-16">
      
      {/* PERSISTENT RUNTIME LEDGER */}
      <div className="absolute top-16 left-0 right-0 bg-taupe/5 border-b border-taupe/10 py-2 px-6 text-[8px] font-mono uppercase tracking-monumental flex justify-between text-taupe">
        <span>Identity Node Segment: {authMode}</span>
        <span className="text-gold">SECURE SECRETS ENGINE // TLS 1.3</span>
      </div>

      <div className="w-full max-w-sm border border-taupe/20 bg-taupe/5 p-6 lg:p-8 space-y-6 animate-fade-in mt-8">
        
        {/* BRAND IDENTITY NODE */}
        <div className="text-center space-y-1">
          <span className="text-[9px] text-gold font-mono uppercase tracking-monumental block">The Portal Mesh</span>
          <h1 className="font-cinzel text-base tracking-editorial text-ivory uppercase">Studio Auth Core</h1>
        </div>

        <form onSubmit={handleAuthSubmit} className="space-y-4 font-mono text-[10px]">
          
          {/* --- VIEW: LOGIN MATRIX (Page 28) --- */}
          {authMode === 'LOGIN' && (
            <div className="space-y-3">
              <div>
                <label className="block text-taupe uppercase mb-1">Encrypted Identity (Email)</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-obsidian border border-taupe/20 text-ivory p-3 focus:outline-none focus:border-gold transition-colors text-[11px]"
                  placeholder="name@domain.com"
                />
              </div>
              <div>
                <div className="flex justify-between items-baseline mb-1">
                  <label className="text-taupe uppercase">Private Key pass Phrase</label>
                  <button 
                    type="button"
                    onClick={() => setAuthMode('PASSWORD_RESET')}
                    className="text-[8px] text-gold uppercase hover:underline"
                  >
                    Forgot?
                  </button>
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-obsidian border border-taupe/20 text-ivory p-3 focus:outline-none focus:border-gold transition-colors text-[11px]"
                />
              </div>
            </div>
          )}

          {/* --- VIEW: ACCOUNT REGISTRATION CORE (Pages 29-31) --- */}
          {authMode === 'REGISTER' && (
            <div className="space-y-3">
              <div>
                <label className="block text-taupe uppercase mb-1">Profile Classification Role</label>
                <select
                  value={roleSelection}
                  onChange={(e) => setRoleSelection(e.target.value)}
                  className="w-full bg-obsidian border border-taupe/20 text-ivory p-3 focus:outline-none focus:border-gold text-[11px]"
                >
                  <option value="CLIENT">Private Client / Asset Owner</option>
                  <option value="TRADE_PARTNER">Registered Trade Specialist / Contractor</option>
                  <option value="INSTALLER">Verified Logistics & Site Installer</option>
                </select>
              </div>
              <div>
                <label className="block text-taupe uppercase mb-1">Target Account Email</label>
                <input
                  type="email"
                  required
                  className="w-full bg-obsidian border border-taupe/20 text-ivory p-3 focus:outline-none focus:border-gold text-[11px]"
                />
              </div>
              <div>
                <label className="block text-taupe uppercase mb-1">Establish Security Passphrase</label>
                <input
                  type="password"
                  required
                  className="w-full bg-obsidian border border-taupe/20 text-ivory p-3 focus:outline-none focus:border-gold text-[11px]"
                />
              </div>
            </div>
          )}

          {/* --- VIEW: MULTI-FACTOR CHALLENGE GUARD (Pages 32-34) --- */}
          {authMode === 'MFA_CHALLENGE' && (
            <div className="space-y-3 text-center">
              <p className="text-taupe font-sans text-xs leading-relaxed italic">"A high-security cryptographic token challenge has been dispatched to your profile vector devices."</p>
              <div className="pt-2">
                <label className="block text-left text-taupe uppercase mb-1 tracking-wider text-[9px]">Input MFA Code Vector</label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={mfaToken}
                  onChange={(e) => setMfaToken(e.target.value)}
                  className="w-full bg-obsidian border border-taupe/20 text-ivory p-3 focus:outline-none focus:border-gold text-center tracking-widest text-sm font-bold"
                  placeholder="000000"
                />
              </div>
            </div>
          )}

          {/* --- VIEW: PASSWORD RESET REQUEST SYSTEM (Pages 35-37) --- */}
          {authMode === 'PASSWORD_RESET' && (
            <div className="space-y-3">
              <p className="text-taupe font-sans text-xs leading-relaxed">Provide your authenticated email endpoint. If verified within our active user cluster schemas, a recovery token routing footprint will initialize.</p>
              <div>
                <label className="block text-taupe uppercase mb-1">Recovery Target Email</label>
                <input
                  type="email"
                  required
                  className="w-full bg-obsidian border border-taupe/20 text-ivory p-3 focus:outline-none focus:border-gold text-[11px]"
                />
              </div>
            </div>
          )}

          {/* SHARED TRANSACTION SUBMIT TRIGGER ACTION */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gold text-obsidian text-[10px] font-bold tracking-editorial uppercase py-3 hover:bg-gold-hover transition-all disabled:opacity-40"
            >
              {isLoading ? 'Processing SecOps Handshake...' : 'Execute Operational Sequence'}
            </button>
          </div>
        </form>

        {/* CONTROLLER TOGGLE FLOOR MATRIX */}
        <div className="pt-4 border-t border-taupe/10 flex justify-between items-center text-[8px] font-mono uppercase tracking-wider text-taupe">
          {authMode === 'LOGIN' ? (
            <>
              <span>New Node?</span>
              <button onClick={() => setAuthMode('REGISTER')} className="text-gold hover:underline">Register Matrix</button>
            </>
          ) : (
            <>
              <span>Existing Profile?</span>
              <button onClick={() => setAuthMode('LOGIN')} className="text-gold hover:underline">Return to Login</button>
            </>
          )}
        </div>

      </div>
    </div>
  );
};
