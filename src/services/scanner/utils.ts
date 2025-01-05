export class ScannerUtils {
  parsePortRanges(portsStr: string): number[] {
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

  calculateScanDelay(port: number): number {
    // Simulate network conditions:
    // - Common ports respond faster (less delay)
    // - Lower ports have slightly more delay (more security)
    // - Add random network jitter
    let delay = 100; // Base delay
    
    if (port < 1024) {
      delay += 50; // Additional delay for well-known ports
    }
    
    // Add random jitter (±30ms)
    delay += (Math.random() * 60) - 30;
    
    // Simulate occasional network congestion
    if (Math.random() < 0.1) { // 10% chance
      delay *= 2;
    }
    
    return Math.max(50, delay); // Minimum 50ms delay
  }

  chunkArray<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }
}