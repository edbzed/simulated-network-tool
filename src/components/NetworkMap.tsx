import React from 'react';
import { Node, Connection } from '../types/network';
import { NetworkCanvas } from './visualization/NetworkCanvas';
import { NetworkLegend } from './visualization/NetworkLegend';

interface NetworkMapProps {
  nodes: Node[];
  connections: Connection[];
  onNodeSelect?: (node: Node) => void;
}

export function NetworkMap({ nodes, connections, onNodeSelect }: NetworkMapProps) {
  return (
    <div className="relative">
      <NetworkCanvas
        nodes={nodes}
        connections={connections}
        onNodeSelect={onNodeSelect}
      />
      <NetworkLegend />
    </div>
  );
}