import { Port } from '../../../types/network';
import { commonServices } from '../../../data/services';

export function determinePortState(port: number): Port['state'] {
  // Common ports are more likely to be open
  const isCommonPort = !!commonServices[port];
  const baseChance = isCommonPort ? 0.7 : 0.2;
  
  // Ports below 1024 are more likely to be filtered
  const filterChance = port < 1024 ? 0.4 : 0.2;
  
  const rand = Math.random();
  if (rand < baseChance) return 'open';
  if (rand < baseChance + filterChance) return 'filtered';
  return 'closed';
}