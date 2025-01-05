import { NetworkMetrics } from '../../types/status';
import { Node } from '../../types/network';

export class NetworkMetricsService {
  private static instance: NetworkMetricsService;
  private previousMetrics: NetworkMetrics | null = null;
  private networkCondition: 'normal' | 'degraded' | 'congested' = 'normal';
  private conditionChangeTime: number = Date.now();
  
  private constructor() {
    // Randomly change network conditions every 30-60 seconds
    setInterval(() => {
      const conditions: Array<'normal' | 'degraded' | 'congested'> = ['normal', 'degraded', 'congested'];
      this.networkCondition = conditions[Math.floor(Math.random() * conditions.length)];
      this.conditionChangeTime = Date.now();
    }, 30000 + Math.random() * 30000);
  }
  
  static getInstance(): NetworkMetricsService {
    if (!NetworkMetricsService.instance) {
      NetworkMetricsService.instance = new NetworkMetricsService();
    }
    return NetworkMetricsService.instance;
  }

  generateMetrics(nodes: Node[] = []): NetworkMetrics {
    if (nodes.length === 0) {
      return this.generateDefaultMetrics();
    }

    const activeNodes = nodes.filter(node => node.status === 'up');
    const totalNodes = nodes.length;
    
    const baseMetrics = {
      latency: this.calculateAverageLatency(activeNodes),
      packetLoss: this.calculateAveragePacketLoss(activeNodes, totalNodes),
      bandwidth: this.calculateAverageBandwidth(activeNodes),
      lastUpdate: new Date()
    };

    // Apply network condition effects
    return this.applyNetworkConditions(this.addJitter(baseMetrics));
  }

  private generateDefaultMetrics(): NetworkMetrics {
    return {
      latency: 0,
      packetLoss: 0,
      bandwidth: 0,
      lastUpdate: new Date()
    };
  }

  private calculateAverageLatency(activeNodes: Node[]): number {
    if (activeNodes.length === 0) return 0;
    
    const totalLatency = activeNodes.reduce((sum, node) => {
      // Base latency depends on node type and simulated distance
      let baseLatency = Math.random() * 20 + 10; // 10-30ms base
      
      if (node.type === 'router') baseLatency += 5; // Router processing
      if (node.type === 'switch') baseLatency += 2; // Switch processing
      
      // Add distance-based latency (simulated by node position)
      const distanceLatency = Math.sqrt(node.x * node.x + node.y * node.y) / 20;
      
      return sum + baseLatency + distanceLatency;
    }, 0);

    return totalLatency / activeNodes.length;
  }

  private calculateAveragePacketLoss(activeNodes: Node[], totalNodes: number): number {
    if (totalNodes === 0) return 0;
    
    // Calculate packet loss based on down nodes and individual node metrics
    const downNodesLoss = ((totalNodes - activeNodes.length) / totalNodes) * 100;
    
    // Calculate average packet loss for active nodes
    const activeLoss = activeNodes.reduce((sum, node) => {
      // Base loss depends on node type
      let baseLoss = Math.random() * 0.5; // 0-0.5% base loss
      
      // Add congestion-based loss
      if (node.ports.filter(p => p.state === 'open').length > 5) {
        baseLoss += 0.3; // More open ports = more potential for loss
      }
      
      return sum + baseLoss;
    }, 0) / (activeNodes.length || 1);

    // Weighted average: 70% from active nodes, 30% from down nodes
    return (activeLoss * 0.7) + (downNodesLoss * 0.3);
  }

  private calculateAverageBandwidth(activeNodes: Node[]): number {
    if (activeNodes.length === 0) return 0;
    
    const totalBandwidth = activeNodes.reduce((sum, node) => {
      // Base bandwidth depends on node type
      let nodeBandwidth = 100; // Default 100 Mbps
      
      switch (node.type) {
        case 'router':
          nodeBandwidth = 1000; // 1 Gbps for routers
          break;
        case 'switch':
          nodeBandwidth = 800; // 800 Mbps for switches
          break;
        default:
          // Randomize workstation bandwidth
          nodeBandwidth = 100 + Math.random() * 400; // 100-500 Mbps
      }
      
      // Reduce bandwidth based on active connections
      const activeConnections = node.ports.filter(p => p.state === 'open').length;
      nodeBandwidth *= Math.max(0.3, 1 - (activeConnections * 0.1));
      
      return sum + nodeBandwidth;
    }, 0);

    return totalBandwidth / activeNodes.length;
  }

  private addJitter(metrics: NetworkMetrics): NetworkMetrics {
    if (!this.previousMetrics) {
      this.previousMetrics = metrics;
      return metrics;
    }

    // Add realistic jitter (variation) to metrics
    const jitterFactor = 0.1; // 10% maximum variation
    
    return {
      latency: this.smoothMetric(
        metrics.latency,
        this.previousMetrics.latency,
        jitterFactor
      ),
      packetLoss: this.smoothMetric(
        metrics.packetLoss,
        this.previousMetrics.packetLoss,
        jitterFactor * 0.5 // Less jitter for packet loss
      ),
      bandwidth: this.smoothMetric(
        metrics.bandwidth,
        this.previousMetrics.bandwidth,
        jitterFactor * 0.3 // Even less jitter for bandwidth
      ),
      lastUpdate: metrics.lastUpdate
    };
  }

  private smoothMetric(current: number, previous: number, jitterFactor: number): number {
    const maxChange = current * jitterFactor;
    const change = (Math.random() * 2 - 1) * maxChange;
    const smoothed = previous + (current - previous) * 0.3 + change;
    return Math.max(0, smoothed);
  }

  private applyNetworkConditions(metrics: NetworkMetrics): NetworkMetrics {
    const timeSinceChange = (Date.now() - this.conditionChangeTime) / 1000;
    const transitionFactor = Math.min(1, timeSinceChange / 5); // 5-second transition

    switch (this.networkCondition) {
      case 'degraded':
        return {
          latency: metrics.latency * (1 + 0.5 * transitionFactor), // 50% higher latency
          packetLoss: metrics.packetLoss * (1 + 1 * transitionFactor), // 100% higher loss
          bandwidth: metrics.bandwidth * (1 - 0.3 * transitionFactor), // 30% lower bandwidth
          lastUpdate: metrics.lastUpdate
        };
      case 'congested':
        return {
          latency: metrics.latency * (1 + 2 * transitionFactor), // 200% higher latency
          packetLoss: metrics.packetLoss * (1 + 3 * transitionFactor), // 300% higher loss
          bandwidth: metrics.bandwidth * (1 - 0.7 * transitionFactor), // 70% lower bandwidth
          lastUpdate: metrics.lastUpdate
        };
      default:
        return metrics;
    }
  }
}