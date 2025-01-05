import React from 'react';
import { Shield } from 'lucide-react';
import { Port } from '../../types/network';
import { StatusBadge } from '../ui/StatusBadge';

interface PortListProps {
  ports: Port[];
}

export function PortList({ ports }: PortListProps) {
  if (ports.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg">
        <p className="text-gray-500 italic">No ports detected</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {ports.map((port, index) => (
        <div 
          key={index} 
          className="flex items-center justify-between bg-gray-50 p-3 rounded-lg
                    hover:bg-gray-100 transition-all duration-300 group
                    hover:shadow-md"
        >
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-gray-200 rounded group-hover:bg-gray-300 
                          transition-colors duration-300">
              <Shield className="w-4 h-4 text-gray-600" />
            </div>
            <div>
              <span className="font-mono font-medium">{port.number}</span>
              <span className="text-gray-600 text-sm ml-2">({port.service})</span>
            </div>
          </div>
          <StatusBadge status={port.state} />
        </div>
      ))}
    </div>
  );
}