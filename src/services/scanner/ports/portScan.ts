import { Port } from '../../../types/network';
import { determinePortState } from './state';
import { determineProtocol } from './protocol';
import { getServiceInfo } from './service';
import { calculateScanDelay } from './timing';

export async function scanPort(ip: string, port: number): Promise<Port> {
  // Simulate realistic port scanning timing
  const delay = calculateScanDelay(port);
  await new Promise(resolve => setTimeout(resolve, delay));

  const state = determinePortState(port);
  const { service, version } = getServiceInfo(port, state);
  const protocol = determineProtocol(port);

  return {
    number: port,
    service,
    state,
    protocol,
    version: state === 'open' ? version : undefined
  };
}