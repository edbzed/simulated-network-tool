import { Node } from '../types/network';
import { deviceTypes } from '../data/deviceTypes';
import { operatingSystems } from '../data/operatingSystems';

export function detectDeviceType(ports: number[]): Node['type'] {
  // Analyze open ports to determine device type
  const signatures = Object.entries(deviceTypes);
  let bestMatch = { type: 'host' as Node['type'], score: 0 };

  signatures.forEach(([type, config]) => {
    const matchingPorts = config.commonPorts.filter(port => 
      ports.includes(port)
    );
    const score = matchingPorts.length / config.commonPorts.length;
    
    if (score > bestMatch.score) {
      bestMatch = { 
        type: type as Node['type'], 
        score 
      };
    }
  });

  return bestMatch.type;
}

export function detectOS(ports: number[], type: Node['type']): string {
  const deviceType = deviceTypes[type];
  if (!deviceType) return 'Unknown';

  // Select OS based on device type and port signatures
  const osType = deviceType.osTypes[0]; // Use primary OS type
  const osList = operatingSystems[osType];
  
  return osList[Math.floor(Math.random() * osList.length)];
}

export function generateHostname(ip: string, type: Node['type']): string {
  const prefix = type === 'router' ? 'rtr' :
                type === 'switch' ? 'sw' :
                type === 'server' ? 'srv' : 'host';
  return `${prefix}-${ip.split('.').join('-')}`;
}