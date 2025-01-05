import React from 'react';
import { X } from 'lucide-react';

interface ModalHeaderProps {
  title: string;
  onClose: () => void;
}

export function ModalHeader({ title, onClose }: ModalHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b shrink-0">
      <h3 className="text-lg font-semibold text-gray-900 pr-8 truncate">{title}</h3>
      <button
        onClick={onClose}
        className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100 
                 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <X className="w-5 h-5 text-gray-500" />
      </button>
    </div>
  );
}