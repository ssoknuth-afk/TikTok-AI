import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Radio, Users, Diamond, Clock } from "lucide-react";
import { MOCK_DATA } from "@/lib/mockData";
import { formatNumber } from "@/lib/calculations";
import { toast } from "sonner";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export function LiveAnalytics() {
  const [isLive, setIsLive] = useState(false);
  const [viewers, setViewers] = useState(0);
  const [peak, setPeak] = useState(0);
  const [newFollowers, setNewFollowers] = useState(0);
  const [diamonds, setDiamonds] = useState(0);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isLive) {
      interval = setInterval(() => {
        setTimer(t => t + 1);
        
        // Simulate audience volatility (random walk)
        setViewers(v => {
           const change = Math.floor((Math.random() - 0.4) * 85); // Upward bias slightly
           const next = Math.max(0, v + change);
           if (next > peak) setPeak(next);
           return next;
        });

        // Sim drips
        if (Math.random() > 0.7) setNewFollowers(f => f + Math.floor(Math.random() * 3) + 1);
        if (Math.random() > 0.8) setDiamonds(d => d + Math.floor(Math.random() * 50) + 10);
        
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isLive, peak]);

  const toggleLive = () => {
    if (!isLive) {
       toast.success("Live session simulator started!");
       setIsLive(true);
       setViewers(240); // Initial jump
       setPeak(240);
    } else {
       toast.error("Session ended.");
       setIsLive(false);
    }
  };

  const formatTimer = (secs: number) => {
     const m = Math.floor(secs / 60);
     const s = secs % 60;
     return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
           <div className="flex items-center gap-3">
             <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">Live Analytics</h1>
             {isLive && <span className="bg-rose-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold animate-pulse shadow-[0_0_10px_rgba(244,63,94,0.6)]">LIVE NOW</span>}
           </div>
           <p className="text-slate-500 mt-1">Real-time EchoTik-style stream performance & historical sessions.</p>
        </div>
        <button 
           onClick={toggleLive}
           className={cn(
             "px-6 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all shadow-sm",
             isLive ? "bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900" : "bg-[#FF2D55] text-white hover:bg-[#ff1a47] shadow-[#FF2D55]/20"
           )}
        >
          <Radio className={cn("w-4 h-4", isLive && "animate-pulse")} />
          {isLive ? "End Session" : "Start Live Session (Sim)"}
        </button>
      </div>

      {isLive && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="grid grid-cols-2 lg:grid-cols-4 gap-4 overflow-hidden">
          <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-700">
             <p className="text-slate-400 text-sm mb-1">Current Viewers</p>
             <p className="text-3xl font-bold font-mono text-emerald-400">{viewers}</p>
          </div>
          <div className="bg-white dark:bg-[#1a1a1a] p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
             <p className="text-slate-500 text-sm mb-1 flex items-center gap-1"><Users className="w-4 h-4"/> Peak Viewers</p>
             <p className="text-3xl font-bold font-mono">{peak}</p>
          </div>
          <div className="bg-white dark:bg-[#1a1a1a] p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
             <p className="text-slate-500 text-sm mb-1 flex items-center gap-1"><Users className="w-4 h-4 text-blue-500"/> Gained Followers</p>
             <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">+{newFollowers}</p>
          </div>
          <div className="bg-white dark:bg-[#1a1a1a] p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
             <div className="flex justify-between items-start">
               <div>
                  <p className="text-slate-500 text-sm mb-1 flex items-center gap-1"><Diamond className="w-4 h-4 text-rose-500"/> Est. Diamonds</p>
                  <p className="text-3xl font-bold text-rose-600 dark:text-rose-400">{diamonds}</p>
               </div>
               <span className="font-mono text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">{formatTimer(timer)}</span>
             </div>
          </div>
        </motion.div>
      )}

      <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm overflow-hidden mt-8">
        <div className="p-5 border-b border-slate-200 dark:border-slate-800">
           <h3 className="text-lg font-semibold tracking-tight">Historical Live Sessions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 bg-slate-50/50 dark:bg-slate-900/20 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-5 py-4 font-medium">Date</th>
                <th className="px-5 py-4 font-medium">Duration</th>
                <th className="px-5 py-4 font-medium">Total Audience</th>
                <th className="px-5 py-4 font-medium">Peak</th>
                <th className="px-5 py-4 font-medium text-blue-500">New Followers</th>
                <th className="px-5 py-4 font-medium text-rose-500">Diamonds</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60">
               {MOCK_DATA.liveSessions.map((row) => (
                 <tr key={row.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                   <td className="px-5 py-4 font-medium">{format(new Date(row.date), 'MMM d, yyyy - h:mm a')}</td>
                   <td className="px-5 py-4 text-slate-600 dark:text-slate-400">{row.durationMinutes} mins</td>
                   <td className="px-5 py-4">{formatNumber(row.totalViewers)}</td>
                   <td className="px-5 py-4">{formatNumber(row.peakViewers)}</td>
                   <td className="px-5 py-4 text-blue-600 dark:text-blue-400 font-medium">+{row.newFollowers}</td>
                   <td className="px-5 py-4 font-medium flex items-center gap-1.5"><Diamond className="w-4 h-4 text-rose-400"/> {formatNumber(row.estimatedDiamonds)}</td>
                 </tr>
               ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
