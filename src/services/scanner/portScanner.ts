import { Port, ScanTarget } from '../../types/network';
import { scanPort } from './ports/portScan';
import { parsePortRanges, chunkArray } from './ports/utils';

export async function scanPorts(target: ScanTarget): Promise<Port[]> {
  // Only scan specified ports
  const ports = target.ports ? 
    parsePortRanges(target.ports) : 
    [80, 443]; // Default to common web ports if none specified
  
  const results: Port[] = [];
  
  // Scan ports in chunks to simulate realistic network behavior
  const chunks = chunkArray(ports, 10);
  for (const chunk of chunks) {
    const scanPromises = chunk.map(port => scanPort(target.ip, port));
    const chunkResults = await Promise.all(scanPromises);
    results.push(...chunkResults);
  }
  
  return results.sort((a, b) => a.number - b.number);
}