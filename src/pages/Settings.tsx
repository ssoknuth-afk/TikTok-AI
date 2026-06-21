import { useState } from "react";
import { User, Bell, Settings2, Download, Terminal, Save } from "lucide-react";
import { toast } from "sonner";
import { MOCK_DATA } from "@/lib/mockData";

export function Settings() {
  const [devMode, setDevMode] = useState(false);

  const handleSave = () => {
    toast.success("Settings saved successfully.");
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(MOCK_DATA, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", "tiklytics-export.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    toast.success("State exported successfully!");
  };

  return (
    <div className="space-y-8 pb-20 max-w-4xl">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">Settings</h1>
        <p className="text-slate-500 mt-1">Manage your account, preferences, and developer tools.</p>
      </div>

      <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm overflow-hidden">
         <div className="flex flex-col md:flex-row">
            {/* Nav */}
            <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 p-4 space-y-1">
               <button className="w-full flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white">
                 <User className="w-4 h-4" /> Profile
               </button>
               <button className="w-full flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                 <Settings2 className="w-4 h-4" /> Preferences
               </button>
               <button className="w-full flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                 <Bell className="w-4 h-4" /> Notifications
               </button>
               <button 
                  onClick={() => setDevMode(!devMode)}
                  className="w-full flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-xl text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
               >
                 <Terminal className="w-4 h-4" /> Developer Mode
               </button>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 md:p-8 space-y-6">
               <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">Profile Settings</h3>
               
               <div className="flex items-center gap-6">
                 <img src={MOCK_DATA.account.avatar} alt="Avatar" className="w-20 h-20 rounded-full border-2 border-slate-200 dark:border-slate-800" />
                 <div>
                   <button className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors mb-2">Change Avatar</button>
                   <p className="text-xs text-slate-500">JPG, GIF or PNG. 1MB max.</p>
                 </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                 <div>
                   <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">Display Name</label>
                   <input type="text" defaultValue={MOCK_DATA.account.displayName} className="w-full px-4 py-2 bg-slate-50 dark:bg-[#121212]/50 border border-slate-200 dark:border-slate-700/50 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF2D55]/20 focus:border-[#FF2D55] transition-all" />
                 </div>
                 <div>
                   <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">Username</label>
                   <input type="text" defaultValue={MOCK_DATA.account.username} className="w-full px-4 py-2 bg-slate-50 dark:bg-[#121212]/50 border border-slate-200 dark:border-slate-700/50 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF2D55]/20 focus:border-[#FF2D55] transition-all" />
                 </div>
               </div>

               <div className="pt-4 border-t border-slate-200 dark:border-slate-800 mt-6">
                 <button onClick={handleSave} className="px-6 py-2.5 bg-[#FF2D55] hover:bg-[#ff1a47] text-white rounded-xl font-medium transition-colors flex items-center gap-2">
                   <Save className="w-4 h-4" /> Save Changes
                 </button>
               </div>
            </div>
         </div>
      </div>

      {devMode && (
         <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4">
           <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-2 text-white">
               <Terminal className="w-5 h-5 text-[#FF2D55]" />
               <h3 className="text-xl font-semibold">Developer JSON State</h3>
             </div>
             <button onClick={handleExport} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2 text-emerald-400">
               <Download className="w-4 h-4" /> Export App State
             </button>
           </div>
           <p className="text-slate-400 text-sm mb-4">You can use this raw dump to hydrate an external database or debug pure calculate functions.</p>
           <pre className="bg-black/50 p-4 rounded-xl text-xs text-slate-300 font-mono h-96 overflow-auto border border-slate-800/50">
              {JSON.stringify(MOCK_DATA, null, 2)}
           </pre>
         </div>
      )}
    </div>
  );
}
