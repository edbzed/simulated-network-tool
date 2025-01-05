import React from 'react';
import { X } from 'lucide-react';
import { ModalHeader } from './modal/ModalHeader';
import { ModalContent } from './modal/ModalContent';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md transform transition-all 
                    max-h-[calc(100vh-2rem)] flex flex-col overflow-hidden">
        <ModalHeader title={title} onClose={onClose} />
        <ModalContent>{children}</ModalContent>
      </div>
    </div>
  );
}