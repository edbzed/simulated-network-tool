import React, { useState, useCallback } from 'react';
import { Search } from 'lucide-react';
import { ScanOptions } from '../../types/network';
import { validateIP, validatePorts, ValidationResult } from '../../utils/validation';
import { ScanFormField } from './ScanFormField';

interface ScanFormProps {
  onScan: (options: ScanOptions) => void;
  isScanning: boolean;
}

export function ScanForm({ onScan, isScanning }: ScanFormProps) {
  const [target, setTarget] = useState('');
  const [ports, setPorts] = useState('');
  const [validation, setValidation] = useState<{
    ip: ValidationResult;
    ports: ValidationResult;
  }>({ ip: { isValid: true }, ports: { isValid: true } });

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    const ipValidation = validateIP(target);
    const portsValidation = validatePorts(ports);
    
    setValidation({ ip: ipValidation, ports: portsValidation });
    
    if (!ipValidation.isValid || !portsValidation.isValid) return;

    onScan({
      target: {
        ip: target,
        ports: ports || '1-1000',
      },
    });
  }, [target, ports, onScan]);

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-4">
      <div className="flex gap-4">
        <ScanFormField
          id="ip"
          label="Target IP or Network"
          value={target}
          onChange={setTarget}
          placeholder="192.168.1.0/24"
          disabled={isScanning}
          validation={validation.ip}
        />
        <ScanFormField
          id="ports"
          label="Ports"
          value={ports}
          onChange={setPorts}
          placeholder="80,443,8080 or 1-1000"
          disabled={isScanning}
          validation={validation.ports}
        />
        <div className="flex items-end">
          <button
            type="submit"
            disabled={isScanning || !target}
            className={`
              px-6 py-2 rounded-lg flex items-center gap-2 font-medium
              transition-all duration-300 transform hover:scale-105
              ${isScanning || !target
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200'
              }
            `}
          >
            <Search className={`w-5 h-5 ${isScanning ? 'animate-spin' : ''}`} />
            {isScanning ? 'Scanning...' : 'Scan'}
          </button>
        </div>
      </div>
    </form>
  );
}