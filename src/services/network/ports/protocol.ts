const UDP_PORTS = new Set([53, 67, 68, 69, 123, 161, 162, 514]);

export function determineProtocol(port: number): 'tcp' | 'udp' {
  return UDP_PORTS.has(port) ? 'udp' : 'tcp';
}