import { useState, useEffect, useCallback } from 'react';
import { Node } from '../types/network';
import { NetworkMetrics } from '../types/status';
import { generateMetrics } from '../services/network/metrics/calculator';

export function useNetworkMetrics(nodes: Node[]) {
  const [metrics, setMetrics] = useState<NetworkMetrics>({
    latency: 0,
    packetLoss: 0,
    bandwidth: 0,
    lastUpdate: new Date()
  });

  const [isCollecting, setIsCollecting] = useState(false);

  const updateMetrics = useCallback(() => {
    setMetrics(generateMetrics(nodes));
  }, [nodes]);

  const startMetricsCollection = useCallback(() => {
    setIsCollecting(true);
  }, []);

  const stopMetricsCollection = useCallback(() => {
    setIsCollecting(false);
  }, []);

  useEffect(() => {
    let interval: number;
    if (isCollecting) {
      updateMetrics();
      interval = window.setInterval(updateMetrics, 2000);
    }
    return () => clearInterval(interval);
  }, [isCollecting, updateMetrics]);

  return {
    metrics,
    startMetricsCollection,
    stopMetricsCollection
  };
}