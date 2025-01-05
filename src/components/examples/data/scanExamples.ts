export interface ScanExample {
  title: string;
  description: string;
  target: string;
  ports: string;
  explanation: string;
  category: 'essential' | 'security' | 'services' | 'infrastructure';
}

export const scanExamples: ScanExample[] = [
  // Essential Scans
  {
    title: 'Quick Service Check',
    description: 'Basic scan of critical services',
    target: '192.168.1.0/24',
    ports: '22,80,443,3389',
    explanation: 'Identifies web servers, SSH, and remote desktop services',
    category: 'essential'
  },
  {
    title: 'Common Ports',
    description: 'Most frequently used ports',
    target: '10.0.0.0/24',
    ports: '20-23,25,53,80,443',
    explanation: 'Scans for FTP, SSH, Telnet, SMTP, DNS, and web services',
    category: 'essential'
  },

  // Security Scans
  {
    title: 'Security Services',
    description: 'Security-related ports',
    target: '192.168.1.1',
    ports: '53,88,389,636,1812,1813',
    explanation: 'Locates DNS, Kerberos, LDAP, RADIUS servers',
    category: 'security'
  },
  {
    title: 'Remote Access',
    description: 'Remote management ports',
    target: '192.168.0.1',
    ports: '22,23,3389,5900-5910',
    explanation: 'Finds SSH, Telnet, RDP, and VNC remote access',
    category: 'security'
  },
  {
    title: 'Authentication Services',
    description: 'Identity and access management',
    target: '10.0.0.1',
    ports: '88,389,636,1812,6556',
    explanation: 'Detects Kerberos, LDAP(S), RADIUS, and Windows auth',
    category: 'security'
  },

  // Application Services
  {
    title: 'Database Services',
    description: 'Common database ports',
    target: '10.0.0.0/24',
    ports: '1433,1521,3306,5432,27017,6379',
    explanation: 'Locates SQL Server, Oracle, MySQL, PostgreSQL, MongoDB, Redis',
    category: 'services'
  },
  {
    title: 'Web Services',
    description: 'Web application ports',
    target: '192.168.0.0/24',
    ports: '80,443,8000-8010,3000-3010',
    explanation: 'Finds HTTP/HTTPS servers and development ports',
    category: 'services'
  },
  {
    title: 'Mail Services',
    description: 'Email server ports',
    target: '192.168.5.0/24',
    ports: '25,110,143,465,587,993,995',
    explanation: 'Identifies SMTP, POP3, IMAP mail servers',
    category: 'services'
  },
  {
    title: 'Media Services',
    description: 'Streaming and media ports',
    target: '192.168.1.0/24',
    ports: '554,1935,5004,5005,8554',
    explanation: 'Detects RTSP, RTMP, RTP streaming services',
    category: 'services'
  },

  // Infrastructure
  {
    title: 'Network Management',
    description: 'Infrastructure management',
    target: '10.0.0.1',
    ports: '161-162,514,636,1812',
    explanation: 'Detects SNMP, Syslog, LDAPS, RADIUS services',
    category: 'infrastructure'
  },
  {
    title: 'File Sharing',
    description: 'Network file sharing services',
    target: '10.0.0.0/24',
    ports: '137-139,445,2049',
    explanation: 'Detects SMB, NetBIOS, and NFS file sharing',
    category: 'infrastructure'
  },
  {
    title: 'Network Services',
    description: 'Core network services',
    target: '192.168.0.1',
    ports: '53,67-68,123,389',
    explanation: 'Finds DNS, DHCP, NTP, and LDAP services',
    category: 'infrastructure'
  },
  {
    title: 'Virtualization',
    description: 'Virtual machine management',
    target: '192.168.1.0/24',
    ports: '902,2049,3260,5900,5988-5989',
    explanation: 'Identifies VMware, NFS, iSCSI, VNC, WBEM services',
    category: 'infrastructure'
  }
];