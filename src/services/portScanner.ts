import { Port, ScanTarget } from '../types/network';
import { commonServices } from '../data/services';
import { serviceVersions } from '../data/serviceVersions';

function parsePortRanges(portsStr: string): number[] {
  const ports = new Set<number>();
  
  portsStr.split(',').forEach(range => {
    const [start, end] = range.split('-').map(Number);
    if (end) {
      for (let port = start; port <= end; port++) {
        ports.add(port);
      }
    } else {
      ports.add(start);
    }
  });
  
  return Array.from(ports).sort((a, b) => a - b);
}

async function scanPort(ip: string, port: number): Promise<Port> {
  // Simulate port scanning with realistic service detection
  const delay = Math.random() * 200 + 100;
  await new Promise(resolve => setTimeout(resolve, delay));

  const state: Port['state'] = Math.random() > 0.7 ? 'open' : 
                              Math.random() > 0.5 ? 'filtered' : 'closed';

  const service = commonServices[port] || 'unknown';
  const version = state === 'open' && serviceVersions[service] ? 
    serviceVersions[service][Math.floor(Math.random() * serviceVersions[service].length)] : 
    undefined;

  return {
    number: port,
    service,
    state,
    protocol: ['53', '161', '162'].includes(port.toString()) ? 'udp' : 'tcp',
    version
  };
}

export async function scanPorts(target: ScanTarget): Promise<Port[]> {
  const ports = target.ports ? 
    parsePortRanges(target.ports) : 
    [80, 443]; // Default to common web ports if none specified
  
  const results: Port[] = [];
  
  // Scan ports in chunks to simulate realistic network behavior
  const chunkSize = 10;
  for (let i = 0; i < ports.length; i += chunkSize) {
    const chunk = ports.slice(i, i + chunkSize);
    const scanPromises = chunk.map(port => scanPort(target.ip, port));
    const chunkResults = await Promise.all(scanPromises);
    results.push(...chunkResults);
  }
  
  return results.sort((a, b) => a.number - b.number);
}