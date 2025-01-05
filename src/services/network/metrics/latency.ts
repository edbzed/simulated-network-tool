import { Node } from '../../../types/network';

export function calculateLatency(nodes: Node[]): number {
  if (nodes.length === 0) return 0;

  const totalLatency = nodes.reduce((sum, node) => {
    let baseLatency = Math.random() * 20 + 10;
    if (node.type === 'router') baseLatency += 5;
    if (node.type === 'switch') baseLatency += 2;
    const distanceLatency = Math.sqrt(node.x * node.x + node.y * node.y) / 20;
    return sum + baseLatency + distanceLatency;
  }, 0);

  return totalLatency / nodes.length;
}