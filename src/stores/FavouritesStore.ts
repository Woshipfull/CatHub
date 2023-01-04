/* eslint-disable @typescript-eslint/comma-dangle */
import { makeAutoObservable, toJS } from 'mobx';
import sortBy from 'lodash/sortBy';

import { favouritesCont } from './tempData';

import { FavouritesColl } from './storesTypes';

export class FavouritesStore {
  private favouritesContent: FavouritesColl = [];

  constructor() {
    makeAutoObservable(this);
    // this.initFavouritesStore();
  }

  get getFavourites() {
    return toJS(this.favouritesContent);
  }

  isInFavourites = (imgId: string) => {
    const filtered = this.favouritesContent.filter(
      ({ imageId }) => imageId === imgId
    );
    return filtered.length > 0;
  };

  initFavouritesStore = () => {
    const proccessed: FavouritesColl = favouritesCont.map((f) => {
      const newObj = {
        id: f.id,
        imageId: f.image_id,
        createdAt: f.created_at,
        image: f.image,
      };

      return newObj;
    });

    const sortByDate = (array: FavouritesColl) =>
      sortBy(array, (item) => item.createdAt).reverse();

    this.favouritesContent = sortByDate(proccessed);
  };
}

const favouritesStore = new FavouritesStore();

export default favouritesStore;
