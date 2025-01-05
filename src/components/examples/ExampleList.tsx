import React from 'react';
import { ExampleCard } from './ExampleCard';
import { scanExamples } from './data/scanExamples';

interface ExampleListProps {
  onSelect: (target: string, ports: string) => void;
}

export function ExampleList({ onSelect }: ExampleListProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:gap-4 overflow-y-auto overscroll-contain">
      {scanExamples.map((example, index) => (
        <ExampleCard
          key={index}
          example={example}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}