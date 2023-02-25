// A Hub is also a Node or a Point
export interface Hub {
  nodeNumber: number;
  XCoordinate: number;
  YCoordinate: number;
  demand: number;
}

export interface RandomHub {
  hub: Hub;
  index: number;
}

export function convertStringToHub(strHub: string): Hub {
  const arrayHub = convertStringToNumberArray(strHub);
  return convertArrayToHub(arrayHub);
}

export function convertArrayToHub(arrayHub: number[]): Hub {
  return {
    nodeNumber: arrayHub[0],
    XCoordinate: arrayHub[1],
    YCoordinate: arrayHub[2],
    demand: arrayHub[3],
  };
}

export function convertStringToNumberArray(str: string): number[] {
  return str.split(" ").map(Number);
}
