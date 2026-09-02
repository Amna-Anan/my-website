import { Recycle, LayoutDashboard, MapPin, BarChart3, Settings, Leaf } from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onNavigate: (view: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'bins', label: 'Bin Status', icon: Recycle },
  { id: 'priority', label: 'Priority Bins', icon: MapPin },
  { id: 'routes', label: 'Route Optimization', icon: BarChart3 },
  { id: 'impact', label: 'Sustainability', icon: Leaf },
];

export function Sidebar({ activeView, onNavigate }: SidebarProps) {
  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 h-screen sticky top-0 shrink-0">
      <div className="flex items-center gap-3 px-6 h-20 border-b border-slate-200">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-teal-500 shadow-lg shadow-brand-500/30">
          <Recycle className="w-5 h-5 text-white" strokeWidth={2.5} />
        </div>
        <div>
          <h1 className="text-lg font-bold text-slate-900 leading-none tracking-tight">WasteRoute</h1>
          <p className="text-xs text-slate-400 mt-1 font-medium">Smart Collection</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Menu</p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                active
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Icon
                className={`w-5 h-5 transition-colors ${active ? 'text-brand-600' : 'text-slate-400 group-hover:text-slate-600'}`}
                strokeWidth={2}
              />
              {item.label}
              {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-500" />}
            </button>
          );
        })}
      </nav>

      <div className="px-4 py-4 border-t border-slate-200">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all duration-200">
          <Settings className="w-5 h-5 text-slate-400" strokeWidth={2} />
          Settings
        </button>
      </div>

      <div className="m-4 p-4 rounded-2xl bg-gradient-to-br from-brand-50 to-teal-50 border border-brand-100">
        <div className="flex items-center gap-2 mb-2">
          <Leaf className="w-4 h-4 text-brand-600" />
          <p className="text-xs font-semibold text-brand-700">Eco Score</p>
        </div>
        <p className="text-2xl font-bold text-slate-900">94<span className="text-sm text-slate-400 font-medium">/100</span></p>
        <div className="mt-2 h-1.5 bg-white rounded-full overflow-hidden">
          <div className="h-full w-[94%] bg-gradient-to-r from-brand-500 to-teal-500 rounded-full" />
        </div>
      </div>
    </aside>
  );
}
