import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { ImpactStats } from '@/components/ImpactStats';
import { BinStatusGrid } from '@/components/BinStatusGrid';
import { PriorityBinsList } from '@/components/PriorityBinsList';
import { RouteOptimization } from '@/components/RouteOptimization';
import { MapPlaceholder } from '@/components/MapPlaceholder';
import type { RouteInfo } from '@/types';

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [isGenerating, setIsGenerating] = useState(false);
  const [route, setRoute] = useState<RouteInfo | null>(null);

  const handleGenerateRoute = () => {
    setIsGenerating(true);
    setRoute(null);

    // Placeholder: this is where the Python route-optimization backend will be called.
    // The backend will return an optimized collection sequence, and we'll set it here.
    // For now, we simulate a brief delay so the UI can show a loading state.
    setTimeout(() => {
      setIsGenerating(false);
      // The route below is static placeholder data — NOT a real route calculation.
      // Replace this with the API response from the Python backend when connected.
      setRoute({
        totalDistance: 18.4,
        estimatedDuration: '1h 45m',
        binsToCollect: 7,
        fuelSaved: 4.2,
        co2Reduced: 9.8,
        generatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        steps: [
          { id: 's1', binId: 'BIN-007', order: 1, location: 'Greenfield Mall', zone: 'Zone C — Industrial', distance: 3.5, fillLevel: 98, estimatedTime: '09:15' },
          { id: 's2', binId: 'BIN-001', order: 2, location: 'Central Plaza', zone: 'Zone A — Downtown', distance: 1.2, fillLevel: 92, estimatedTime: '09:32' },
          { id: 's3', binId: 'BIN-005', order: 3, location: 'Harbor View Apartments', zone: 'Zone B — Park District', distance: 2.0, fillLevel: 88, estimatedTime: '09:48' },
          { id: 's4', binId: 'BIN-012', order: 4, location: 'Southport Marina', zone: 'Zone C — Industrial', distance: 5.2, fillLevel: 85, estimatedTime: '10:15' },
          { id: 's5', binId: 'BIN-002', order: 5, location: 'Riverside Park North', zone: 'Zone B — Park District', distance: 2.4, fillLevel: 78, estimatedTime: '10:35' },
          { id: 's6', binId: 'BIN-010', order: 6, location: 'Stadium Parking Lot C', zone: 'Zone D — Campus', distance: 4.8, fillLevel: 72, estimatedTime: '10:58' },
          { id: 's7', binId: 'BIN-003', order: 7, location: 'Market Street', zone: 'Zone A — Downtown', distance: 0.8, fillLevel: 65, estimatedTime: '11:20' },
        ],
      });
    }, 1500);
  };

  const handleNavigate = (view: string) => {
    setActiveView(view);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar activeView={activeView} onNavigate={handleNavigate} />

      <div className="flex-1 min-w-0">
        <Header
          onGenerateRoute={handleGenerateRoute}
          isGenerating={isGenerating}
          onMobileMenu={() => {}}
        />

        <main className="px-6 lg:px-8 py-6 space-y-8 max-w-[1600px] mx-auto">
          <ImpactStats />
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2 space-y-8">
              <BinStatusGrid />
            </div>
            <div className="space-y-8">
              <PriorityBinsList />
            </div>
          </div>
          <MapPlaceholder />
          <RouteOptimization route={route} isGenerating={isGenerating} />
        </main>

        <footer className="px-6 lg:px-8 py-6 border-t border-slate-200 mt-8">
          <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
            <p>WasteRoute — Smart Waste Collection Optimization</p>
            <p>Placeholder data — connect a Python route-optimization backend to enable live routing</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
