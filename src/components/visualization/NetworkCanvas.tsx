import React, { useEffect, useRef, useCallback } from 'react';
import { Node, Connection } from '../../types/network';
import { drawNetworkNode } from './canvas/nodeRenderer';
import { drawNetworkConnection } from './canvas/connectionRenderer';

interface NetworkCanvasProps {
  nodes: Node[];
  connections: Connection[];
  onNodeSelect?: (node: Node) => void;
  width?: number;
  height?: number;
}

export function NetworkCanvas({ 
  nodes, 
  connections, 
  onNodeSelect,
  width = 800,
  height = 600 
}: NetworkCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeConnections = useRef(new Set<string>());

  const handleClick = useCallback((event: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas || !onNodeSelect) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    nodes.forEach(node => {
      const distance = Math.sqrt(Math.pow(node.x - x, 2) + Math.pow(node.y - y, 2));
      if (distance < 20) {
        onNodeSelect(node);
        connections.forEach(conn => {
          if (conn.source === node.id || conn.target === node.id) {
            activeConnections.current.add(`${conn.source}-${conn.target}`);
          }
        });
      }
    });
  }, [nodes, connections, onNodeSelect]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.addEventListener('click', handleClick);

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      connections.forEach(connection => {
        const source = nodes.find(n => n.id === connection.source);
        const target = nodes.find(n => n.id === connection.target);
        if (source && target) {
          const isActive = activeConnections.current.has(
            `${connection.source}-${connection.target}`
          );
          drawNetworkConnection(ctx, source, target, isActive);
        }
      });

      nodes.forEach(node => drawNetworkNode(ctx, node));

      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      canvas.removeEventListener('click', handleClick);
    };
  }, [nodes, connections, handleClick]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="border border-gray-200 rounded-lg shadow-lg bg-white cursor-pointer"
    />
  );
}