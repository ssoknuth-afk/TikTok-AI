import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, Target, CalendarDays, Rocket } from "lucide-react";
import { MOCK_DATA } from "@/lib/mockData";
import { formatNumber } from "@/lib/calculations";

export function Growth() {
  const history = MOCK_DATA.followerHistory;
  const current = history[history.length - 1].followers;
  const thirtyDaysAgo = history[Math.max(0, history.length - 30)].followers;
  
  const pace30d = current - thirtyDaysAgo;
  const avgDailyPace = pace30d / 30;
  
  // Projections
  const milestone = Math.ceil(current / 100000) * 100000; // Next 100k bound
  const remaining = milestone - current;
  const daysToMilestone = Math.round(remaining / avgDailyPace);

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
           <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">Growth Tracker</h1>
           <p className="text-slate-500 mt-1">Pacing logic, follower acquisition, and milestone projections.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#1a1a1a] p-5 rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm">
           <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-2"><TrendingUp className="w-4 h-4"/> 30-Day Pace</p>
           <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">+{formatNumber(pace30d)}</h3>
        </div>
        <div className="bg-white dark:bg-[#1a1a1a] p-5 rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm">
           <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-2"><CalendarDays className="w-4 h-4"/> Daily Average</p>
           <h3 className="text-2xl font-bold text-slate-900 dark:text-white">+{Math.round(avgDailyPace).toLocaleString()}/day</h3>
        </div>
        <div className="bg-white dark:bg-[#1a1a1a] p-5 rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm">
           <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-2"><Target className="w-4 h-4"/> Next Milestone</p>
           <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">{formatNumber(milestone)}</h3>
        </div>
        <div className="bg-[#FF2D55]/10 p-5 rounded-2xl border border-[#FF2D55]/20 shadow-sm relative overflow-hidden">
           <p className="text-sm font-medium text-[#FF2D55] mb-1 flex items-center gap-2 relative z-10"><Rocket className="w-4 h-4"/> Target Hit In</p>
           <h3 className="text-2xl font-bold text-[#FF2D55] relative z-10">~{daysToMilestone} days</h3>
           <Rocket className="absolute -bottom-4 -right-2 w-20 h-20 text-[#FF2D55] opacity-10" />
        </div>
      </div>

      <motion.div 
         initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
         className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-slate-200 dark:border-slate-800/60 p-6 shadow-sm"
      >
        <div className="mb-6">
          <h3 className="text-lg font-semibold tracking-tight">Timeline & Annotations</h3>
          <p className="text-sm text-slate-500 mt-1">Showing 90 days. Sharp vertical curves indicate viral video uploads.</p>
        </div>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
             <LineChart data={history} margin={{ top: 20, right: 10, left: 10, bottom: 0 }}>
               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" strokeOpacity={0.2} />
               <XAxis 
                  dataKey="date" 
                  tickFormatter={(val) => {
                    const d = new Date(val);
                    return `${d.getMonth() + 1}/${d.getDate()}`;
                  }} 
                  tick={{ fill: '#64748b', fontSize: 12 }} 
                  axisLine={false} 
                  tickLine={false} 
                  minTickGap={30}
               />
               <YAxis 
                  domain={['dataMin', 'dataMax']} 
                  tickFormatter={(val) => formatNumber(val)} 
                  tick={{ fill: '#64748b', fontSize: 12 }} 
                  axisLine={false} 
                  tickLine={false} 
                  width={45}
               />
               <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '13px' }}
                  labelFormatter={(label) => new Date(label as string).toLocaleDateString()}
                  formatter={(value: number, name: string) => {
                     return [new Intl.NumberFormat().format(value), name === 'followers' ? 'Total Followers' : 'Gained'];
                  }}
               />
               <Line type="monotone" dataKey="followers" stroke="#FF2D55" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: '#FF2D55', strokeWidth: 0 }} />
             </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
