export interface NetworkMetrics {
  latency: number;        // in milliseconds
  packetLoss: number;     // percentage
  bandwidth: number;      // in Mbps
  lastUpdate: Date;
}

export interface NodeStatus {
  status: 'up' | 'down' | 'degraded';
  metrics: NetworkMetrics;
  lastSeen: Date;
}