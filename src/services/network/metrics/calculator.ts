import { Node } from '../../../types/network';
import { NetworkMetrics } from '../../../types/status';
import { calculateLatency } from './latency';
import { calculatePacketLoss } from './packetLoss';
import { calculateBandwidth } from './bandwidth';
import { applyNetworkConditions } from './conditions';

export function generateMetrics(nodes: Node[]): NetworkMetrics {
  if (nodes.length === 0) {
    return {
      latency: 0,
      packetLoss: 0,
      bandwidth: 0,
      lastUpdate: new Date()
    };
  }

  const activeNodes = nodes.filter(node => node.status === 'up');
  
  const baseMetrics = {
    latency: calculateLatency(activeNodes),
    packetLoss: calculatePacketLoss(activeNodes, nodes.length),
    bandwidth: calculateBandwidth(activeNodes),
    lastUpdate: new Date()
  };

  return applyNetworkConditions(baseMetrics);
}