import React from 'react';

export function NetworkLegend() {
  return (
    <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm p-4 
                    rounded-lg shadow-lg text-sm space-y-3
                    border border-gray-100">
      <h3 className="font-semibold text-gray-900 mb-2">Network Status</h3>
      <div className="space-y-2.5">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-green-500
                        shadow-sm shadow-green-200" />
          <span className="text-gray-600">Node Online</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-400 to-red-500
                        shadow-sm shadow-red-200" />
          <span className="text-gray-600">Node Offline</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-0.5 w-8 bg-gradient-to-r from-blue-400 to-blue-500
                        shadow-sm shadow-blue-200" />
          <span className="text-gray-600">Active Connection</span>
        </div>
      </div>
    </div>
  );
}