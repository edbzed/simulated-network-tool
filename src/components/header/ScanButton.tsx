import React from 'react';
import { Square } from 'lucide-react';

interface StopScanButtonProps {
  scanning: boolean;
  onStop: () => void;
}

export function StopScanButton({ scanning, onStop }: StopScanButtonProps) {
  if (!scanning) return null;

  return (
    <button
      onClick={onStop}
      className="flex items-center gap-2 px-4 py-2 rounded-lg
                bg-red-600 hover:bg-red-700 text-white 
                shadow-lg shadow-red-200
                transition-all duration-300 transform hover:scale-105"
    >
      <Square className="w-5 h-5" fill="currentColor" />
      Stop Scan
    </button>
  );
}