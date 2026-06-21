import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Compass, Search, Users, Link2 } from "lucide-react";
import { MOCK_DATA } from "@/lib/mockData";
import { getAggregatedTrafficSources } from "@/lib/calculations";
import { cn } from "@/lib/utils";

// Mocking time-series traffic data
const timeSeriesTraffic = MOCK_DATA.videos.map(v => ({
  date: new Date(v.uploadDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
  fyp: v.trafficSources.fyp,
  search: v.trafficSources.search,
  followers: v.trafficSources.followers,
})).reverse();

export function Traffic() {
  const traffic = getAggregatedTrafficSources(MOCK_DATA);

  const sources = [
    { 
      id: 'fyp', name: 'For You Page', value: traffic.fyp, icon: Compass, color: 'bg-[#FF2D55]',
      desc: "Traffic from TikTok's main recommendation algorithm.",
      meaning: "High FYP indicates the algorithm is finding and expanding your audience successfully. Target >70% for explosive growth."
    },
    { 
      id: 'search', name: 'Search', value: traffic.search, icon: Search, color: 'bg-[#2563eb]',
      desc: "Traffic from users directly searching keywords.",
      meaning: "High Search indicates strong SEO value. These videos will generate compounding, passive views over months."
    },
    { 
      id: 'followers', name: 'Followers / Following', value: traffic.followers, icon: Users, color: 'bg-[#10b981]',
      desc: "Traffic from your existing audience.",
      meaning: "Shows loyalty. A high % here with low FYP% means the algorithm gated the video due to early performance metrics."
    },
    { 
      id: 'other', name: 'Personal Profile / Links', value: traffic.other, icon: Link2, color: 'bg-[#64748b]',
      desc: "Traffic from profile clicks, external shares, or embeds.",
      meaning: "Usually a small fraction, but spikes here indicate highly shareable content or viral external links."
    }
  ];

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">Traffic Sources</h1>
          <p className="text-slate-500 mt-1">Deep dive into where your views are coming from.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Breakdown Cards */}
        <div className="xl:col-span-1 space-y-4">
           {sources.map((source, i) => {
             const Icon = source.icon;
             return (
               <motion.div 
                 key={source.id}
                 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                 className="bg-white dark:bg-[#1a1a1a] p-5 rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm relative overflow-hidden"
               >
                 <div className="flex justify-between items-start mb-3">
                   <div className="flex items-center gap-3">
                     <div className={cn("p-2 rounded-lg text-white", source.color)}>
                       <Icon className="w-4 h-4" />
                     </div>
                     <h3 className="font-semibold text-slate-900 dark:text-white">{source.name}</h3>
                   </div>
                   <span className="text-xl font-bold">{source.value.toFixed(1)}%</span>
                 </div>
                 
                 <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 mb-4">
                   <div className={cn("h-1.5 rounded-full", source.color)} style={{ width: `${source.value}%` }} />
                 </div>
                 
                 <div className="space-y-2">
                   <p className="text-xs text-slate-600 dark:text-slate-400"><strong>Source:</strong> {source.desc}</p>
                   <p className="text-xs text-slate-500 dark:text-slate-500 bg-slate-50 dark:bg-slate-800/50 p-2 rounded-md italic">
                     {source.meaning}
                   </p>
                 </div>
               </motion.div>
             )
           })}
        </div>

        {/* Traffic Trend Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
          className="xl:col-span-2 bg-white dark:bg-[#1a1a1a] rounded-2xl border border-slate-200 dark:border-slate-800/60 p-6 shadow-sm flex flex-col"
        >
          <div className="mb-6">
            <h3 className="text-lg font-semibold tracking-tight">Traffic Trend per Video</h3>
            <p className="text-sm text-slate-500 mt-1">Composition of views over your last 10 uploads.</p>
          </div>
          <div className="flex-1 min-h-[400px]">
             <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timeSeriesTraffic} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" strokeOpacity={0.2} />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(val) => `${val}%`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '13px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="fyp" name="FYP" stackId="1" stroke="#FF2D55" fill="#FF2D55" fillOpacity={0.8} />
                  <Area type="monotone" dataKey="search" name="Search" stackId="1" stroke="#2563eb" fill="#2563eb" fillOpacity={0.8} />
                  <Area type="monotone" dataKey="followers" name="Followers" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.8} />
                </AreaChart>
             </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
