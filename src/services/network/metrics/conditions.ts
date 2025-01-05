import { NetworkMetrics } from '../../../types/status';

type NetworkCondition = 'normal' | 'degraded' | 'congested';

let networkCondition: NetworkCondition = 'normal';
let conditionChangeTime = Date.now();

// Change network conditions periodically
setInterval(() => {
  const conditions: NetworkCondition[] = ['normal', 'degraded', 'congested'];
  networkCondition = conditions[Math.floor(Math.random() * conditions.length)];
  conditionChangeTime = Date.now();
}, 30000 + Math.random() * 30000);

export function applyNetworkConditions(metrics: NetworkMetrics): NetworkMetrics {
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