import { calculateDistance, Client } from "./Client";
import { Hub, RandomHub } from "./Hub";

export interface Server extends Omit<Hub, "demand"> {
  clients?: Client[];
  totalDistance?: number;
  totalClients?: number;
  accumulatedCapacity?: number;
  capacity?: number;
}

export function getRandomServers(
  quantity: number,
  hubs: Hub[],
  capacity: number
): Server[] {
  const servers: Server[] = [];

  while (servers.length < quantity) {
    const rndHub = getRandomHub(hubs);
    const server = rndHub.hub as Server;
    server.totalDistance = 0;
    server.totalClients = 0;
    server.accumulatedCapacity = 0;
    server.capacity = capacity;
    server.clients = [];
    servers.push(server);
    removeItemById(rndHub.index, hubs);
  }

  return servers;
}

export function addClientToServer(server: Server, client: Client) {
  // Se comprueba que no sobrepase la capacidad del server
  server.accumulatedCapacity! += client.demand;
  if (server.accumulatedCapacity! > server.capacity!) {
    server.accumulatedCapacity! -= client.demand;
    return;
  }

  client.distance = calculateDistance(server, client);
  server.clients?.push(client);
  server.totalClients!++;
  server.totalDistance! += client.distance;
}

function getRandomHub(hubs: Hub[]): RandomHub {
  const rndIndex = Math.floor(Math.random() * hubs.length); // 0 - 49 = 50
  return {
    hub: hubs.at(rndIndex)!,
    index: rndIndex,
  };
}

export function removeItemById(hubId: number, hubs: Hub[]) {
  hubs.splice(hubId, 1);
}
