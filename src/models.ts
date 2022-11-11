export interface iCardItem {
  created: string;
  image: string;
  episode: Array<string>;
  gender: string;
  id: number;
  location: iLocation;
  origin: iOrigin;
  name: string;
  species: string;
  status: string;
  type: string;
  url: string;
}

export interface iOrigin {
  name: string;
  url: string;
}

export interface iLocation {
  name: string;
  url: string;
}
