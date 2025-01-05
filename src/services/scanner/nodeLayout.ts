import { Node } from '../../types/network';

export class NodeLayout {
  private width: number;
  private height: number;
  private padding: number;

  constructor(width = 800, height = 600, padding = 50) {
    this.width = width;
    this.height = height;
    this.padding = padding;
  }

  calculateNodePositions(nodes: Node[]): Node[] {
    const gatewayNodes = nodes.filter(n => n.type === 'router');
    const switchNodes = nodes.filter(n => n.type === 'switch');
    const hostNodes = nodes.filter(n => n.type !== 'router' && n.type !== 'switch');

    // Position gateway nodes at the top
    this.positionGateways(gatewayNodes);
    
    // Position switches in the middle
    this.positionSwitches(switchNodes);
    
    // Position hosts in a grid below
    this.positionHosts(hostNodes);

    return nodes;
  }

  private positionGateways(nodes: Node[]) {
    const spacing = this.width / (nodes.length + 1);
    nodes.forEach((node, index) => {
      node.x = spacing * (index + 1);
      node.y = this.padding;
    });
  }

  private positionSwitches(nodes: Node[]) {
    const spacing = this.width / (nodes.length + 1);
    nodes.forEach((node, index) => {
      node.x = spacing * (index + 1);
      node.y = this.height / 3;
    });
  }

  private positionHosts(nodes: Node[]) {
    const cols = Math.ceil(Math.sqrt(nodes.length));
    const spacing = Math.min(
      (this.width - this.padding * 2) / cols,
      (this.height - this.padding * 2) / cols
    );

    nodes.forEach((node, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      node.x = this.padding + spacing * col + spacing / 2;
      node.y = this.height / 2 + spacing * row;
    });
  }
}