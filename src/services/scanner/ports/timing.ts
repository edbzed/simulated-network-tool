export function calculateScanDelay(port: number): number {
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