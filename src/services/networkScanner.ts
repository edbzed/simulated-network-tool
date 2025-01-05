import { Node, ScanOptions } from '../types/network';
import { scanPorts } from './portScanner';
import { detectDeviceType, detectOS, generateHostname } from './hostDetection';

export async function scanNetwork(options: ScanOptions): Promise<Node[]> {
  const baseIP = options.target.ip.split('/')[0];
  const ipParts = baseIP.split('.');
  const nodes: Node[] = [];

  const count = Math.floor(Math.random() * 5) + 3;
  for (let i = 0; i < count; i++) {
    const lastOctet = Math.floor(Math.random() * 254) + 1;
    const ip = `${ipParts[0]}.${ipParts[1]}.${ipParts[2]}.${lastOctet}`;
    
    const ports = await scanPorts({
      ip,
      ports: options.target.ports || '80,443'
    });

    const type = detectDeviceType(
      ports.filter(p => p.state === 'open').map(p => p.number)
    );

    const os = detectOS(
      ports.filter(p => p.state === 'open').map(p => p.number),
      type
    );

    nodes.push({
      id: ip,
      type,
      ip,
      status: Math.random() > 0.1 ? 'up' : 'down',
      ports,
      hostname: generateHostname(ip, type),
      os,
      lastSeen: new Date().toISOString(),
      x: Math.random() * 600 + 100,
      y: Math.random() * 400 + 100
    });
  }

  return nodes;
}

export async function getHostDetails(ip: string): Promise<Node> {
  const ports = await scanPorts({ 
    ip, 
    ports: '20-25,53,80,443' 
  });

  const type = detectDeviceType(
    ports.filter(p => p.state === 'open').map(p => p.number)
  );

  return {
    id: ip,
    type,
    ip,
    status: 'up',
    ports,
    hostname: generateHostname(ip, type),
    os: detectOS(ports.filter(p => p.state === 'open').map(p => p.number), type),
    lastSeen: new Date().toISOString(),
    x: 0,
    y: 0
  };
}