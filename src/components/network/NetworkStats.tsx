import React from 'react';
import { Node } from '../../types/network';

interface NetworkStatsProps {
  nodes: Node[];
}

export function NetworkStats({ nodes }: NetworkStatsProps) {
  const stats = {
    total: nodes.length,
    up: nodes.filter(n => n.status === 'up').length,
    down: nodes.filter(n => n.status === 'down').length,
    openPorts: nodes.reduce((acc, node) => 
      acc + node.ports.filter(p => p.state === 'open').length, 0
    ),
  };

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {[
        { label: 'Total Hosts', value: stats.total, color: 'blue' },
        { label: 'Hosts Up', value: stats.up, color: 'green' },
        { label: 'Hosts Down', value: stats.down, color: 'red' },
        { label: 'Open Ports', value: stats.openPorts, color: 'yellow' },
      ].map(({ label, value, color }) => (
        <div 
          key={label} 
          className={`
            bg-${color}-50 border border-${color}-100 rounded-lg p-4
            hover:shadow-md transition-shadow duration-200
          `}
        >
          <div className={`text-${color}-800 text-2xl font-bold`}>
            {value}
          </div>
          <div className={`text-${color}-600 text-sm`}>
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}