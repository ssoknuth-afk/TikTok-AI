import { Database, Code2, Upload, ExternalLink, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { MOCK_DATA } from "@/lib/mockData";
import { format } from "date-fns";

export function DataHub() {
  const handleConnect = (api: string) => {
    toast.success(`Successfully connected to ${api} API!`, {
      description: "Data will begin sinking in the background."
    });
  };

  const codeSnippet = `import { EchoTikClient } from '@echotik/sdk';
  
const client = new EchoTikClient({
  apiKey: process.env.ECHOTIK_API_KEY
});

// Fetch historical Live Analytics
const liveData = await client.creators.getLiveSessions({
  userId: 'codecraft_alex',
  dateRange: 'last90days'
});

console.log(liveData);`;

  return (
    <div className="space-y-8 pb-20">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">Data Hub & APIs</h1>
        <p className="text-slate-500 mt-1">Manage connections to official TikTok OAuth, third-party scrapers, and raw JSON exports.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
           <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-slate-200 dark:border-slate-800/60 p-6 shadow-sm">
             <div className="flex items-center justify-between mb-4">
               <h3 className="text-lg font-semibold flex items-center gap-2">Official TikTok API</h3>
               <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-xs px-2 py-1 rounded font-medium flex items-center gap-1">
                 <CheckCircle2 className="w-3 h-3" /> Connected
               </span>
             </div>
             <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
               Uses standard OAuth 2.0. Good for basic metrics: views, likes, shares, comments, audience demographics (age, gender, location), and traffic sources. 
               Last synced: <span className="font-medium text-slate-900 dark:text-white">{format(new Date(MOCK_DATA.lastUpdated), 'h:mm a, MMM d')}</span>.
             </p>
             <button onClick={() => handleConnect('TikTok')} className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-xl font-medium transition-colors text-sm">
               Re-Authenticate
             </button>
           </div>

           <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-slate-200 dark:border-slate-800/60 p-6 shadow-sm">
             <div className="flex items-center justify-between mb-4">
               <h3 className="text-lg font-semibold flex items-center gap-2">EchoTik API</h3>
               <span className="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 text-xs px-2 py-1 rounded font-medium">
                 Not Configured
               </span>
             </div>
             <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
               For multi-channel ops. Covers advanced content trends, rankings, full comment sentiment analysis, and <strong>real-time live stream data</strong> (peak viewers, GMV, follower growth during live).
             </p>
             <button onClick={() => handleConnect('EchoTik')} className="w-full py-2.5 bg-black text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-slate-200 rounded-xl font-medium transition-colors text-sm">
               Connect EchoTik Integration
             </button>
           </div>

           <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-slate-200 dark:border-slate-800/60 p-6 shadow-sm">
             <div className="flex items-center justify-between mb-4">
               <h3 className="text-lg font-semibold flex items-center gap-2">SociaVault / Apify</h3>
               <span className="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 text-xs px-2 py-1 rounded font-medium">
                 Not Configured
               </span>
             </div>
             <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
               Third-party scraper APIs that handle extensive scale rate limits and IP rotation for monitoring competitors or mass querying hashtags.
             </p>
             <a href="https://apify.com" target="_blank" rel="noreferrer" className="w-full py-2.5 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-900 dark:text-white rounded-xl font-medium transition-colors text-sm flex items-center justify-center gap-2">
               View Documentation <ExternalLink className="w-4 h-4" />
             </a>
           </div>
        </div>

        <div className="space-y-6">
           <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-sm overflow-hidden">
             <div className="flex items-center gap-2 mb-4">
               <Code2 className="w-5 h-5 text-blue-400" />
               <h3 className="text-lg font-semibold text-white">Developer Example</h3>
             </div>
             <p className="text-slate-400 text-sm mb-4">How to pull Live Stream data via SDK to hydrate the dash.</p>
             <pre className="bg-black/50 p-4 rounded-xl text-xs text-blue-200 font-mono overflow-x-auto leading-relaxed">
               {codeSnippet}
             </pre>
           </div>

           <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors cursor-pointer group">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full mb-4 group-hover:scale-110 transition-transform">
                <Upload className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Manual Data Upload</h3>
              <p className="text-sm text-slate-500 max-w-sm">
                Don't have API access? Drag & drop a raw .JSON or .CSV export from TikTok Analytics here to hydrate the dashboard client-side.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
