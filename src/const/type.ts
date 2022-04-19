interface Store {
  name: string;
  coodinate: number[];
  movement: { [key in string]: number };
}

type Stores = Store[];

export type { Store, Stores };
