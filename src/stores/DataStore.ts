import { makeAutoObservable, toJS } from 'mobx';
import { createContext, useContext } from 'react';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.thecatapi.com/v1',
  headers: {
    'x-api-key':
      'live_l0jg8zbQbuegTARZ4rYZFBIMdYRJwR0pMBMgrtvknJ1Ot9ocNbsJfGTrirSLJOiO',
  },
});

type Breed = {
  id: string;
  name: string;
  image?: {
    id: string;
    width: number;
    height: number;
    url: string;
  };
};

type BreedsColl = Breed[];

export class DataStore {
  public breeds: BreedsColl = [];

  public breedsContent: BreedsColl = [];
  // dataColl = [];

  constructor() {
    makeAutoObservable(this);
    this.initDataStore();
  }

  get getBreeds(): BreedsColl {
    return toJS(this.breeds);
  }

  get getBreedsContent() {
    return toJS(this.breedsContent);
  }

  initDataStore() {
    axiosInstance.get('breeds')
      .then(({ data }) => {
        const result: BreedsColl = data.map((item: Record<string, unknown>) => ({
          id: item.id,
          name: item.name,
        }));
        this.breeds = result;
      });
  }

  // .then(({ data }) => {
  //   data.forEach(({ id, name }) => this.breeds.push({ id, name }));
  // });
  // getData = (url, queryObject) => {
  //     axiosInstance.get(url).then((r) => console.log(r));
  //   });
}

export const dataStore = new DataStore();

export const DataContext = createContext(dataStore);
export const DataProvider = DataContext.Provider;
export const useDataContext = () => useContext(DataContext);
