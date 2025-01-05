export interface Node {
  id: string;
  type: 'host' | 'router' | 'switch';
  ip: string;
  status: 'up' | 'down' | 'unknown';
  ports: Port[];
  x: number;
  y: number;
  hostname?: string;
  lastSeen?: string;
  os?: string;
}

export interface Port {
  number: number;
  service: string;
  state: 'open' | 'closed' | 'filtered';
  version?: string;
  protocol?: 'tcp' | 'udp';
}

export interface ScanTarget {
  ip: string;
  ports?: string; // e.g., "80,443,8080" or "1-1000"
}

export interface ScanOptions {
  target: ScanTarget;
  timeout?: number;
  concurrent?: number;
}