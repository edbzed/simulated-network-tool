import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { ExampleList } from './ExampleList';

interface ExampleModalProps {
  onSelectExample?: (target: string, ports: string) => void;
}

export function ExampleModal({ onSelectExample }: ExampleModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (target: string, ports: string) => {
    onSelectExample?.(target, ports);
    setIsOpen(false);
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="text-blue-600 hover:text-blue-700 hover:underline 
                 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
      >
        View Examples
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Network Scan Examples"
      >
        <p className="text-sm text-gray-600">
          Select an example configuration to get started quickly. Click the copy icon to use an example.
        </p>

        <ExampleList onSelect={handleSelect} />
      </Modal>
    </div>
  );
}