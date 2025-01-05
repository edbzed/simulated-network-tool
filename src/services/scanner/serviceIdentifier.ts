import { Port } from '../../types/network';
import { serviceVersions } from '../../data/serviceVersions';

export class ServiceIdentifier {
  async identifyService(port: number, response: Buffer): Promise<Partial<Port>> {
    // Simulate service identification delay
    await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 100));

    const service = this.determineService(port);
    if (!service) return { service: 'unknown' };

    return {
      service,
      version: this.determineVersion(service),
      protocol: this.determineProtocol(port)
    };
  }

  private determineService(port: number): string {
    // Common port mappings
    const commonPorts: Record<number, string> = {
      21: 'ftp',
      22: 'ssh',
      23: 'telnet',
      25: 'smtp',
      80: 'http',
      443: 'https',
      3306: 'mysql',
      5432: 'postgresql'
    };

    return commonPorts[port] || 'unknown';
  }

  private determineVersion(service: string): string | undefined {
    const versions = serviceVersions[service];
    if (!versions) return undefined;

    // Select version based on probability distribution
    const versionIndex = Math.floor(Math.pow(Math.random(), 2) * versions.length);
    return versions[versionIndex];
  }

  private determineProtocol(port: number): 'tcp' | 'udp' {
    const udpPorts = new Set([53, 67, 68, 69, 123, 161, 162, 514]);
    return udpPorts.has(port) ? 'udp' : 'tcp';
  }
}