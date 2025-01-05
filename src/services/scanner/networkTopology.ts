import { Node, Connection } from '../../types/network';

export class NetworkTopology {
  private nodes: Node[] = [];
  private connections: Connection[] = [];

  addNode(node: Node) {
    this.nodes.push(node);
    this.updateTopology();
  }

  private updateTopology() {
    // Clear existing connections
    this.connections = [];

    // Find gateway/router nodes
    const gatewayNodes = this.nodes.filter(n => n.type === 'router');
    const switchNodes = this.nodes.filter(n => n.type === 'switch');

    if (gatewayNodes.length === 0) return;

    // Connect hosts to nearest switch or gateway
    this.nodes.forEach(node => {
      if (node.type === 'router' || node.type === 'switch') return;

      // Find nearest switch or gateway
      const nearestNode = this.findNearestNode(node, [...switchNodes, ...gatewayNodes]);
      if (nearestNode) {
        this.connections.push({
          source: node.id,
          target: nearestNode.id
        });
      }
    });

    // Connect switches to nearest gateway
    switchNodes.forEach(switchNode => {
      const nearestGateway = this.findNearestNode(switchNode, gatewayNodes);
      if (nearestGateway) {
        this.connections.push({
          source: switchNode.id,
          target: nearestGateway.id
        });
      }
    });
  }

  private findNearestNode(source: Node, targets: Node[]): Node | null {
    if (targets.length === 0) return null;

    return targets.reduce((nearest, current) => {
      const currentDistance = this.calculateDistance(source, current);
      const nearestDistance = nearest ? this.calculateDistance(source, nearest) : Infinity;
      return currentDistance < nearestDistance ? current : nearest;
    });
  }

  private calculateDistance(a: Node, b: Node): number {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
  }

  getConnections(): Connection[] {
    return this.connections;
  }

  getNodes(): Node[] {
    return this.nodes;
  }

  clear() {
    this.nodes = [];
    this.connections = [];
  }
}