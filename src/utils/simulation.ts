import { Node, Port } from '../types/network';

const services = ['http', 'https', 'ssh', 'ftp', 'smtp', 'dns'];
const portStates: ('open' | 'closed' | 'filtered')[] = ['open', 'closed', 'filtered'];

export function generateRandomPort(): Port {
  return {
    number: Math.floor(Math.random() * 1000) + 1,
    service: services[Math.floor(Math.random() * services.length)],
    state: portStates[Math.floor(Math.random() * portStates.length)]
  };
}

export function simulateScan(nodes: Node[]): Node[] {
  return nodes.map(node => ({
    ...node,
    status: Math.random() > 0.1 ? 'up' : 'down',
    ports: Array(Math.floor(Math.random() * 5) + 1)
      .fill(null)
      .map(() => generateRandomPort())
  }));
}