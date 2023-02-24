import fs from 'fs';
import readline from 'readline';
import {Hub, convertStringToNumberArray, convertArrayToHub, selectServers} from './ds/Hub'

const filePath = 'src/data/phub_50_5_1.txt';

// Data Structure
let totalHubs: number = 0;
let numberServers: number = 0;
let capacityServers: number = 0;
const hubs: Hub[] = [];

// Load Data
const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity
});

rl.on('line', (line: string) => {
    const input = convertStringToNumberArray(line.trim());

    if (input.length === 3) {
        totalHubs = input[0];
        numberServers = input[1];
        capacityServers = input[2];
    }

    if (input.length === 4) {
        hubs.push(convertArrayToHub(input));
    }
});

// Close
rl.on('close', () => {
    console.log(Object.values(selectServers(numberServers, hubs))[0]);
});
