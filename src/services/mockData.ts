import { Node, Port } from '../types/network';
import { commonServices } from '../data/services';
import { serviceVersions } from '../data/serviceVersions';
import { operatingSystems } from '../data/operatingSystems';
import { deviceTypes } from '../data/deviceTypes';

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generateHostname(ip: string, type: string): string {
  const prefix = type === 'router' ? 'rtr' :
                type === 'switch' ? 'sw' :
                type === 'server' ? 'srv' : 'host';
  return `${prefix}-${ip.split('.').join('-')}`;
}

function generateOS(type: string): string {
  const deviceType = deviceTypes[type as keyof typeof deviceTypes];
  const osType = getRandomItem(deviceType.osTypes);
  return getRandomItem(operatingSystems[osType as keyof typeof operatingSystems]);
}

function generatePorts(type: string): Port[] {
  const deviceType = deviceTypes[type as keyof typeof deviceTypes];
  const ports: Port[] = [];

  // Add common ports for the device type
  deviceType.commonPorts.forEach(portNumber => {
    if (Math.random() > 0.3) { // 70% chance port is active
      const service = commonServices[portNumber];
      ports.push({
        number: portNumber,
        service,
        state: Math.random() > 0.2 ? 'open' : 'filtered',
        protocol: ['53', '161', '162'].includes(portNumber.toString()) ? 'udp' : 'tcp',
        version: serviceVersions[service]?.[Math.floor(Math.random() * serviceVersions[service].length)]
      });
    }
  });

  // Add some random additional ports
  const additionalPorts = Math.floor(Math.random() * 3);
  const availablePorts = Object.keys(commonServices).map(Number)
    .filter(port => !deviceType.commonPorts.includes(port));

  for (let i = 0; i < additionalPorts; i++) {
    const portNumber = getRandomItem(availablePorts);
    ports.push({
      number: portNumber,
      service: commonServices[portNumber],
      state: Math.random() > 0.3 ? 'open' : 'filtered',
      protocol: 'tcp'
    });
  }

  return ports.sort((a, b) => a.number - b.number);
}

export function generateMockNode(ip: string): Node {
  // Determine device type based on probabilities
  const rand = Math.random();
  let type = 'workstation';
  let cumProb = 0;
  
  for (const [deviceType, config] of Object.entries(deviceTypes)) {
    cumProb += config.probability;
    if (rand <= cumProb) {
      type = deviceType;
      break;
    }
  }

  return {
    id: ip,
    type: type as Node['type'],
    ip,
    status: Math.random() > 0.1 ? 'up' : 'down',
    ports: generatePorts(type),
    hostname: generateHostname(ip, type),
    os: generateOS(type),
    lastSeen: new Date().toISOString(),
    x: Math.random() * 600 + 100,
    y: Math.random() * 400 + 100,
  };
}