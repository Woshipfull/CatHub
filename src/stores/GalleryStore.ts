import { makeAutoObservable, toJS } from 'mobx';

import { galleryContent } from './tempData';

import { GalleryColl, GalleryFilterState } from './storesTypes';

export class GalleryStore {
  private galleryContent: GalleryColl = [];

  private galleryFilterState: GalleryFilterState = {
    limit: '10',
    order: 'random',
    breed: 'none',
    type: 'all',
  };

  constructor() {
    makeAutoObservable(this);
  }

  get getGalleryFilterState() {
    return toJS(this.galleryFilterState);
  }

  get getGalleryContent() {
    this.galleryContent = galleryContent;
    return toJS(this.galleryContent);
  }

  set setGalleryFilterState(newState: GalleryFilterState) {
    this.galleryFilterState = newState;
  }
}

const galleryStore = new GalleryStore();

export default galleryStore;
