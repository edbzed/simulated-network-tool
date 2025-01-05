import React from 'react';
import { Wifi } from 'lucide-react';

interface NetworkStatsProps {
  responseTime: number;
  packetLoss: number;
}

export function NetworkStats({ responseTime, packetLoss }: NetworkStatsProps) {
  return (
    <div className="border-t pt-4">
      <h3 className="text-lg font-medium flex items-center gap-2 mb-3">
        <Wifi className="w-5 h-5 text-blue-600" />
        Network Status
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors">
          <div className="text-sm text-gray-600">Response Time</div>
          <div className="font-medium">
            {responseTime}
            <span className="text-sm text-gray-500 ml-1">ms</span>
          </div>
          <div className="mt-1 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(responseTime, 100)}%` }}
            />
          </div>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors">
          <div className="text-sm text-gray-600">Packet Loss</div>
          <div className="font-medium">
            {packetLoss}
            <span className="text-sm text-gray-500 ml-1">%</span>
          </div>
          <div className="mt-1 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-red-500 rounded-full transition-all duration-500"
              style={{ width: `${packetLoss * 20}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}