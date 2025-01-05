import { Port } from '../../../types/network';
import { determinePortState } from './state';
import { determineProtocol } from './protocol';
import { getServiceInfo } from './service';

export async function scanPort(ip: string, port: number): Promise<Port> {
  // Simulate realistic port scanning timing
  const delay = Math.random() * 200 + 100;
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