import { Map as MapIcon, Layers, Maximize2, MapPin } from 'lucide-react';
import { bins } from '@/data';

export function MapPlaceholder() {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Collection Map</h3>
          <p className="text-sm text-slate-400">Interactive map of all bin locations and active routes</p>
        </div>
      </div>

      <div className="relative bg-white rounded-2xl border border-slate-200 overflow-hidden h-[480px]">
        {/* Map background placeholder */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-brand-50/30 to-teal-50/40">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.5) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />
          {/* Simulated roads */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <path d="M 0 180 Q 200 160 400 200 T 800 180" fill="none" stroke="#cbd5e1" strokeWidth="3" opacity="0.5" />
            <path d="M 150 0 L 150 480" fill="none" stroke="#cbd5e1" strokeWidth="3" opacity="0.5" />
            <path d="M 500 0 Q 520 200 480 480" fill="none" stroke="#cbd5e1" strokeWidth="3" opacity="0.5" />
            <path d="M 0 340 L 800 320" fill="none" stroke="#cbd5e1" strokeWidth="2" opacity="0.4" />
          </svg>
        </div>

        {/* Bin markers */}
        {bins.slice(0, 8).map((bin, i) => {
          const left = 10 + (i * 11) % 80;
          const top = 15 + ((i * 23) % 70);
          const isCritical = bin.fillLevel >= 90;
          const isHigh = bin.fillLevel >= 75;
          const color = isCritical ? 'bg-red-500' : isHigh ? 'bg-orange-500' : 'bg-brand-500';
          const ringColor = isCritical ? 'ring-red-200' : isHigh ? 'ring-orange-200' : 'ring-brand-200';
          return (
            <div
              key={bin.id}
              className="absolute group"
              style={{ left: `${left}%`, top: `${top}%`, transform: 'translate(-50%, -50%)' }}
            >
              <div className={`relative w-4 h-4 rounded-full ${color} ring-4 ${ringColor} cursor-pointer transition-transform hover:scale-125`}>
                {isCritical && <div className={`absolute inset-0 rounded-full ${color} animate-ping opacity-60`} />}
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block whitespace-nowrap z-10">
                <div className="bg-slate-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-lg">
                  {bin.location} — {bin.fillLevel}%
                </div>
              </div>
            </div>
          );
        })}

        {/* Overlay controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button className="flex items-center justify-center w-10 h-10 bg-white rounded-xl shadow-md border border-slate-200 text-slate-500 hover:text-slate-900 hover:shadow-lg transition-all">
            <Layers className="w-4 h-4" />
          </button>
          <button className="flex items-center justify-center w-10 h-10 bg-white rounded-xl shadow-md border border-slate-200 text-slate-500 hover:text-slate-900 hover:shadow-lg transition-all">
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-md border border-slate-200 p-3 space-y-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Legend</p>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span className="w-3 h-3 rounded-full bg-red-500 ring-2 ring-red-200" />
            Critical (90%+)
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span className="w-3 h-3 rounded-full bg-orange-500 ring-2 ring-orange-200" />
            High (75%+)
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span className="w-3 h-3 rounded-full bg-brand-500 ring-2 ring-brand-200" />
            Normal
          </div>
        </div>

        {/* Reserved overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 border border-slate-200 shadow-lg flex items-center gap-3">
            <MapIcon className="w-5 h-5 text-slate-400" />
            <div>
              <p className="text-sm font-semibold text-slate-700">Interactive Map Reserved</p>
              <p className="text-xs text-slate-400">Connect a mapping library (e.g. Leaflet, Mapbox) to populate this area</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
