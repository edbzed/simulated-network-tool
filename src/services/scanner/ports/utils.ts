export function parsePortRanges(portsStr: string): number[] {
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

export function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}