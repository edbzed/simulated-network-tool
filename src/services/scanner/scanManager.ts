import { Node, ScanOptions } from '../../types/network';
import { PortScanner } from './portScanner';
import { HostDetection } from './hostDetection';
import { NetworkTopology } from './networkTopology';
import { NodeLayout } from './nodeLayout';

export class ScanManager {
  private portScanner: PortScanner;
  private hostDetection: HostDetection;
  private topology: NetworkTopology;
  private layout: NodeLayout;

  constructor() {
    this.portScanner = new PortScanner();
    this.hostDetection = new HostDetection();
    this.topology = new NetworkTopology();
    this.layout = new NodeLayout();
  }

  async startScan(options: ScanOptions): Promise<{
    nodes: Node[];
    topology: NetworkTopology;
  }> {
    this.topology.clear();

    // Generate mock nodes based on the scan range
    const baseIP = options.target.ip.split('/')[0];
    const ipParts = baseIP.split('.');
    const count = Math.floor(Math.random() * 5) + 3;

    for (let i = 0; i < count; i++) {
      const lastOctet = Math.floor(Math.random() * 254) + 1;
      const ip = `${ipParts[0]}.${ipParts[1]}.${ipParts[2]}.${lastOctet}`;
      
      // Scan only specified ports
      const ports = await this.portScanner.scanPorts({
        ip,
        ports: options.target.ports || '80,443' // Default to common web ports if none specified
      });

      // Detect device type and OS based only on scanned ports
      const type = this.hostDetection.detectDeviceType(
        ports.filter(p => p.state === 'open').map(p => p.number)
      );
      const os = this.hostDetection.detectOS(
        ports.filter(p => p.state === 'open').map(p => p.number),
        type
      );

      const node: Node = {
        id: ip,
        type,
        ip,
        status: Math.random() > 0.1 ? 'up' : 'down',
        ports,
        hostname: this.hostDetection.generateHostname(ip, type),
        os,
        lastSeen: new Date().toISOString(),
        x: 0,
        y: 0
      };

      this.topology.addNode(node);
    }

    // Calculate layout
    const nodes = this.layout.calculateNodePositions(this.topology.getNodes());

    return {
      nodes,
      topology: this.topology
    };
  }
}