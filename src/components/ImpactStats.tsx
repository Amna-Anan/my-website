import { Leaf, Fuel, Route, Trash2, TrendingUp } from 'lucide-react';
import type { ImpactMetric } from '@/types';
import { impactMetrics } from '@/data';

const iconMap: Record<string, typeof Leaf> = {
  Leaf,
  Fuel,
  Route,
  Trash2,
};

function formatValue(value: number): string {
  if (value >= 1000) return (value / 1000).toFixed(1) + 'k';
  return value.toLocaleString();
}

function MetricCard({ metric, index }: { metric: ImpactMetric; index: number }) {
  const Icon = iconMap[metric.icon] ?? Leaf;
  const isTeal = metric.color === 'teal';

  return (
    <div
      className="group relative bg-white rounded-2xl p-5 border border-slate-200 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-500/5 transition-all duration-300 animate-fade-in-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={`flex items-center justify-center w-12 h-12 rounded-xl transition-transform duration-300 group-hover:scale-110 ${
            isTeal ? 'bg-teal-50 text-teal-600' : 'bg-brand-50 text-brand-600'
          }`}
        >
          <Icon className="w-6 h-6" strokeWidth={2} />
        </div>
        <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-semibold">
          <TrendingUp className="w-3 h-3" />
          {metric.trend}%
        </div>
      </div>
      <p className="text-sm text-slate-400 font-medium mb-1">{metric.label}</p>
      <div className="flex items-baseline gap-1.5">
        <span className="text-3xl font-bold text-slate-900 tracking-tight">{formatValue(metric.value)}</span>
        <span className="text-sm text-slate-400 font-medium">{metric.unit}</span>
      </div>
    </div>
  );
}

export function ImpactStats() {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Sustainability Impact</h3>
          <p className="text-sm text-slate-400">Cumulative environmental savings</p>
        </div>
        <span className="text-xs font-medium text-slate-400 px-3 py-1.5 bg-slate-100 rounded-full">Last 30 days</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {impactMetrics.map((metric, i) => (
          <MetricCard key={metric.id} metric={metric} index={i} />
        ))}
      </div>
    </section>
  );
}
