import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { ScanOptions } from '../types/network';
import { ExampleModal } from './examples/ExampleModal';

interface ScanFormProps {
  onScan: (options: ScanOptions) => void;
  isScanning: boolean;
}

export function ScanForm({ onScan, isScanning }: ScanFormProps) {
  const [target, setTarget] = useState('');
  const [ports, setPorts] = useState('');

  const handleExampleSelect = (target: string, ports: string) => {
    setTarget(target);
    setPorts(ports);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!target) return;

    onScan({
      target: {
        ip: target,
        ports: ports || '1-1000',
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 sm:p-6 rounded-lg shadow-lg space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="ip" className="block text-sm font-medium text-gray-700 mb-1">
            Target IP or Network
          </label>
          <input
            type="text"
            id="ip"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="192.168.1.0/24"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={isScanning}
          />
        </div>
        <div className="w-full sm:w-48">
          <label htmlFor="ports" className="block text-sm font-medium text-gray-700 mb-1">
            Ports
          </label>
          <input
            type="text"
            id="ports"
            value={ports}
            onChange={(e) => setPorts(e.target.value)}
            placeholder="80,443,8080"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={isScanning}
          />
        </div>
        <div className="flex sm:items-end">
          <button
            type="submit"
            disabled={isScanning || !target}
            className={`
              w-full sm:w-auto px-6 py-2 rounded-lg flex items-center justify-center gap-2
              ${isScanning || !target
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200'
              }
              transition-all duration-300
            `}
          >
            <Search className="w-5 h-5" />
            <span>Scan</span>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span>Need help?</span>
        <ExampleModal onSelectExample={handleExampleSelect} />
      </div>
    </form>
  );
}