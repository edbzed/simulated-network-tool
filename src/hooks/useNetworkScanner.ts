import { useState, useCallback, useEffect } from 'react';
import { Node, ScanOptions } from '../types/network';
import { scanNetwork, getHostDetails } from '../services/network/scanner';
import { useNetworkMetrics } from './useNetworkMetrics';

export function useNetworkScanner() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentScanPorts, setCurrentScanPorts] = useState<string>('');
  
  const { 
    metrics, 
    startMetricsCollection, 
    stopMetricsCollection 
  } = useNetworkMetrics(nodes);

  // Stop metrics collection when nodes are empty or scanning stops
  useEffect(() => {
    if (!scanning || nodes.length === 0) {
      stopMetricsCollection();
    }
  }, [scanning, nodes.length, stopMetricsCollection]);

  const handleScan = useCallback(async (options: ScanOptions) => {
    try {
      setScanning(true);
      setError(null);
      setCurrentScanPorts(options.target.ports || '');
      const results = await scanNetwork(options);
      setNodes(results);
      startMetricsCollection();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Scan failed');
      stopMetricsCollection();
    } finally {
      setScanning(false);
    }
  }, [startMetricsCollection, stopMetricsCollection]);

  const handleStopScan = useCallback(() => {
    setScanning(false);
    stopMetricsCollection();
  }, [stopMetricsCollection]);

  const handleNodeSelect = useCallback(async (node: Node) => {
    try {
      const details = await getHostDetails(node.ip, currentScanPorts);
      setSelectedNode(details);
    } catch (err) {
      console.error('Failed to get host details:', err);
    }
  }, [currentScanPorts]);

  return {
    nodes,
    selectedNode,
    scanning,
    error,
    metrics,
    handleScan,
    handleStopScan,
    handleNodeSelect
  };
}