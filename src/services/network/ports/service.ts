import { commonServices } from '../../../data/services';
import { serviceVersions } from '../../../data/serviceVersions';
import { Port } from '../../../types/network';

export function getServiceInfo(port: number, state: Port['state']): {
  service: string;
  version?: string;
} {
  const service = commonServices[port] || 'unknown';
  
  if (state !== 'open') {
    return { service };
  }

  return {
    service,
    version: getServiceVersion(service)
  };
}

function getServiceVersion(service: string): string | undefined {
  const versions = serviceVersions[service];
  return versions?.[Math.floor(Math.random() * versions.length)];
}