import React from 'react';
import { Header } from './components/Header';
import { NetworkMap } from './components/NetworkMap';
import { NodeDetails } from './components/NodeDetails';
import { ScanForm } from './components/ScanForm';
import { Footer } from './components/Footer';
import { useNetworkScanner } from './hooks/useNetworkScanner';

function App() {
  const {
    nodes,
    selectedNode,
    scanning,
    error,
    metrics,
    handleScan,
    handleStopScan,
    handleNodeSelect
  } = useNetworkScanner();

  // Derive connections based on network topology
  const connections = nodes.map(node => ({
    source: node.id,
    target: nodes[0]?.id, // Connect to the first node (gateway)
  })).filter(conn => conn.source !== conn.target);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <Header 
            scanning={scanning} 
            onStopScan={handleStopScan}
            nodeCount={nodes.length}
            metrics={metrics}
          />
          
          <ScanForm onScan={handleScan} isScanning={scanning} />

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-2">
              <NetworkMap 
                nodes={nodes} 
                connections={connections}
                onNodeSelect={handleNodeSelect}
              />
            </div>
            <div>
              <NodeDetails node={selectedNode} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;