// A Hub is also a Node or a Point
export interface Hub {
    nodeNumber: number,
    XCoordinate: number,
    YCoordinate: number,
    demand: number
}

//Servers
export interface Server {
    currentNode : Hub,
    clients : Hub[],
    capacityUsed : number,
    acumulatedDistance : number
}

export function convertStringToHub(strHub: string): Hub {
    const _strHub = convertStringToNumberArray(strHub);
    return {
        nodeNumber: _strHub[0],
        XCoordinate: _strHub[1],
        YCoordinate: _strHub[2],
        demand: _strHub[3]
    }
}

export function convertArrayToHub(arrayHub: number[]): Hub {
    return {
        nodeNumber: arrayHub[0],
        XCoordinate: arrayHub[1],
        YCoordinate: arrayHub[2],
        demand: arrayHub[3]
    }
}

export function convertStringToNumberArray(str: string): number[] {
    return str.split(" ").map(Number);
}

export function calculateDistance(server : Hub, client : Hub): number {
    return Math.sqrt(Math.pow(client.YCoordinate - server.YCoordinate, 2) + Math.pow(client.XCoordinate - server.XCoordinate, 2));
}

export function selectServers(serversQty : number, nodes : Hub[]) : any {
    const indexes = new Set<number>();
    const serversSelected = [];
    while(indexes.size < serversQty){
        const rnd = Math.floor(Math.random() * (nodes.length - indexes.size));
        if(!indexes.has(rnd) && rnd >= 0){
            indexes.add(rnd);
            serversSelected.push(nodes[rnd]);
            nodes.splice(rnd, 1);
        }
    }    
    return {serversSelected, nodes};
    
}
