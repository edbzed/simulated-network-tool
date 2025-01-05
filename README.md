# Network Topology Scanner

A React-based educational simulation tool that demonstrates network monitoring concepts through interactive visualizations. This application simulates network device discovery, port scanning, and topology mapping to provide a safe environment for learning about network infrastructure.

## Features

- **Simulated Network Discovery**: Visualize network topology with mock device detection
- **Port Scanning Simulation**: Demonstrate port scanning concepts without actual network operations
- **Interactive Visualization**: Real-time network map with device connections and status
- **Service Detection**: Simulated service and version detection for open ports
- **Live Metrics**: Monitor simulated network performance metrics

## Technical Stack

The application is built with modern web technologies:

- React 18 with TypeScript
- Vite for fast development and building
- Tailwind CSS for styling
- Lucide React for icons

## Project Structure

```
src/
├── components/    # React components
│   ├── network/   # Network visualization components
│   ├── details/   # Device detail components
│   └── ui/        # Reusable UI components
├── services/      # Business logic and simulations
│   ├── network/   # Network scanning simulation
│   └── metrics/   # Network metrics simulation
├── types/         # TypeScript type definitions
├── utils/         # Utility functions
└── data/          # Mock data and constants
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Educational Purpose

This is a simulation tool designed for educational purposes. It does not perform actual network scanning or monitoring. All data and network operations are simulated to demonstrate networking concepts in a safe, controlled environment.

## Creator

Ed Bates (TECHBLIP LLC)

## Acknowledgments

Some sections of this code were generated with the assistance of AI tools.   These contributions were reviewed and integrated by the project creator(s).

## License

Apache-2.0 license - see the [LICENSE](LICENSE) file for details