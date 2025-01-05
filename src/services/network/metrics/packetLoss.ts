import { Node } from '../../../types/network';

export function calculatePacketLoss(activeNodes: Node[], totalNodes: number): number {
  if (totalNodes === 0) return 0;
  
  const downNodesLoss = ((totalNodes - activeNodes.length) / totalNodes) * 100;
  const activeLoss = activeNodes.reduce((sum, node) => {
    let baseLoss = Math.random() * 0.5;
    if (node.ports.filter(p => p.state === 'open').length > 5) {
      baseLoss += 0.3;
    }
    return sum + baseLoss;
  }, 0) / (activeNodes.length || 1);

  return (activeLoss * 0.7) + (downNodesLoss * 0.3);
}