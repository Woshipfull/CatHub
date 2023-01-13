/* eslint-disable @typescript-eslint/comma-dangle */
import { makeAutoObservable, runInAction, toJS } from 'mobx';
import sortBy from 'lodash/sortBy';

import { getFavourites, postFavourite, delFavourite } from './requests';
import { FavouritesColl } from './storesTypes';

export class FavouritesStore {
  private favouritesContent: FavouritesColl = [];

  private subId = '';

  private loaded = false;

  public errors: string[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  set setSubId(str: string) {
    this.subId = str;
    this.fetchData();
  }

  get getFavourites() {
    return toJS(this.favouritesContent);
  }

  get isLoaded() {
    return this.loaded;
  }

  get getErrors() {
    return toJS(this.errors);
  }

  isInFavourites = (imgId: string) => {
    const filtered = this.favouritesContent.filter(
      ({ imageId }) => imageId === imgId
    );
    return filtered.length > 0;
  };

  addToFavourite = (imgId: string) => {
    postFavourite(imgId, this.subId).then(() => this.fetchData());
  };

  removeFromFavourite = (imgId: string) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { id } = this.favouritesContent.find(
      (item) => item.imageId === imgId
    )!;
    delFavourite(id).then(() => this.fetchData());
  };

  fetchData = () => {
    this.loaded = false;
    getFavourites(this.subId).then((response) => {
      if (typeof response === 'string') {
        runInAction(() => {
          this.errors.push(response);
        });
        return;
      }
      const proccessed: FavouritesColl = response.map(
        (f: {
          id: string;
          image_id: string;
          created_at: string;
          image: string;
        }) => {
          const newObj = {
            id: f.id,
            imageId: f.image_id,
            createdAt: f.created_at,
            image: f.image,
          };

          return newObj;
        }
      );

      const sortByDate = (array: FavouritesColl) =>
        sortBy(array, (item) => item.createdAt).reverse();

      runInAction(() => {
        this.errors = [];
        this.favouritesContent = sortByDate(proccessed);
        this.loaded = true;
      });
    });
  };
}

const favouritesStore = new FavouritesStore();

export default favouritesStore;
