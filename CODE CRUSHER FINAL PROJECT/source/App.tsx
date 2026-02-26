import React, { useState, useEffect } from 'react';
import { Shield, ShieldCheck, KeyRound, ArrowRight, CheckCircle2, AlertCircle, Cpu, Fingerprint, Lock, Terminal } from 'lucide-react';
import { motion } from 'motion/react';

type UIState = 'request' | 'verify' | 'success';

const TechBackground = () => {
  const [numbers, setNumbers] = useState<string[]>([]);

  useEffect(() => {
    // Generate random data streams
    const interval = setInterval(() => {
      setNumbers(prev => {
        const newNums = [...prev, Math.random().toString().substring(2, 10)];
        if (newNums.length > 15) newNums.shift();
        return newNums;
      });
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-slate-950">
      {/* Background Image with Blur */}
      <img 
        src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop" 
        alt="Cyber Background" 
        className="absolute inset-0 w-full h-full object-cover opacity-20 blur-[8px]"
        referrerPolicy="no-referrer"
      />
      
      {/* Dark Overlay & Gradients */}
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px]" />
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-900/30 blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-900/30 blur-[120px]" />
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0891b215_1px,transparent_1px),linear-gradient(to_bottom,#0891b215_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]" />

      {/* Floating Tech Words */}
      <motion.div animate={{ opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-[15%] left-[10%] text-cyan-500/30 font-mono text-3xl font-bold tracking-widest rotate-[-15deg] select-none">STATELESS</motion.div>
      <motion.div animate={{ opacity: [0.1, 0.4, 0.1] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }} className="absolute top-[65%] left-[5%] text-emerald-500/30 font-mono text-2xl font-bold tracking-widest rotate-[10deg] select-none">ENCRYPTED</motion.div>
      <motion.div animate={{ opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 6, repeat: Infinity, delay: 2 }} className="absolute top-[25%] right-[10%] text-cyan-500/30 font-mono text-4xl font-bold tracking-widest rotate-[5deg] select-none">VEDIC_MATH</motion.div>
      <motion.div animate={{ opacity: [0.1, 0.5, 0.1] }} transition={{ duration: 4.5, repeat: Infinity, delay: 0.5 }} className="absolute top-[75%] right-[15%] text-emerald-500/30 font-mono text-xl font-bold tracking-widest rotate-[-5deg] select-none">ZERO_DB</motion.div>
      
      {/* Data Streams */}
      {numbers.map((num, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: [0, 0.5, 0], y: 100 }}
          transition={{ duration: 3, ease: "linear" }}
          className="absolute font-mono text-cyan-500/40 text-xs select-none"
          style={{ left: `${(i * 13) % 100}%`, top: `${(i * 17) % 100}%` }}
        >
          {num}
        </motion.div>
      ))}
    </div>
  );
};

export default function App() {
  const [uiState, setUiState] = useState<UIState>('request');
  const [email, setEmail] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [serverTimestamp, setServerTimestamp] = useState<number | null>(null);
  const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRequestOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/generate-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      
      setServerTimestamp(data.timestamp);
      setGeneratedOtp(data.otp);
      setUiState('verify');
    } catch (err) {
      setError('Failed to connect to server.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpInput || !serverTimestamp) return;

    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userOtp: otpInput, timestamp: serverTimestamp })
      });
      const data = await res.json();
      
      if (data.success) {
        setUiState('success');
      } else {
        setError(data.message || 'Verification failed');
      }
    } catch (err) {
      setError('Failed to connect to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-slate-200 flex items-center justify-center p-4 font-sans selection:bg-cyan-500/30 relative">
      <TechBackground />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="backdrop-blur-xl bg-slate-950/60 border border-cyan-900/50 rounded-2xl shadow-[0_0_40px_rgba(8,145,178,0.15)] overflow-hidden relative group">
          
          {/* Scanning line effect */}
          <motion.div 
            animate={{ top: ['-10%', '110%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[1px] bg-cyan-400/50 shadow-[0_0_10px_rgba(34,211,238,0.8)] z-20 pointer-events-none"
          />

          {/* Header */}
          <div className="p-8 border-b border-slate-800/50 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none" />
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-900/80 border border-cyan-800/50 mb-4 shadow-[0_0_15px_rgba(8,145,178,0.2)] relative">
              <div className="absolute inset-0 rounded-2xl border border-cyan-400/20 animate-pulse" />
              {uiState === 'success' ? (
                <ShieldCheck className="w-8 h-8 text-emerald-400" />
              ) : (
                <Fingerprint className="w-8 h-8 text-cyan-400" />
              )}
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center justify-center gap-2">
              <Terminal className="w-6 h-6 text-cyan-500" />
              VediAuth
            </h1>
            <p className="text-cyan-400/70 text-xs mt-2 font-mono uppercase tracking-widest">Secured OTP generator</p>
          </div>

          {/* Body */}
          <div className="p-8 relative">
            {error && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-900/50 flex items-start gap-3 text-red-400 text-sm backdrop-blur-md">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p className="font-mono">{error}</p>
              </motion.div>
            )}

            {uiState === 'request' && (
              <motion.form 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleRequestOTP} 
                className="space-y-6"
              >
                <div>
                  <label className="block text-xs font-mono text-cyan-500/70 mb-2 uppercase tracking-wider flex items-center gap-2">
                    <Lock className="w-3 h-3" /> YOUR IDENTITY
                  </label>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="relative w-full bg-slate-950/80 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors font-mono placeholder:text-slate-600"
                      placeholder="example@code.com"
                    />
                  </div>
                </div>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full relative group overflow-hidden rounded-xl disabled:opacity-50"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-emerald-600 transition-transform duration-300 group-hover:scale-105" />
                  <div className="relative px-4 py-3 flex items-center justify-center gap-2 text-white font-medium tracking-wide">
                    {loading ? (
                      <span className="font-mono flex items-center gap-2"><Cpu className="w-4 h-4 animate-spin" /> PROCESSING_</span>
                    ) : (
                      <span className="font-mono flex items-center gap-2">GENERATE OTP <ArrowRight className="w-4 h-4" /></span>
                    )}
                  </div>
                </button>
              </motion.form>
            )}

            {uiState === 'verify' && (
              <motion.form 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                onSubmit={handleVerifyOTP} 
                className="space-y-6"
              >
                {/* Demo Display for Judges */}
                <div className="p-5 rounded-xl bg-slate-950/80 border border-cyan-900/50 mb-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(8,145,178,0.1)_50%,transparent_75%)] bg-[length:250%_250%,100%_100%] animate-[shimmer_2s_infinite]" />
                  <div className="flex items-center justify-between mb-2 relative z-10">
                    <p className="text-xs text-cyan-500/70 uppercase tracking-widest font-mono flex items-center gap-2">
                      <Cpu className="w-3 h-3" /> Authentication Request
                    </p>
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  </div>
                  <p className="text-sm text-slate-300 relative z-10 font-mono">
                    OTP: <span className="text-emerald-400 font-bold text-xl tracking-[0.2em] ml-2 bg-emerald-500/10 px-2 py-1 rounded">{generatedOtp}</span>
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-mono text-cyan-500/70 mb-2 uppercase tracking-wider flex items-center gap-2">
                    <KeyRound className="w-3 h-3" /> Enter Security Key
                  </label>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                    <input 
                      type="text" 
                      required
                      maxLength={6}
                      value={otpInput}
                      onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
                      className="relative w-full bg-slate-950/80 border border-slate-700 rounded-xl px-4 py-4 text-center text-white font-mono text-2xl tracking-[0.5em] focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors placeholder:text-slate-700"
                      placeholder="••••••"
                    />
                  </div>
                </div>
                <button 
                  type="submit" 
                  disabled={loading || otpInput.length !== 6}
                  className="w-full relative group overflow-hidden rounded-xl disabled:opacity-50"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-emerald-600 transition-transform duration-300 group-hover:scale-105" />
                  <div className="relative px-4 py-3 flex items-center justify-center gap-2 text-white font-medium tracking-wide">
                    {loading ? (
                      <span className="font-mono flex items-center gap-2"><Cpu className="w-4 h-4 animate-spin" /> VERIFYING_</span>
                    ) : (
                      <span className="font-mono flex items-center gap-2">AUTHENTICATE <Shield className="w-4 h-4" /></span>
                    )}
                  </div>
                </button>
              </motion.form>
            )}

            {uiState === 'success' && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="relative inline-flex items-center justify-center w-24 h-24 mb-6">
                  <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
                  <div className="absolute inset-2 rounded-full bg-emerald-500/20 animate-pulse" />
                  <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-slate-900 border border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2 font-mono tracking-tight">ACCESS GRANTED</h2>
                <p className="text-emerald-400/80 font-mono text-sm mb-8">Identity verified.</p>
                
                <button 
                  onClick={() => {
                    setUiState('request');
                    setEmail('');
                    setOtpInput('');
                    setServerTimestamp(null);
                    setGeneratedOtp(null);
                  }}
                  className="text-xs font-mono text-cyan-500/70 hover:text-cyan-400 transition-colors flex items-center justify-center gap-2 w-full uppercase tracking-widest"
                >
                  <Terminal className="w-3 h-3" /> Terminate Session
                </button>
              </motion.div>
            )}
          </div>
        </div>
        
        <div className="text-center mt-8 flex flex-col items-center gap-2">
          <div className="flex gap-2">
            <span className="w-1 h-1 rounded-full bg-cyan-500 animate-pulse" />
            <span className="w-1 h-1 rounded-full bg-cyan-500 animate-pulse delay-75" />
            <span className="w-1 h-1 rounded-full bg-cyan-500 animate-pulse delay-150" />
          </div>
          <p className="text-[10px] text-cyan-500/50 font-mono uppercase tracking-[0.2em]">Anurūpye Śūnyamanyat • Zero DB Architecture</p>
        </div>
      </motion.div>
    </div>
  );
}
