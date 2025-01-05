import { Node, Port } from '../../types/network';

export class TrafficAnalyzer {
  private static readonly TRAFFIC_PATTERNS = {
    http: { min: 100, max: 1000 }, // KB/s
    https: { min: 200, max: 2000 },
    ftp: { min: 500, max: 5000 },
    ssh: { min: 10, max: 100 },
    rdp: { min: 300, max: 3000 }
  };

  analyzeNodeTraffic(node: Node): {
    inbound: number;
    outbound: number;
    activeConnections: number;
  } {
    const openPorts = node.ports.filter(p => p.state === 'open');
    let totalInbound = 0;
    let totalOutbound = 0;

    openPorts.forEach(port => {
      const pattern = this.getTrafficPattern(port);
      totalInbound += pattern.inbound;
      totalOutbound += pattern.outbound;
    });

    return {
      inbound: totalInbound,
      outbound: totalOutbound,
      activeConnections: openPorts.length
    };
  }

  private getTrafficPattern(port: Port): { inbound: number; outbound: number } {
    const pattern = TrafficAnalyzer.TRAFFIC_PATTERNS[port.service as keyof typeof TrafficAnalyzer.TRAFFIC_PATTERNS];
    if (!pattern) {
      return { inbound: 0, outbound: 0 };
    }

    // Add randomization and time-based variation
    const timeOfDay = new Date().getHours();
    const activityMultiplier = this.getActivityMultiplier(timeOfDay);
    
    return {
      inbound: this.calculateTraffic(pattern.min, pattern.max) * activityMultiplier,
      outbound: this.calculateTraffic(pattern.min / 2, pattern.max / 2) * activityMultiplier
    };
  }

  private calculateTraffic(min: number, max: number): number {
    return min + Math.random() * (max - min);
  }

  private getActivityMultiplier(hour: number): number {
    // Simulate daily traffic patterns
    if (hour >= 9 && hour <= 17) {
      return 1 + (Math.random() * 0.5); // Business hours: 100-150%
    } else if (hour >= 1 && hour <= 5) {
      return 0.3 + (Math.random() * 0.2); // Night: 30-50%
    } else {
      return 0.7 + (Math.random() * 0.3); // Other times: 70-100%
    }
  }
}