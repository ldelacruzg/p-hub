import { Client } from "./ds/Client";
import { Hub } from "./ds/Hub";
import {
  addClientToServer,
  getRandomServers,
  removeItemById,
  Server,
} from "./ds/Server";
import { getRandom } from "./util/Random";

export interface PHubSolution {
  solution: number;
  servers: Server[];
}

export function pHubOneSolution(
  hubs: Hub[],
  quantityServers: number,
  capacityServers: number
): PHubSolution {
  // The servers are obtained randomly
  const servers = getRandomServers(quantityServers, hubs, capacityServers);

  // Add clients to servers randomly
  while (hubs.length > 0) {
    const rndIndexServer = getRandom(quantityServers);
    const rndIndexClient = getRandom(hubs.length);

    const server = servers.at(rndIndexServer);
    const client = hubs.at(rndIndexClient) as Client;

    addClientToServer(server!, client);
    removeItemById(rndIndexClient, hubs);
  }

  // The solution is obtained
  const solution = servers
    .map((server) => server.totalDistance!)
    .reduce((previous, current) => previous + current);

  return { solution, servers };
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
