import { Route as RouteIcon, Clock, MapPin, Fuel, Leaf, Navigation2, Check } from 'lucide-react';
import type { RouteInfo } from '@/types';

interface RouteOptimizationProps {
  route: RouteInfo | null;
  isGenerating: boolean;
}

function StatPill({ icon: Icon, label, value, color }: { icon: typeof Clock; label: string; value: string; color: string }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 border border-slate-100">
      <div className={`flex items-center justify-center w-9 h-9 rounded-lg ${color}`}>
        <Icon className="w-4 h-4" strokeWidth={2} />
      </div>
      <div>
        <p className="text-xs text-slate-400 font-medium">{label}</p>
        <p className="text-sm font-bold text-slate-900">{value}</p>
      </div>
    </div>
  );
}

export function RouteOptimization({ route, isGenerating }: RouteOptimizationProps) {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Route Optimization</h3>
          <p className="text-sm text-slate-400">
            {route ? `Generated at ${route.generatedAt}` : 'Click "Generate Optimized Route" to compute an efficient collection path'}
          </p>
        </div>
        {route && (
          <span className="flex items-center gap-1.5 text-xs font-semibold text-brand-600 px-3 py-1.5 bg-brand-50 rounded-full">
            <Check className="w-3.5 h-3.5" />
            Active
          </span>
        )}
      </div>

      {!route && !isGenerating && (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-50 mb-4">
            <RouteIcon className="w-8 h-8 text-slate-300" strokeWidth={1.5} />
          </div>
          <p className="text-base font-semibold text-slate-700 mb-1">No route generated yet</p>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Use the "Generate Optimized Route" button above to create an efficient collection sequence based on bin priority and proximity.
          </p>
        </div>
      )}

      {isGenerating && (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-50 mb-4">
            <RouteIcon className="w-8 h-8 text-brand-500 animate-pulse" strokeWidth={1.5} />
          </div>
          <p className="text-base font-semibold text-slate-700 mb-1">Computing optimal route...</p>
          <p className="text-sm text-slate-400">Analyzing bin priorities, distances, and collection efficiency</p>
        </div>
      )}

      {route && !isGenerating && (
        <div className="space-y-4 animate-fade-in">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatPill icon={Navigation2} label="Total Distance" value={`${route.totalDistance} km`} color="bg-teal-50 text-teal-600" />
            <StatPill icon={Clock} label="Est. Duration" value={route.estimatedDuration} color="bg-brand-50 text-brand-600" />
            <StatPill icon={Fuel} label="Fuel Saved" value={`${route.fuelSaved} L`} color="bg-teal-50 text-teal-600" />
            <StatPill icon={Leaf} label="CO₂ Reduced" value={`${route.co2Reduced} kg`} color="bg-brand-50 text-brand-600" />
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-slate-900">Collection Sequence</h4>
              <span className="text-xs text-slate-400">{route.binsToCollect} stops</span>
            </div>
            <div className="space-y-1">
              {route.steps.map((step, i) => (
                <div key={step.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors animate-slide-in" style={{ animationDelay: `${i * 50}ms` }}>
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-teal-500 text-white text-sm font-bold shrink-0">
                    {step.order}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900">{step.location}</p>
                    <p className="text-xs text-slate-400">{step.zone}</p>
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400">
                    <MapPin className="w-3.5 h-3.5" />
                    {step.distance} km
                  </div>
                  <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    {step.estimatedTime}
                  </div>
                  <span className="text-sm font-bold text-slate-700">{step.fillLevel}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
