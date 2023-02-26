import fs from "fs";
import readline from "readline";
import { convertArrayToHub, convertStringToNumberArray, Hub } from "./ds/Hub";
import { addRandomClientsToServer, getRandomServers } from "./ds/Server";
import { Plots } from "./ds/Plots";


const filePath = "src/data/phub_50_5_2.txt";

// Data Structure
let totalHubs: number = 0;
let quantityServers: number = 0;
let capacityServers: number = 0;
let solution = 0;

const hubs: Hub[] = [];

// Load Data
const rl = readline.createInterface({
  input: fs.createReadStream(filePath),
  crlfDelay: Infinity,
});

rl.on("line", (line: string) => {
  const input = convertStringToNumberArray(line.trim());

  if (input.length === 3) {
    totalHubs = input[0];
    quantityServers = input[1];
    capacityServers = input[2];
  }

  if (input.length === 4) {
    hubs.push(convertArrayToHub(input));
  }
});

// Finish reading the file
rl.on("close", () => {
  // The servers are obtained randomly
  const servers = getRandomServers(quantityServers, hubs);
  //console.log(servers);

  // Add clients to servers randomly
  const serversWithClients = servers.map((server) => {
    addRandomClientsToServer(server, capacityServers, hubs);
    return server;
  });

  // The solution is obtained
  solution = serversWithClients
    .map((server) => server.totalDistance!)
    .reduce((previous, current) => previous + current);

  // Show solution
  console.log({ solution, serversWithClients });

  // Show plot
  const plots = new Plots();
  plots.showPlot(serversWithClients);
});
