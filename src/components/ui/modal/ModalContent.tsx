import React from 'react';

interface ModalContentProps {
  children: React.ReactNode;
}

export function ModalContent({ children }: ModalContentProps) {
  return (
    <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-4 
                    scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
      {children}
    </div>
  );
}