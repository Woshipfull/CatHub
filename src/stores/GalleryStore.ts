/* eslint-disable @typescript-eslint/no-unused-vars */
import { makeAutoObservable, toJS } from 'mobx';
import { createContext, useContext } from 'react';

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
