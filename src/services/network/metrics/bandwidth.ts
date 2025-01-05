import { Node } from '../../../types/network';

export function calculateBandwidth(nodes: Node[]): number {
  if (nodes.length === 0) return 0;

  const totalBandwidth = nodes.reduce((sum, node) => {
    let nodeBandwidth = 100;
    
    switch (node.type) {
      case 'router': nodeBandwidth = 1000; break;
      case 'switch': nodeBandwidth = 800; break;
      default: nodeBandwidth = 100 + Math.random() * 400;
    }
    
    const activeConnections = node.ports.filter(p => p.state === 'open').length;
    nodeBandwidth *= Math.max(0.3, 1 - (activeConnections * 0.1));
    
    return sum + nodeBandwidth;
  }, 0);

  return totalBandwidth / nodes.length;
}