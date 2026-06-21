import { useState } from "react";
import { 
  createColumnHelper, 
  flexRender, 
  getCoreRowModel, 
  getSortedRowModel, 
  SortingState,
  useReactTable 
} from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpDown, Download, Search, Settings2 } from "lucide-react";
import { MOCK_DATA } from "@/lib/mockData";
import { VideoMetrics } from "@/lib/types";
import { formatNumber, formatPercent, getVideoEngagementRate } from "@/lib/calculations";
import { cn } from "@/lib/utils";

const columnHelper = createColumnHelper<VideoMetrics>();

const columns = [
  columnHelper.accessor('title', {
    header: 'Video Details',
    cell: info => (
      <div className="flex items-center gap-3">
        <div className="w-12 h-16 rounded overflow-hidden flex-shrink-0 bg-slate-200 dark:bg-slate-800">
          <img src={info.row.original.thumbnail} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-[200px] sm:max-w-xs">
          <p className="font-medium text-sm line-clamp-2 leading-snug">{info.getValue()}</p>
          <p className="text-xs text-slate-500 mt-1">{format(new Date(info.row.original.uploadDate), 'MMM d, yyyy')}</p>
        </div>
      </div>
    ),
  }),
  columnHelper.accessor('views', {
    header: ({ column }) => (
      <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-white">
        Views <ArrowUpDown className="w-3 h-3" />
      </button>
    ),
    cell: info => <span className="font-semibold">{formatNumber(info.getValue())}</span>,
  }),
  columnHelper.accessor(row => row.actions.likes, {
    id: 'likes',
    header: ({ column }) => <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-white">Likes <ArrowUpDown className="w-3 h-3" /></button>,
    cell: info => formatNumber(info.getValue()),
  }),
  columnHelper.accessor(row => getVideoEngagementRate(row), {
    id: 'engagement',
    header: ({ column }) => <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-white">ER % <ArrowUpDown className="w-3 h-3" /></button>,
    cell: info => {
      const val = info.getValue();
      const colorClass = val > 15 ? 'text-emerald-600 dark:text-emerald-400' : val > 10 ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400';
      return <span className={cn("font-medium", colorClass)}>{formatPercent(val)}</span>;
    },
  }),
  columnHelper.accessor('completionRate', {
    header: ({ column }) => <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-white">Watch % <ArrowUpDown className="w-3 h-3" /></button>,
    cell: info => <span className="font-mono text-sm">{formatPercent(info.getValue())}</span>,
  }),
  columnHelper.accessor(row => row.trafficSources.fyp, {
    id: 'fyp_traffic',
    header: ({ column }) => <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-white">FYP % <ArrowUpDown className="w-3 h-3" /></button>,
    cell: info => {
      const val = info.getValue();
      return (
        <div className="flex items-center gap-2">
           <div className="w-16 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
             <div className="h-full bg-[#FF2D55]" style={{ width: `${val}%` }} />
           </div>
           <span className="text-xs font-mono w-8">{val}%</span>
        </div>
      );
    },
  }),
];

export function Videos() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data: MOCK_DATA.videos,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">Videos & Content</h1>
          <p className="text-slate-500 mt-1">Detailed performance metrics for your recent posts.</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
             <Download className="w-4 h-4" /> Export CSV
           </button>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 flex-wrap">
           <div className="relative flex-1 max-w-sm">
             <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
             <input 
               type="text" 
               placeholder="Search video titles..." 
               value={globalFilter}
               onChange={(e) => setGlobalFilter(e.target.value)}
               className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-[#121212]/50 border border-slate-200 dark:border-slate-700/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF2D55]/20 focus:border-[#FF2D55] transition-all"
             />
           </div>
           <button className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
             <Settings2 className="w-4 h-4 text-slate-600 dark:text-slate-400" />
           </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50/50 dark:bg-slate-900/20 border-b border-slate-200 dark:border-slate-800">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id} className="px-5 py-4 font-medium whitespace-nowrap">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                  <th className="px-5 py-4 font-medium sticky right-0 bg-slate-50/50 dark:bg-slate-900/80 backdrop-blur-sm shadow-[-4px_0_12px_rgba(0,0,0,0.05)] text-center">Action</th>
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60">
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors group">
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-5 py-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                  <td className="px-5 py-3 sticky right-0 bg-white dark:bg-[#1a1a1a] group-hover:bg-slate-50/50 dark:group-hover:bg-slate-800/20 text-center">
                     <button className="text-[#FF2D55] text-xs font-medium px-3 py-1.5 rounded-md hover:bg-[#FF2D55]/10 transition-colors whitespace-nowrap">
                       Details
                     </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
