// Device type configurations
export const deviceTypes = {
  router: {
    commonPorts: [22, 23, 53, 80, 443],
    services: ['ssh', 'telnet', 'dns', 'http', 'https'],
    osTypes: ['network'],
    probability: 0.2
  },
  switch: {
    commonPorts: [22, 23, 161, 162],
    services: ['ssh', 'telnet', 'snmp', 'snmp-trap'],
    osTypes: ['network'],
    probability: 0.1
  },
  server: {
    commonPorts: [22, 80, 443, 3306, 5432],
    services: ['ssh', 'http', 'https', 'mysql', 'postgresql'],
    osTypes: ['linux', 'windows'],
    probability: 0.3
  },
  workstation: {
    commonPorts: [139, 445, 3389],
    services: ['netbios-ssn', 'microsoft-ds', 'rdp'],
    osTypes: ['windows', 'linux', 'macos'],
    probability: 0.4
  }
};