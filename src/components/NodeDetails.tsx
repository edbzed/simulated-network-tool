import React from 'react';
import { Node } from '../types/network';
import { Activity, Server } from 'lucide-react';
import { StatusBadge } from './ui/StatusBadge';
import { PortList } from './details/PortList';
import { NetworkStats } from './details/NetworkStats';

interface NodeDetailsProps {
  node: Node | null;
}

export function NodeDetails({ node }: NodeDetailsProps) {
  if (!node) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg h-full flex items-center justify-center text-gray-500">
        Select a node to view details
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-blue-50 rounded-lg">
          <Server className="w-6 h-6 text-blue-600" />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            {node.ip}
            <StatusBadge status={node.status} />
          </h2>
          <p className="text-gray-600">Type: {node.type}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="border-t pt-4">
          <h3 className="text-lg font-medium flex items-center gap-2 mb-3">
            <Activity className="w-5 h-5 text-blue-600" />
            Port Analysis
          </h3>
          <PortList ports={node.ports} />
        </div>

        <NetworkStats 
          responseTime={Math.random() * 100 | 0}
          packetLoss={Math.random() * 5 | 0}
        />
      </div>
    </div>
  );
}