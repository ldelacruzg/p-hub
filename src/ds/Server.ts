import { calculateDistance, Client } from "./Client";
import { Hub, RandomHub } from "./Hub";

export interface Server extends Omit<Hub, "demand"> {
  clients?: Client[];
  totalDistance?: number;
  totalClients?: number;
}

export function getRandomServers(quantity: number, hubs: Hub[]): Server[] {
  const servers: Server[] = [];

  while (servers.length < quantity) {
    const rndHub = getRandomHub(hubs);
    servers.push(rndHub.hub);
    removeItemById(rndHub.index, hubs);
  }

  return servers;
}

export function addRandomClientsToServer(
  server: Server,
  capacityServer: number,
  hubs: Hub[]
) {
  // No debe sobre pasar la capacidad del server
  let accumulationDemandClients = 0;

  // se inicializa lso clientes del server en vacio
  server.clients = [];

  while (accumulationDemandClients < capacityServer) {
    // obtener un hub aleatorio
    const rndClient = getRandomHub(hubs);
    const client = rndClient.hub as Client;

    // En caso de que ya no haya hubs
    if (rndClient.hub === undefined) {
      break;
    }

    // comprobar que la demanda del hub (client) no sobrepase la capacidad del server
    accumulationDemandClients += rndClient.hub.demand;
    if (accumulationDemandClients > capacityServer) {
      // Si sobrepasa la capacidad acumulada no agregarlo
      accumulationDemandClients -= rndClient.hub.demand;
      break;
    }

    // Calcular la distancia entre el server y client
    client.distance = calculateDistance(server, client);

    // Agregar el Client a la lista de clients del Server
    server.clients?.push(client);

    // Se retirar el hub (client) de la lista de hubs
    removeItemById(rndClient.index, hubs);
  }

  server.totalClients = server.clients.length;
  server.totalDistance = server.clients
    .map((client) => client.distance)
    .reduce((previous, current) => previous + current, 0);

  return accumulationDemandClients;
}

function getRandomHub(hubs: Hub[]): RandomHub {
  const rndIndex = Math.floor(Math.random() * hubs.length); // 0 - 49 = 50
  return {
    hub: hubs.at(rndIndex)!,
    index: rndIndex,
  };
}

function removeItemById(hubId: number, hubs: Hub[]) {
  hubs.splice(hubId, 1);
}
