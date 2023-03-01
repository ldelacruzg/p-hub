import { Hub } from "./ds/Hub";
import {
  addRandomClientsToServer,
  getRandomServers,
  Server,
} from "./ds/Server";

interface PHubSolution {
  solution: number;
  serversWithConnections: Server[];
}

export function pHubOneSolution(
  hubs: Hub[],
  quantityServers: number,
  capacityServers: number
): PHubSolution {
  // The servers are obtained randomly
  const servers = getRandomServers(quantityServers, hubs);

  // Add clients to servers randomly
  const serversWithConnections = servers.map((server) => {
    addRandomClientsToServer(server, capacityServers, hubs);
    return server;
  });

  // The solution is obtained
  const solution = serversWithConnections
    .map((server) => server.totalDistance!)
    .reduce((previous, current) => previous + current);

  return { solution, serversWithConnections };
}

export function phub(
  hubs: Hub[],
  quantityServers: number,
  capacityServers: number,
  iterations: number
) {
  let bestSolution: PHubSolution = pHubOneSolution(
    copiedArrayWithObjects(hubs),
    quantityServers,
    capacityServers
  );

  for (let index = 0; index < iterations - 1; index++) {
    const newSolution = pHubOneSolution(
      copiedArrayWithObjects(hubs),
      quantityServers,
      capacityServers
    );

    if (newSolution.solution < bestSolution.solution) {
      bestSolution = newSolution;
    }
  }

  return bestSolution;
}

function copiedArrayWithObjects<T>(array: T[]): T[] {
  return JSON.parse(JSON.stringify(array));
}
