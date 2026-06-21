import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/utils";

interface CodeExportProps {
  data: any;
}

export function CodeExport({ data }: CodeExportProps) {
  const [copied, setCopied] = useState(false);
  const jsonString = JSON.stringify(data, null, 2);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jsonString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  return (
    <div className="mt-8 glass-card overflow-hidden">
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <h3 className="text-sm font-medium text-slate-200 font-mono">Developer API Output / JSON</h3>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <div className="p-4 bg-slate-950 overflow-x-auto max-h-96 overflow-y-auto">
        <pre className="text-xs text-slate-300 font-mono">
          {jsonString}
        </pre>
      </div>
    </div>
  );
}
