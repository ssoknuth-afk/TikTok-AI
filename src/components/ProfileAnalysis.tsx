import { Users, Heart, Video, Activity, Sparkles, TrendingUp, BarChart3, Medal, ExternalLink, Download } from "lucide-react";

interface ProfileAnalysisProps {
  data: any;
  insights: any;
}

export function ProfileAnalysis({ data, insights }: ProfileAnalysisProps) {
  if (!data?.basic) return null;

  const getMetricCard = (title: string, value: string | number, icon: any, colorClass: string) => (
    <div className="glass-card p-5 hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{title}</p>
          <h4 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{value}</h4>
        </div>
        <div className={`p-2 rounded-lg ${colorClass}`}>
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Basic Hero */}
      <div className="glass-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4 relative">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center text-white text-xl font-bold shadow-md">
            {data.basic.displayName.charAt(0)}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              {data.basic.displayName}
              {data.basic.verified && <span className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 text-xs px-2 py-0.5 rounded-full">Verified</span>}
            </h2>
            <a href={`https://tiktok.com/${data.basic.username}`} target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-400 text-sm flex items-center gap-1 hover:underline">
              {data.basic.username} <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest">Monetization Score</p>
            <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{data.monetization.score}/10</p>
          </div>
        </div>
      </div>

      <p className="text-slate-700 dark:text-slate-300 px-2">{data.basic.bio}</p>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {getMetricCard("Followers", new Intl.NumberFormat('en-US', { notation: "compact", compactDisplay: "short" }).format(data.stats.followers), <Users className="w-5 h-5" />, "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400")}
        {getMetricCard("Total Likes", new Intl.NumberFormat('en-US', { notation: "compact", compactDisplay: "short" }).format(data.stats.totalLikes), <Heart className="w-5 h-5" />, "bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400")}
        {getMetricCard("Total Videos", data.stats.totalVideos, <Video className="w-5 h-5" />, "bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400")}
        {getMetricCard("Est. Monthly Earnings", data.monetization.potentialMonthlyEarning, <Activity className="w-5 h-5" />, "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400")}
      </div>

      {/* AI Insights & Growth */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2 glass-card p-6 space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
            <Sparkles className="w-32 h-32" />
          </div>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-indigo-500" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Gemini AI Strategy Insights</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            <div>
              <h4 className="text-sm border-b border-slate-200 dark:border-slate-700 pb-2 mb-3 font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Medal className="w-4 h-4 text-emerald-500" /> Core Strengths
              </h4>
              <ul className="space-y-2">
                {insights?.strengths?.map((s: string, idx: number) => (
                  <li key={idx} className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">•</span> {s}
                  </li>
                )) || <li className="text-sm text-slate-500 italic">Generating insights...</li>}
              </ul>
            </div>
            <div>
              <h4 className="text-sm border-b border-slate-200 dark:border-slate-700 pb-2 mb-3 font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-amber-500" /> Growth Recommendations
              </h4>
              <ul className="space-y-2">
                {insights?.growthRecommendations?.map((r: string, idx: number) => (
                  <li key={idx} className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span> {r}
                  </li>
                )) || <li className="text-sm text-slate-500 italic">Generating insights...</li>}
              </ul>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-100 dark:border-indigo-800/50">
             <p className="text-sm text-indigo-900 dark:text-indigo-200">
               <strong>Competitor Benchmark:</strong> {insights?.competitorBenchmark || "Calculating tier positioning relative to similar creators..."}
             </p>
          </div>
        </div>

        {/* Technical Data Side Panel */}
        <div className="glass-card p-6 space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Account Pipeline</h3>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Estimated Growth Rate</p>
              <p className="font-semibold text-slate-800 dark:text-slate-200">{data.growth.estimatedGrowthRate}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Posting Frequency</p>
              <p className="font-semibold text-slate-800 dark:text-slate-200">{data.growth.postingFrequency}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Account Age Tracked</p>
              <p className="font-semibold text-slate-800 dark:text-slate-200">{data.growth.accountAgeDays} days</p>
            </div>
            <div>
               <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Estimated RPM</p>
               <p className="font-mono text-emerald-600 dark:text-emerald-400">{data.monetization.estimatedRPM}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
