// A Hub is also a Node or a Point
export interface Hub {
    nodeNumber: number,
    XCoordinate: number,
    YCoordinate: number,
    demand: number
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