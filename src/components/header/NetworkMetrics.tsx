import React from 'react';
import { Activity, Wifi, ArrowDownUp } from 'lucide-react';
import { NetworkMetrics as NetworkMetricsType } from '../../types/status';

interface NetworkMetricsProps {
  metrics: NetworkMetricsType;
}

export function NetworkMetrics({ metrics }: NetworkMetricsProps) {
  const getLatencyColor = (latency: number) => {
    if (latency <= 50) return 'text-green-600';
    if (latency <= 150) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPacketLossColor = (loss: number) => {
    if (loss <= 1) return 'text-green-600';
    if (loss <= 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="hidden lg:flex items-center gap-6 ml-6 pl-6 border-l border-gray-200">
      <div className="flex items-center gap-2">
        <Activity className="w-4 h-4 text-blue-600" />
        <span className={`text-sm font-medium ${getLatencyColor(metrics.latency)}`}>
          {metrics.latency.toFixed(1)}ms
        </span>
      </div>
      
      <div className="flex items-center gap-2">
        <Wifi className="w-4 h-4 text-blue-600" />
        <span className={`text-sm font-medium ${getPacketLossColor(metrics.packetLoss)}`}>
          {metrics.packetLoss.toFixed(1)}% loss
        </span>
      </div>
      
      <div className="flex items-center gap-2">
        <ArrowDownUp className="w-4 h-4 text-blue-600" />
        <span className="text-sm font-medium text-gray-600">
          {metrics.bandwidth.toFixed(1)} Mbps
        </span>
      </div>
    </div>
  );
}