// Service versions for realistic version detection
export const serviceVersions: Record<string, string[]> = {
  http: [
    'Apache/2.4.41 (Ubuntu)',
    'Apache/2.4.52 (Debian)',
    'nginx/1.18.0',
    'nginx/1.20.1',
    'lighttpd/1.4.55',
    'Microsoft-IIS/10.0',
    'Apache/2.4.48 (Win64)'
  ],
  https: [
    'Apache/2.4.41 (Ubuntu)',
    'nginx/1.18.0',
    'Microsoft-IIS/10.0',
    'CloudFlare',
    'LiteSpeed'
  ],
  ssh: [
    'OpenSSH/8.2p1 Ubuntu-4ubuntu0.5',
    'OpenSSH/7.9p1 Debian-10+deb10u2',
    'OpenSSH/8.1p1 Debian-8',
    'OpenSSH_for_Windows_8.1p1'
  ],
  ftp: [
    'vsftpd 3.0.3',
    'ProFTPD 1.3.6',
    'FileZilla Server 1.5.1',
    'Pure-FTPd',
    'Microsoft FTP Service'
  ],
  mysql: [
    '8.0.28-0ubuntu0.20.04.3',
    '5.7.37-0ubuntu0.18.04.1',
    '8.0.30-0ubuntu0.22.04.1',
    'MariaDB 10.6.12'
  ],
  postgresql: [
    '12.9 (Ubuntu 12.9-0ubuntu0.20.04.1)',
    '13.6 (Debian 13.6-1.pgdg100+1)',
    '14.2 (Ubuntu 14.2-1.pgdg20.04+1)'
  ],
  redis: [
    '6.0.16',
    '6.2.7',
    '7.0.5'
  ],
  mongodb: [
    '4.4.13',
    '5.0.9',
    '6.0.3'
  ]
};