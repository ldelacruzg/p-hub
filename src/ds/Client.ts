import { Hub } from "./Hub";
import { Server } from "./Server";

export interface Client extends Hub {
  distance: number;
}

export function calculateDistance(server: Server, client: Client): number {
  return Math.sqrt(
    Math.pow(client.YCoordinate - server.YCoordinate, 2) +
      Math.pow(client.XCoordinate - server.XCoordinate, 2)
  );
}
