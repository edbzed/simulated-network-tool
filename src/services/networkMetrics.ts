import { Node } from '../types/network';
import { NetworkMetrics } from '../types/status';

const NETWORK_CONDITIONS = ['normal', 'degraded', 'congested'] as const;
type NetworkCondition = typeof NETWORK_CONDITIONS[number];

let networkCondition: NetworkCondition = 'normal';
let conditionChangeTime = Date.now();

// Change network conditions periodically
setInterval(() => {
  networkCondition = NETWORK_CONDITIONS[Math.floor(Math.random() * NETWORK_CONDITIONS.length)];
  conditionChangeTime = Date.now();
}, 30000 + Math.random() * 30000);

function calculateLatency(nodes: Node[]): number {
  const activeNodes = nodes.filter(node => node.status === 'up');
  if (activeNodes.length === 0) return 0;

  const totalLatency = activeNodes.reduce((sum, node) => {
    let baseLatency = Math.random() * 20 + 10;
    if (node.type === 'router') baseLatency += 5;
    if (node.type === 'switch') baseLatency += 2;
    const distanceLatency = Math.sqrt(node.x * node.x + node.y * node.y) / 20;
    return sum + baseLatency + distanceLatency;
  }, 0);

  return totalLatency / activeNodes.length;
}

function calculatePacketLoss(activeNodes: Node[], totalNodes: number): number {
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

function calculateBandwidth(activeNodes: Node[]): number {
  if (activeNodes.length === 0) return 0;

  const totalBandwidth = activeNodes.reduce((sum, node) => {
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

  return totalBandwidth / activeNodes.length;
}

function applyNetworkConditions(metrics: NetworkMetrics): NetworkMetrics {
  const timeSinceChange = (Date.now() - conditionChangeTime) / 1000;
  const transitionFactor = Math.min(1, timeSinceChange / 5);

  switch (networkCondition) {
    case 'degraded':
      return {
        latency: metrics.latency * (1 + 0.5 * transitionFactor),
        packetLoss: metrics.packetLoss * (1 + 1 * transitionFactor),
        bandwidth: metrics.bandwidth * (1 - 0.3 * transitionFactor),
        lastUpdate: metrics.lastUpdate
      };
    case 'congested':
      return {
        latency: metrics.latency * (1 + 2 * transitionFactor),
        packetLoss: metrics.packetLoss * (1 + 3 * transitionFactor),
        bandwidth: metrics.bandwidth * (1 - 0.7 * transitionFactor),
        lastUpdate: metrics.lastUpdate
      };
    default:
      return metrics;
  }
}

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