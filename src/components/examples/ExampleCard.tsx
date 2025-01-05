import React from 'react';
import { Copy } from 'lucide-react';
import { ScanExample } from './data/scanExamples';

interface ExampleCardProps {
  example: ScanExample;
  onSelect: (target: string, ports: string) => void;
}

export function ExampleCard({ example, onSelect }: ExampleCardProps) {
  return (
    <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200 hover:border-blue-300 
                    transition-colors overflow-hidden">
      <div className="flex justify-between items-start mb-2 gap-2">
        <h4 className="font-medium text-gray-900 truncate">{example.title}</h4>
        <button
          onClick={() => onSelect(example.target, example.ports)}
          className="p-1.5 rounded-md hover:bg-blue-50 text-blue-600 transition-colors shrink-0"
          title="Use this example"
        >
          <Copy className="w-4 h-4" />
        </button>
      </div>
      
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{example.description}</p>
      
      <div className="bg-gray-50 p-2 rounded-md font-mono text-xs sm:text-sm mb-3">
        <div className="overflow-x-auto">
          <p className="mb-1 whitespace-normal break-words">
            <span className="text-gray-500">Target:</span> {example.target}
          </p>
          <p className="whitespace-normal break-words">
            <span className="text-gray-500">Ports:</span> {example.ports}
          </p>
        </div>
      </div>
      
      <p className="text-xs text-gray-500 line-clamp-2">{example.explanation}</p>
    </div>
  );
}