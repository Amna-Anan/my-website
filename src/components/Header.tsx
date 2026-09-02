import { Search, Bell, Menu, Zap } from 'lucide-react';

interface HeaderProps {
  onGenerateRoute: () => void;
  isGenerating: boolean;
  onMobileMenu: () => void;
}

export function Header({ onGenerateRoute, isGenerating, onMobileMenu }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200">
      <div className="flex items-center justify-between gap-4 px-6 lg:px-8 h-20">
        <div className="flex items-center gap-4">
          <button
            onClick={onMobileMenu}
            className="lg:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Dashboard</h2>
            <p className="text-sm text-slate-400 hidden sm:block">Live overview of your collection network</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 w-64">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search bins, zones..."
              className="bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none w-full"
            />
          </div>

          <button className="relative p-2.5 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>

          <button
            onClick={onGenerateRoute}
            disabled={isGenerating}
            className="group flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-teal-600 text-white text-sm font-semibold shadow-lg shadow-brand-500/30 hover:shadow-xl hover:shadow-brand-500/40 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            <Zap className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} fill={isGenerating ? 'none' : 'currentColor'} />
            <span className="hidden sm:inline">{isGenerating ? 'Generating...' : 'Generate Optimized Route'}</span>
            <span className="sm:hidden">{isGenerating ? '...' : 'Generate'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
