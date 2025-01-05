import { Node } from '../../types/network';

export function drawNetworkNode(ctx: CanvasRenderingContext2D, node: Node) {
  // Node circle
  ctx.beginPath();
  ctx.arc(node.x, node.y, 20, 0, Math.PI * 2);
  
  // Gradient fill
  const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 20);
  if (node.status === 'up') {
    gradient.addColorStop(0, '#4ade80');
    gradient.addColorStop(1, '#22c55e');
  } else {
    gradient.addColorStop(0, '#f87171');
    gradient.addColorStop(1, '#ef4444');
  }
  ctx.fillStyle = gradient;
  ctx.fill();
  
  // Glow effect
  ctx.shadowColor = node.status === 'up' ? '#22c55e' : '#ef4444';
  ctx.shadowBlur = 15;
  ctx.strokeStyle = node.status === 'up' ? '#15803d' : '#b91c1c';
  ctx.lineWidth = 2;
  ctx.stroke();
  
  // Reset shadow
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;

  // IP Label
  ctx.fillStyle = '#1e293b';
  ctx.font = 'bold 12px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(node.ip, node.x, node.y + 35);
  
  // Type Label with background
  const typeText = node.type;
  ctx.font = '10px Inter, sans-serif';
  const typeWidth = ctx.measureText(typeText).width;
  
  // Label background
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.fillRect(node.x - (typeWidth / 2) - 4, node.y + 38, typeWidth + 8, 16);
  
  // Label text
  ctx.fillStyle = '#64748b';
  ctx.fillText(typeText, node.x, node.y + 48);
}