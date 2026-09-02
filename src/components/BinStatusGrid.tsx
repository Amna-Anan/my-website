import { MapPin, Clock, Recycle, Apple, Trash2 } from 'lucide-react';
import type { Bin, BinStatus } from '@/types';
import { bins } from '@/data';

const statusConfig: Record<BinStatus, { label: string; barColor: string; textColor: string; bgColor: string; dotColor: string }> = {
  empty: { label: 'Empty', barColor: 'bg-slate-300', textColor: 'text-slate-500', bgColor: 'bg-slate-50', dotColor: 'bg-slate-400' },
  low: { label: 'Low', barColor: 'bg-brand-400', textColor: 'text-brand-600', bgColor: 'bg-brand-50', dotColor: 'bg-brand-500' },
  medium: { label: 'Medium', barColor: 'bg-yellow-400', textColor: 'text-yellow-600', bgColor: 'bg-yellow-50', dotColor: 'bg-yellow-500' },
  high: { label: 'High', barColor: 'bg-orange-400', textColor: 'text-orange-600', bgColor: 'bg-orange-50', dotColor: 'bg-orange-500' },
  critical: { label: 'Critical', barColor: 'bg-red-500', textColor: 'text-red-600', bgColor: 'bg-red-50', dotColor: 'bg-red-500' },
};

const typeIcon: Record<string, typeof Recycle> = {
  general: Trash2,
  recycling: Recycle,
  organic: Apple,
};

const typeLabel: Record<string, string> = {
  general: 'General Waste',
  recycling: 'Recycling',
  organic: 'Organic',
};

function BinCard({ bin, index }: { bin: Bin; index: number }) {
  const config = statusConfig[bin.status];
  const Icon = typeIcon[bin.type] ?? Trash2;

  return (
    <div
      className="group bg-white rounded-2xl p-5 border border-slate-200 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-500/5 transition-all duration-300 animate-fade-in-up"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${config.bgColor}`}>
            <Icon className={`w-5 h-5 ${config.textColor}`} strokeWidth={2} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">{bin.id}</p>
            <p className="text-xs text-slate-400">{typeLabel[bin.type]}</p>
          </div>
        </div>
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${config.bgColor}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${config.dotColor} animate-pulse`} />
          <span className={`text-xs font-semibold ${config.textColor}`}>{config.label}</span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-sm text-slate-600 mb-1">
        <MapPin className="w-3.5 h-3.5 text-slate-400" />
        <span className="font-medium">{bin.location}</span>
      </div>
      <p className="text-xs text-slate-400 mb-4 ml-5">{bin.zone}</p>

      <div className="mb-2">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-medium text-slate-400">Fill Level</span>
          <span className={`text-sm font-bold ${config.textColor}`}>{bin.fillLevel}%</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full ${config.barColor} rounded-full transition-all duration-500 ease-out group-hover:brightness-110`}
            style={{ width: `${bin.fillLevel}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Clock className="w-3.5 h-3.5" />
          {bin.lastUpdated}
        </div>
        <div className="text-xs text-slate-400">
          <span className="font-medium text-slate-600">{bin.distance}</span> km away
        </div>
      </div>
    </div>
  );
}

export function BinStatusGrid() {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Bin Status</h3>
          <p className="text-sm text-slate-400">Real-time fill levels across all collection points</p>
        </div>
        <span className="text-xs font-medium text-slate-400 px-3 py-1.5 bg-slate-100 rounded-full">{bins.length} bins tracked</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {bins.map((bin, i) => (
          <BinCard key={bin.id} bin={bin} index={i} />
        ))}
      </div>
    </section>
  );
}
