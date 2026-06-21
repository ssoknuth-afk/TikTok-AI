import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie, Legend } from "recharts";
import { PlaySquare, Heart, MessageCircle, Share2, TrendingUp, Users, Clock, DollarSign, Activity, FileVideo } from "lucide-react";
import { MOCK_DATA } from "@/lib/mockData";
import { calculateOverviewMetrics, formatNumber, formatCurrency, formatPercent, getAggregatedTrafficSources } from "@/lib/calculations";
import { InfoTooltip } from "@/components/ui/Tooltip";
import { cn } from "@/lib/utils";

export function Overview() {
  const metrics = calculateOverviewMetrics(MOCK_DATA);
  const traffic = getAggregatedTrafficSources(MOCK_DATA);

  const kpis = [
    { label: "Total Views", value: formatNumber(metrics.totalViews), delta: "+15.2%", icon: PlaySquare, info: "Total reach per video across the selected date range." },
    { label: "Follower Growth", value: `+${formatNumber(metrics.followerGrowth)}`, delta: `+${metrics.followerGrowthPercent.toFixed(1)}%`, icon: Users, info: "Net new followers gained." },
    { label: "Avg Engagement", value: formatPercent(metrics.avgEngagementRate), delta: "+1.2%", icon: Activity, info: "(Likes + Comments + Shares + Saves) / Views. The core metric for algorithm ranking." },
    { label: "Watch Completion", value: formatPercent(metrics.avgWatchCompletion), delta: "-2.1%", icon: Clock, info: "Average completion rate per video. A critical algorithmic ranking signal." },
    { label: "Est. Revenue", value: formatCurrency(metrics.estimatedRevenue), delta: "+8.4%", icon: DollarSign, info: "Estimated earnings based on audience CPM logic ($1.00/1K for US/UK viewers)." },
    { label: "FYP Distribution", value: formatPercent(metrics.fypScore), delta: "+4.5%", icon: TrendingUp, info: "Average % of traffic coming strictly from the For You Page." },
  ];

  const trafficData = [
    { name: 'For You Page', value: traffic.fyp, color: '#FF2D55' },
    { name: 'Search', value: traffic.search, color: '#2563eb' },
    { name: 'Followers', value: traffic.followers, color: '#10b981' },
    { name: 'Other', value: traffic.other, color: '#64748b' },
  ];

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">Overview</h1>
          <p className="text-slate-500 mt-1">Key metrics and account performance for the last 90 days.</p>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          const isPositive = kpi.delta.startsWith('+');
          return (
            <motion.div 
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white dark:bg-[#1a1a1a] p-5 rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm relative overflow-hidden group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 group-hover:text-[#FF2D55] group-hover:bg-[#FF2D55]/10 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <div className={cn("text-xs font-medium px-2 py-1 rounded-md", isPositive ? "bg-emerald-100/50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-rose-100/50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400")}>
                  {kpi.delta}
                </div>
              </div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center">
                {kpi.label} <InfoTooltip content={kpi.info} />
              </p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tracking-tight">{kpi.value}</h3>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Growth Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
          className="lg:col-span-2 bg-white dark:bg-[#1a1a1a] rounded-2xl border border-slate-200 dark:border-slate-800/60 p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold tracking-tight">Follower Growth</h3>
            <span className="text-sm text-slate-500">Last 90 Days</span>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_DATA.followerHistory} margin={{ top: 10, right: 0, left: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorFollowers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF2D55" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#FF2D55" stopOpacity={0}/>
                  </linearGradient>
                </defs>
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
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '13px' }}
                  itemStyle={{ color: '#fff' }}
                  formatter={(value: number) => [new Intl.NumberFormat().format(value), 'Followers']}
                  labelFormatter={(label) => new Date(label as string).toLocaleDateString()}
                />
                <Area type="monotone" dataKey="followers" stroke="#FF2D55" strokeWidth={3} fillOpacity={1} fill="url(#colorFollowers)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Traffic Sources */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
          className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-slate-200 dark:border-slate-800/60 p-6 shadow-sm flex flex-col"
        >
           <h3 className="text-lg font-semibold tracking-tight inline-flex items-center">
             Traffic Sources <InfoTooltip content="Distribution of where your video views originate. FYP indicates algorithmic reach." />
           </h3>
           <div className="flex-1 min-h-[250px]">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie
                   data={trafficData}
                   innerRadius={60}
                   outerRadius={80}
                   paddingAngle={2}
                   dataKey="value"
                 >
                   {trafficData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={entry.color} />
                   ))}
                 </Pie>
                 <RechartsTooltip 
                   formatter={(value: number) => [`${value.toFixed(1)}%`, 'Traffic']}
                   contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '13px' }}
                 />
                 <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }}/>
               </PieChart>
             </ResponsiveContainer>
           </div>
        </motion.div>
      </div>

      {/* Top Videos */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <h3 className="text-lg font-semibold tracking-tight mb-4 flex items-center gap-2">
          <FileVideo className="w-5 h-5 text-slate-400" /> Recent Top Performers
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
          {MOCK_DATA.videos.slice(0, 5).map((video) => (
            <div key={video.id} className="bg-white dark:bg-[#1a1a1a] rounded-xl border border-slate-200 dark:border-slate-800/60 overflow-hidden group cursor-pointer hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
              <div className="h-32 bg-slate-200 dark:bg-slate-800 relative overflow-hidden">
                 <img src={video.thumbnail} alt="thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                 <span className="absolute bottom-2 right-2 text-xs font-semibold bg-black/60 backdrop-blur-sm text-white px-1.5 py-0.5 rounded">
                   {formatNumber(video.views)}
                 </span>
              </div>
              <div className="p-3">
                <p className="text-sm font-medium line-clamp-2 leading-snug mb-2" title={video.title}>{video.title}</p>
                <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" />{formatNumber(video.actions.likes)}</span>
                  <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5" />{formatNumber(video.actions.comments)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
