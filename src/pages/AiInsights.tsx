import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Zap, Target, Search, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { MOCK_DATA } from "@/lib/mockData";
import { getAggregatedTrafficSources } from "@/lib/calculations";

export function AiInsights() {
  const traffic = getAggregatedTrafficSources(MOCK_DATA);
  const fypPercentage = traffic.fyp.toFixed(1);

  const insights = [
    {
      id: 1,
      title: "Algorithm loves your hooks",
      desc: `Your FYP traffic is ${fypPercentage}% — the algorithm is heavily distributing you. Double down on first-3-second visual hooks like you did in the CSS Grid video.`,
      icon: Zap,
      color: "text-amber-500",
      bg: "bg-amber-100 dark:bg-amber-500/20",
    },
    {
      id: 2,
      title: "Untapped SEO Potential",
      desc: "Your search traffic is only 8.2%. To build compounding passive views, start adding highly searched developer keywords (e.g. 'Next.js 15 tutorial') strictly in your first 2 lines of caption.",
      icon: Search,
      color: "text-blue-500",
      bg: "bg-blue-100 dark:bg-blue-500/20",
    },
    {
      id: 3,
      title: "Optimal Posting Time Shift",
      desc: "Based on watch completion rates, your evening uploads (after 5 PM EST) retain viewers 12% longer than morning uploads. Shift your schedule.",
      icon: Clock,
      color: "text-indigo-500",
      bg: "bg-indigo-100 dark:bg-indigo-500/20",
    },
    {
      id: 4,
      title: "Strong Niche Authority",
      desc: "Your audience retention drops drastically on non-coding (lifestyle) videos. Stick to hard technical tutorials and software engineering rants for maximum velocity.",
      icon: Target,
      color: "text-emerald-500",
      bg: "bg-emerald-100 dark:bg-emerald-500/20",
    }
  ];

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
           <div className="flex items-center gap-2 mb-2">
             <div className="p-1.5 rounded-md bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
               <Sparkles className="w-5 h-5" />
             </div>
             <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">AI Strategy</h1>
           </div>
           <p className="text-slate-500">Automated machine-learning observations based on your 90-day data layer.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {insights.map((insight, i) => {
           const Icon = insight.icon;
           return (
             <motion.div 
               key={insight.id}
               initial={{ opacity: 0, scale: 0.98, y: 10 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-slate-200 dark:border-slate-800/60 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col"
             >
                <div className="flex items-start gap-4 mb-4">
                   <div className={cn("p-3 rounded-xl flex-shrink-0", insight.bg, insight.color)}>
                     <Icon className="w-6 h-6" />
                   </div>
                   <div>
                     <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 leading-tight">{insight.title}</h3>
                     <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{insight.desc}</p>
                   </div>
                </div>
                <div className="mt-auto pt-4 flex justify-end">
                   <Link to="/videos" className="text-sm font-medium text-[#FF2D55] hover:text-[#ff1a47] flex items-center gap-1">
                     Filter Related Videos <ArrowRight className="w-4 h-4" />
                   </Link>
                </div>
             </motion.div>
           )
        })}
      </div>
    </div>
  );
}
