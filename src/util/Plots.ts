import { plot, Plot } from "nodeplotlib";
import { Server } from "../ds/Server";

export class Plots {
  public showPlot(servers: Server[]) {
    const plots: Plot[] = [];
    const traceClients: Plot[] = [];
    const colors = [
      "black",
      "purple",
      "green",
      "orange",
      "blue",
      "pink",
      "yellow",
      "brown",
      "gray",
      "red",
    ];

    servers.forEach((server, i) => {
      let color: string = colors[i];

      plots.push({
        x: [server.XCoordinate],
        y: [server.YCoordinate],
        type: "scatter",
        name: `Server ${server.nodeNumber}`,
        mode: "markers",
        marker: { color: color, size: 10 },
      });

      server.clients!.forEach((client) => {
        traceClients.push({
          x: [client.XCoordinate, server.XCoordinate],
          y: [client.YCoordinate, server.YCoordinate],
          type: "scatter",
          name: `Client ${client.nodeNumber} for server ${server.nodeNumber}`,
          line: { color: color, width: 1 },
          showlegend: false,
        });
      });
    });

    plot([...plots, ...traceClients], { width: 900, height: 600 });
  }
}
