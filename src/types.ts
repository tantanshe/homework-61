export interface Country {
  name: string;
  alpha3Code: string;
}

export interface CountryInfo {
  name: string;
  capital: string;
  population: number;
  flag: string;
  region: string;
  borders: string[];
}