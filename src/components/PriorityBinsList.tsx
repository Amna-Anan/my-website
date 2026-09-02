import { AlertTriangle, MapPin, Clock, ArrowRight } from 'lucide-react';
import type { PriorityBin } from '@/types';
import { priorityBins } from '@/data';

function getFillColor(level: number): string {
  if (level >= 95) return 'bg-red-500';
  if (level >= 85) return 'bg-orange-500';
  if (level >= 70) return 'bg-amber-400';
  return 'bg-yellow-400';
}

function getTextColor(level: number): string {
  if (level >= 95) return 'text-red-600';
  if (level >= 85) return 'text-orange-600';
  if (level >= 70) return 'text-amber-600';
  return 'text-yellow-600';
}

function PriorityRow({ bin, index }: { bin: PriorityBin; index: number }) {
  return (
    <div
      className="group flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer animate-fade-in-up"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-50 text-red-500 shrink-0">
        <AlertTriangle className="w-4 h-4" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <p className="text-sm font-bold text-slate-900">{bin.location}</p>
          <span className="text-xs text-slate-300">•</span>
          <p className="text-xs text-slate-400">{bin.id}</p>
        </div>
        <p className="text-xs text-slate-400 mb-1">{bin.zone}</p>
        <p className="text-xs text-slate-500 truncate">{bin.reason}</p>
      </div>

      <div className="flex flex-col items-end gap-1 shrink-0">
        <span className={`text-lg font-bold ${getTextColor(bin.fillLevel)}`}>{bin.fillLevel}%</span>
        <div className="flex items-center gap-1 text-xs text-slate-400">
          <Clock className="w-3 h-3" />
          {bin.lastUpdated}
        </div>
      </div>

      <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden shrink-0">
        <div className={`h-full ${getFillColor(bin.fillLevel)} rounded-full`} style={{ width: `${bin.fillLevel}%` }} />
      </div>

      <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-500 group-hover:translate-x-1 transition-all shrink-0" />
    </div>
  );
}

export function PriorityBinsList() {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Priority Bins</h3>
          <p className="text-sm text-slate-400">Bins requiring immediate attention</p>
        </div>
        <span className="flex items-center gap-1.5 text-xs font-semibold text-red-500 px-3 py-1.5 bg-red-50 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          {priorityBins.length} urgent
        </span>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 p-3 space-y-1">
        {priorityBins.map((bin, i) => (
          <PriorityRow key={bin.id} bin={bin} index={i} />
        ))}
      </div>
    </section>
  );
}
