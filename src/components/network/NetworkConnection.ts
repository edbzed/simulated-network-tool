import { Node } from '../../types/network';

export function drawNetworkConnection(
  ctx: CanvasRenderingContext2D,
  source: Node,
  target: Node,
  isActive: boolean
) {
  // Connection line with gradient
  const gradient = ctx.createLinearGradient(source.x, source.y, target.x, target.y);
  if (isActive) {
    gradient.addColorStop(0, '#93c5fd');
    gradient.addColorStop(1, '#60a5fa');
  } else {
    gradient.addColorStop(0, '#e2e8f0');
    gradient.addColorStop(1, '#cbd5e1');
  }

  ctx.beginPath();
  ctx.moveTo(source.x, source.y);
  ctx.lineTo(target.x, target.y);
  ctx.strokeStyle = gradient;
  ctx.lineWidth = isActive ? 3 : 2;
  ctx.stroke();

  // Draw direction arrow
  const angle = Math.atan2(target.y - source.y, target.x - source.x);
  const length = 12;
  const x = target.x - 25 * Math.cos(angle);
  const y = target.y - 25 * Math.sin(angle);
  
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x - length * Math.cos(angle - Math.PI / 6), y - length * Math.sin(angle - Math.PI / 6));
  ctx.moveTo(x, y);
  ctx.lineTo(x - length * Math.cos(angle + Math.PI / 6), y - length * Math.sin(angle + Math.PI / 6));
  ctx.strokeStyle = isActive ? '#3b82f6' : '#94a3b8';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Add data flow animation
  if (isActive) {
    const particlePos = (Date.now() % 2000) / 2000;
    const px = source.x + (target.x - source.x) * particlePos;
    const py = source.y + (target.y - source.y) * particlePos;
    
    ctx.beginPath();
    ctx.arc(px, py, 3, 0, Math.PI * 2);
    ctx.fillStyle = '#3b82f6';
    ctx.fill();
  }
}