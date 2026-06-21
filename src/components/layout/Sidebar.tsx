import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart2, 
  Video, 
  Users, 
  PieChart, 
  TrendingUp, 
  Radio, 
  Sparkles, 
  Database, 
  Settings 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const NAV_ITEMS = [
  { name: 'Overview', path: '/', icon: BarChart2 },
  { name: 'Videos & Content', path: '/videos', icon: Video },
  { name: 'Audience Insights', path: '/audience', icon: Users },
  { name: 'Traffic Sources', path: '/traffic', icon: PieChart },
  { name: 'Growth Tracker', path: '/growth', icon: TrendingUp },
  { name: 'Live Analytics', path: '/live', icon: Radio },
  { name: 'AI Insights', path: '/ai-insights', icon: Sparkles },
  { name: 'Data Hub & APIs', path: '/data', icon: Database },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export function Sidebar() {
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <aside 
      className={cn(
        "fixed left-0 top-16 bottom-0 z-40 flex flex-col bg-slate-50/50 dark:bg-[#121212]/50 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 ease-in-out backdrop-blur-xl",
        isHovered ? "w-64" : "w-16 md:w-64"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1 scrollbar-hide">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
                isActive 
                  ? "bg-[#FF2D55]/10 text-[#FF2D55] dark:bg-[#FF2D55]/20 dark:text-[#FF2D55]" 
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-100"
              )}
            >
              <Icon className={cn("w-5 h-5 flex-shrink-0 transition-transform", isActive ? "scale-110" : "group-hover:scale-110")} />
              <span className={cn(
                "font-medium text-sm transition-opacity duration-200 whitespace-nowrap",
                !isHovered ? "opacity-0 md:opacity-100 hidden md:block" : "opacity-100 block"
              )}>
                {item.name}
              </span>
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#FF2D55] rounded-r-md" />
              )}
            </Link>
          );
        })}
      </div>
      
      <div className={cn(
        "p-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500",
        !isHovered ? "hidden md:block" : "block"
      )}>
        <p className="font-medium text-slate-600 dark:text-slate-400">Tiklytics Pro</p>
        <p>Dashboard v2.0</p>
      </div>
    </aside>
  );
}
