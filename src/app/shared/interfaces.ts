export interface Item {
    id?: number;
    name: string;
    year: number;
    country: string;
  }

  export interface Country {
    id: number
    name: string;
  }

  export interface Year {
    id: number
    name: number;
  }

  export interface FilterFields {
    country: Country
    year: Year;
  }