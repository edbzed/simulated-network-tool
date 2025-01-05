import React from 'react';
import { NetworkMetrics } from './NetworkMetrics';
import { NetworkMetrics as NetworkMetricsType } from '../../types/status';

interface ScanStatusProps {
  scanning: boolean;
  metrics: NetworkMetricsType;
}

export function ScanStatus({ scanning, metrics }: ScanStatusProps) {
  return (
    <div className="flex items-center">
      <div className="flex items-center gap-2">
        <div className={`
          w-2 h-2 rounded-full
          ${scanning ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}
          transition-colors duration-300
        `} />
        <span className="text-sm font-medium">
          {scanning ? 'Scanning...' : 'Idle'}
        </span>
      </div>
      
      <NetworkMetrics metrics={metrics} />
    </div>
  );
}