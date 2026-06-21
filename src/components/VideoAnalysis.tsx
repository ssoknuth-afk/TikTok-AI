import { Eye, Heart, MessageCircle, Share2, Bookmark, Clock, Sparkles, AlertCircle, Hash, PlaySquare } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface VideoAnalysisProps {
  data: any;
  insights: any;
}

export function VideoAnalysis({ data, insights }: VideoAnalysisProps) {
  if (!data?.performance) return null;

  const COLORS = ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd'];
  
  const engagementData = [
    { name: 'Likes', value: data.performance.likes },
    { name: 'Comments', value: data.performance.comments },
    { name: 'Shares', value: data.performance.shares },
    { name: 'Saves', value: data.performance.saves },
  ];

  const getMetricCard = (title: string, value: string | number, icon: any, colorClass: string) => (
    <div className="glass-card p-5 hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{title}</p>
          <h4 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{value}</h4>
        </div>
        <div className={`p-2 rounded-lg py-1 ${colorClass}`}>
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="glass-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 mb-2 md:mb-0">
             <PlaySquare className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1 line-clamp-2">
              {data.content.caption}
            </h2>
            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {data.content.duration}s length</span>
              <span>•</span>
              <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">{data.content.resolution}</span>
            </div>
          </div>
        </div>
        <div className="text-right whitespace-nowrap">
          <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest">Viral Scope</p>
          <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{insights?.viralPotentialScore || "??"} / 100</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {getMetricCard("Views", new Intl.NumberFormat('en-US', { notation: "compact" }).format(data.performance.views), <Eye className="w-4 h-4" />, "text-slate-600 bg-slate-100")}
        {getMetricCard("Likes", new Intl.NumberFormat('en-US', { notation: "compact" }).format(data.performance.likes), <Heart className="w-4 h-4" />, "text-rose-600 bg-rose-100")}
        {getMetricCard("Comments", new Intl.NumberFormat('en-US', { notation: "compact" }).format(data.performance.comments), <MessageCircle className="w-4 h-4" />, "text-blue-600 bg-blue-100")}
        {getMetricCard("Shares", new Intl.NumberFormat('en-US', { notation: "compact" }).format(data.performance.shares), <Share2 className="w-4 h-4" />, "text-green-600 bg-green-100")}
        {getMetricCard("Saves", new Intl.NumberFormat('en-US', { notation: "compact" }).format(data.performance.saves), <Bookmark className="w-4 h-4" />, "text-amber-600 bg-amber-100")}
        {getMetricCard("Watch Rate", data.performance.watchRate, <Activity className="w-4 h-4" />, "text-purple-600 bg-purple-100")}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-card p-6 col-span-1 border-blue-200 dark:border-blue-900/50">
           <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">Engagement Distribution</h3>
           <div className="h-48 w-full">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie
                   data={engagementData}
                   innerRadius={40}
                   outerRadius={70}
                   paddingAngle={2}
                   dataKey="value"
                 >
                   {engagementData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                   ))}
                 </Pie>
                 <Tooltip formatter={(value) => new Intl.NumberFormat('en-US', { notation: "compact" }).format(value as number)} />
               </PieChart>
             </ResponsiveContainer>
           </div>
           <div className="flex flex-wrap gap-2 mt-4">
             {data.content.hashtags.map((tag: string) => (
                <span key={tag} className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded font-medium flex items-center gap-0.5">
                  <Hash className="w-3 h-3" />{tag.replace('#', '')}
                </span>
             ))}
           </div>
        </div>

        <div className="glass-card p-6 col-span-2 relative overflow-hidden bg-gradient-to-br from-white to-indigo-50/50 dark:from-slate-900 dark:to-indigo-950/20">
          <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
            <Sparkles className="w-32 h-32" />
          </div>
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-indigo-500" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Gemini Video Analysis & Strategy</h3>
          </div>
          
          <div className="space-y-4 relative z-10">
            <div className="bg-white/60 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50">
              <h4 className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">Hook Analysis</h4>
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{insights?.hookAnalysis || "Analyzing the first 3 seconds..."}</p>
            </div>
            
            <div className="bg-white/60 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50">
              <h4 className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">Content Summary</h4>
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{insights?.contentSummary || "Determining core content pillars..."}</p>
            </div>

            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl border border-indigo-100 dark:border-indigo-800/50 flex gap-4 items-start">
               <AlertCircle className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
               <div>
                 <h4 className="text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-300 font-semibold mb-1">Strategic Recommendation</h4>
                 <p className="text-indigo-900 dark:text-indigo-200 text-sm leading-relaxed">
                   {insights?.recommendation || "Formulating actionable advice based on view drop-offs..."}
                 </p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
