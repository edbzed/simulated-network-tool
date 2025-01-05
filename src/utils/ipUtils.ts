export function isIPv4(ip: string): boolean {
  const parts = ip.split('.');
  if (parts.length !== 4) return false;
  
  return parts.every(part => {
    const num = parseInt(part, 10);
    return num >= 0 && num <= 255 && part === num.toString();
  });
}

export function isIPv4CIDR(cidr: string): boolean {
  const [ip, prefix] = cidr.split('/');
  if (!ip || !prefix) return false;
  
  const prefixNum = parseInt(prefix, 10);
  return isIPv4(ip) && prefixNum >= 0 && prefixNum <= 32;
}

export function calculateNetworkRange(cidr: string): { start: string; end: string } {
  const [ip, prefix] = cidr.split('/');
  const prefixBits = parseInt(prefix, 10);
  const ipParts = ip.split('.').map(Number);
  
  // Calculate network and broadcast addresses
  const ipNum = (ipParts[0] << 24) + (ipParts[1] << 16) + 
                (ipParts[2] << 8) + ipParts[3];
  const mask = ~((1 << (32 - prefixBits)) - 1);
  const network = ipNum & mask;
  const broadcast = network | ~mask;
  
  return {
    start: formatIP(network + 1),
    end: formatIP(broadcast - 1)
  };
}

function formatIP(num: number): string {
  return [
    (num >>> 24) & 255,
    (num >>> 16) & 255,
    (num >>> 8) & 255,
    num & 255
  ].join('.');
}