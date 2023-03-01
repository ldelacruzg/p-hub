import fs from "fs";
import readline from "readline";
import { convertArrayToHub, convertStringToNumberArray, Hub } from "./ds/Hub";
import { Plots } from "./util/Plots";
import { phub } from "./p-hub";

const filePath = "src/data/phub_50_5_2.txt";

// Data Structure
let totalHubs: number = 0;
let quantityServers: number = 0;
let capacityServers: number = 0;

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
  // Solution
  const result = phub(hubs, quantityServers, capacityServers, 1000);

  // Show plot
  const plots = new Plots();
  plots.showPlot(result.serversWithConnections);
});
