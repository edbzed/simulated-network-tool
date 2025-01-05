import React from 'react';
import { Network } from 'lucide-react';
import { ScanStatus } from './header/ScanStatus';
import { StopScanButton } from './header/StopScanButton';
import { NetworkMetrics } from '../types/status';

interface HeaderProps {
  scanning: boolean;
  onStopScan: () => void;
  nodeCount: number;
  metrics: NetworkMetrics;
}

export function Header({ scanning, onStopScan, nodeCount, metrics }: HeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8 bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-blue-50 rounded-lg">
          <Network className="w-8 h-8 text-blue-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Network Topology Scanner</h1>
          <div className="flex items-center gap-3 mt-1">
            <p className="text-gray-600">Monitoring {nodeCount} nodes</p>
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
            <ScanStatus scanning={scanning} metrics={metrics} />
          </div>
        </div>
      </div>
      <StopScanButton scanning={scanning} onStop={onStopScan} />
    </div>
  );
}