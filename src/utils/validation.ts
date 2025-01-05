import { isIPv4, isIPv4CIDR } from './ipUtils';

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export function validateIP(value: string): ValidationResult {
  if (!value) {
    return { isValid: false, message: 'IP address is required' };
  }
  
  if (value.includes('/')) {
    if (!isIPv4CIDR(value)) {
      return { isValid: false, message: 'Invalid CIDR notation (e.g., 192.168.1.0/24)' };
    }
  } else if (!isIPv4(value)) {
    return { isValid: false, message: 'Invalid IPv4 address' };
  }
  
  return { isValid: true };
}

export function validatePorts(value: string): ValidationResult {
  if (!value) return { isValid: true }; // Optional field
  
  const portPattern = /^(\d+(-\d+)?)(,\d+(-\d+)?)*$/;
  if (!portPattern.test(value)) {
    return { 
      isValid: false, 
      message: 'Invalid port format (e.g., 80,443 or 1-1000)' 
    };
  }
  
  const ports = value.split(',');
  for (const port of ports) {
    const [start, end] = port.split('-').map(Number);
    if (start > 65535 || (end && (end > 65535 || end < start))) {
      return { 
        isValid: false, 
        message: 'Ports must be between 1-65535' 
      };
    }
  }
  
  return { isValid: true };
}