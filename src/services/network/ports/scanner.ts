import { Port, ScanTarget } from '../../../types/network';
import { scanPort } from './portScan';
import { parsePortRanges, chunkArray } from './utils';

export async function scanPorts(target: ScanTarget): Promise<Port[]> {
  // Only scan the exact ports specified in the target
  if (!target.ports) {
    return []; // Return empty array if no ports specified
  }
  
  const ports = parsePortRanges(target.ports);
  const results: Port[] = [];
  
  // Scan ports in chunks for realistic network behavior
  const chunks = chunkArray(ports, 10);
  for (const chunk of chunks) {
    const scanPromises = chunk.map(port => scanPort(target.ip, port));
    const chunkResults = await Promise.all(scanPromises);
    results.push(...chunkResults);
  }
  
  return results.sort((a, b) => a.number - b.number);
}