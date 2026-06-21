import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Users, MapPin, DollarSign, Activity } from "lucide-react";
import { MOCK_DATA } from "@/lib/mockData";
import { formatCurrency } from "@/lib/calculations";
import { cn } from "@/lib/utils";
import { InfoTooltip } from "@/components/ui/Tooltip";

export function Audience() {
  const { countries, ageRange, gender } = MOCK_DATA.audience;

  const ageData = Object.entries(ageRange).map(([key, val]) => ({ age: key, value: val }));
  const genderData = Object.entries(gender).map(([key, val]) => ({ name: key, value: val }));

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">Audience Insights</h1>
          <p className="text-slate-500 mt-1">Understand your viewers' demographics and monetization potential.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Age Demographics */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-slate-200 dark:border-slate-800/60 p-6 shadow-sm">
          <h3 className="text-lg font-semibold tracking-tight mb-6">Age Distribution</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#334155" strokeOpacity={0.2} />
                <XAxis type="number" hide />
                <YAxis dataKey="age" type="category" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 13 }} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255, 45, 85, 0.05)' }}
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                  formatter={(value: number) => [`${value}%`, 'Audience']}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                  {ageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 1 ? '#FF2D55' : '#FF2D5540'} /> // highlight highest
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Gender Breakdown */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-slate-200 dark:border-slate-800/60 p-6 shadow-sm">
          <h3 className="text-lg font-semibold tracking-tight mb-6">Gender Breakdown</h3>
          <div className="flex items-end h-[200px] gap-8 justify-center pb-4">
             {genderData.map((g, i) => (
               <div key={g.name} className="flex flex-col items-center gap-3">
                 <div className="relative w-16 bg-slate-100 dark:bg-slate-800 rounded-t-xl flex items-end justify-center overflow-hidden" style={{ height: '150px' }}>
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${(g.value / 100) * 150}px` }}
                      transition={{ delay: 0.3 + (i * 0.1), duration: 0.8, type: 'spring' }}
                      className={cn("w-full absolute bottom-0", i === 0 ? "bg-[#2563eb]" : i === 1 ? "bg-[#FF2D55]" : "bg-slate-500")}
                    />
                    <span className="absolute bottom-2 text-white font-semibold text-sm z-10">{g.value}%</span>
                 </div>
                 <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{g.name}</span>
               </div>
             ))}
          </div>
        </motion.div>
      </div>

      {/* Top Countries & Monetization */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div className="flex items-center gap-2 mb-4 mt-8">
           <MapPin className="w-5 h-5 text-slate-400" />
           <h3 className="text-lg font-semibold tracking-tight">Top Regions & Monetization</h3>
           <InfoTooltip content="Tiers are based on TikTok Creator Rewards program estimates. US/UK/CA generally offer higher CPMs." />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
           {countries.sort((a,b) => b.percentage - a.percentage).map((country, i) => (
             <div key={country.code} className="bg-white dark:bg-[#1a1a1a] p-5 rounded-xl border border-slate-200 dark:border-slate-800/60 flex flex-col hover:border-slate-300 dark:hover:border-slate-700 transition-colors group">
               <div className="flex justify-between items-start mb-4">
                 <div className="flex items-center gap-2">
                   <div className="w-8 h-6 bg-slate-200 rounded overflow-hidden shadow-sm flex items-center justify-center text-xs">
                     {/* Placeholder flag logic */}
                     {country.code === 'US' ? '🇺🇸' : country.code === 'GB' ? '🇬🇧' : country.code === 'CA' ? '🇨🇦' : country.code === 'DE' ? '🇩🇪' : country.code === 'IN' ? '🇮🇳' : country.code === 'AU' ? '🇦🇺' : '🌐'}
                   </div>
                   <span className="font-medium text-sm">{country.country}</span>
                 </div>
                 <span className="text-lg font-bold text-slate-900 dark:text-white">{country.percentage}%</span>
               </div>
               
               <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-2 gap-2">
                 <div>
                   <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Est. CPM</p>
                   <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{formatCurrency(country.estimatedCpm)}</p>
                 </div>
                 <div className="text-right">
                   <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Tier</p>
                   <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                     {country.estimatedCpm > 0.8 ? 'Premium' : country.estimatedCpm > 0.4 ? 'Standard' : 'Developing'}
                   </p>
                 </div>
               </div>
             </div>
           ))}
        </div>
      </motion.div>
    </div>
  );
}
