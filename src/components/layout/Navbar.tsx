import { Bell, ChevronDown, Calendar, Moon, Sun, Monitor } from 'lucide-react';
import { MOCK_DATA } from '@/lib/mockData';
import { useTheme } from '@/hooks/useTheme';

export function Navbar() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 dark:bg-[#121212]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-50 flex items-center justify-between px-4">
      <div className="flex items-center gap-2 w-16 md:w-64 flex-shrink-0">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#FF2D55] to-[#FF4D6D] flex items-center justify-center shadow-lg shadow-[#FF2D55]/20">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M9 12v-8h4a4 4 0 0 0 4 4v4"/>
            <path d="M13 12a4 4 0 0 1-8 0v-4"/>
          </svg>
        </div>
        <div className="hidden md:block">
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white leading-none">Tiklytics</h1>
          <p className="text-[10px] text-slate-500 font-medium tracking-wider uppercase">Insights &rarr; Growth</p>
        </div>
      </div>

      <div className="flex items-center gap-4 flex-1 justify-end">
        
        {/* Global Date Range */}
        <div className="hidden sm:flex items-center gap-2 bg-slate-100 dark:bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
          <Calendar className="w-4 h-4 text-slate-500" />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Last 90 Days</span>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </div>

        {/* Theme Toggle */}
        <div className="flex bg-slate-100 dark:bg-slate-800/80 rounded-full p-1 border border-slate-200 dark:border-slate-700">
           <button onClick={() => setTheme("light")} className={`p-1.5 rounded-full transition-all ${theme === 'light' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}><Sun className="w-4 h-4" /></button>
           <button onClick={() => setTheme("system")} className={`p-1.5 rounded-full transition-all hidden sm:block ${theme === 'system' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}><Monitor className="w-4 h-4" /></button>
           <button onClick={() => setTheme("dark")} className={`p-1.5 rounded-full transition-all ${theme === 'dark' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}><Moon className="w-4 h-4" /></button>
        </div>

        {/* Notifications */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <Bell className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#FF2D55] rounded-full border border-white dark:border-[#121212]"></span>
        </button>

        {/* Account Switcher */}
        <div className="flex items-center gap-2 pl-4 border-l border-slate-200 dark:border-slate-800 cursor-pointer group">
          <img src={MOCK_DATA.account.avatar} alt="Avatar" className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700" />
          <div className="hidden lg:block text-sm">
            <p className="font-semibold text-slate-900 dark:text-slate-100 leading-tight">{MOCK_DATA.account.displayName}</p>
            <p className="text-xs text-slate-500">{MOCK_DATA.account.username}</p>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 hidden lg:block transition-colors" />
        </div>
      </div>
    </header>
  );
}
