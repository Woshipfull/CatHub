import { makeAutoObservable, toJS, runInAction } from 'mobx';
import sortBy from 'lodash/sortBy';
import find from 'lodash/find';

import { Breed, BreedsColl, AllBreedsForSelect } from './storesTypes';
import { getBreedsContent, getBreedsForSelect } from './requests';

export class BreedsStore {
  public breedsContent: BreedsColl = [];

  public allBreeds: AllBreedsForSelect = [];

  public limit = 10;

  public breedFilter = 'all';

  public sortBy = 'default';

  public currentPage = 1;

  public errors: string[] = [];

  private loaded = false;

  constructor() {
    makeAutoObservable(this);
    this.initDataStore();
  }

  get getBreeds() {
    return toJS(this.allBreeds);
  }

  get getBreedsContent() {
    const filtered = this.filterByBreed(toJS(this.breedsContent));
    const sorted = this.sortBreeds(filtered);
    const end = this.currentPage * this.limit;
    const start = end - this.limit;
    const result = sorted.slice(start, end);

    return result;
  }

  get getLimit() {
    return this.limit;
  }

  set setLimit(newLimit: number) {
    this.limit = newLimit;
    this.currentPage = 1;
  }

  get getBreedFilter() {
    return this.breedFilter;
  }

  set setBreedFilter(newBreedFilter: string) {
    this.breedFilter = newBreedFilter;
  }

  get getSortBy() {
    return this.sortBy;
  }

  set setSortBy(newSortBy: string) {
    this.sortBy = newSortBy;
  }

  get isLoaded() {
    return this.loaded;
  }

  get getErrors() {
    return toJS(this.errors);
  }

  get getCurrentPage() {
    return this.currentPage;
  }

  get getMaxPage() {
    return Math.ceil(this.breedsContent.length / this.limit);
  }

  setCurrentPage = (newCurrentPage: number): void => {
    this.currentPage = newCurrentPage;
  };

  getBreedById = (breedID: string | undefined): Breed | undefined => {
    const coll = toJS(this.breedsContent);
    return find(coll, { id: breedID });
  };

  filterByBreed(array: BreedsColl) {
    if (this.breedFilter === 'all') {
      return array;
    }
    return array.filter(({ name }) => name === this.breedFilter);
  }

  sortBreeds(array: BreedsColl) {
    switch (this.sortBy) {
      case 'az':
        return sortBy(array, (item) => item.name);
      case 'za':
        return sortBy(array, (item) => item.name).reverse();
      default:
        return array;
    }
  }

  initDataStore() {
    getBreedsContent().then((response) => {
      if (typeof response === 'string') {
        runInAction(() => {
          this.errors.push(response);
        });
        return;
      }
      runInAction(() => {
        this.breedsContent = response;
      });
    });
    getBreedsForSelect().then((response) => {
      if (typeof response === 'string') {
        runInAction(() => {
          this.errors.push(response);
        });
        return;
      }
      runInAction(() => {
        this.errors = [];
        this.allBreeds = response;
        this.loaded = true;
      });
    });
  }
}

const breedsStore = new BreedsStore();

export default breedsStore;
