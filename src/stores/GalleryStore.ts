import { makeAutoObservable, runInAction, toJS } from 'mobx';
import { omit } from 'lodash';

import { getGalleryContent, upload } from './requests';

import { GalleryColl, GalleryFilterState, UploadState } from './storesTypes';
import favouritesStore from './FavouritesStore';

export class GalleryStore {
  private galleryContent: GalleryColl = [];

  private galleryFilterState: GalleryFilterState = {
    limit: '10',
    order: 'RANDOM',
    breeds_ids: 'none',
    mime_types: 'jpg,gif,png',
    page: 0,
  };

  private maxPage = 20;

  private loaded = false;

  private subId = '';

  private errors: string[] = [];

  private file: File | null = null;

  private uploadState: UploadState = 'noFile';

  constructor() {
    makeAutoObservable(this);
    this.fetchData();
  }

  get getGalleryFilterState() {
    return toJS(this.galleryFilterState);
  }

  get getGalleryContent() {
    return toJS(this.galleryContent);
  }

  set setGalleryFilterState(newState: GalleryFilterState) {
    this.galleryFilterState = newState;
    this.fetchData();
  }

  get getCurrentPage() {
    return this.galleryFilterState.page;
  }

  get getMaxPage() {
    return this.maxPage;
  }

  get isLoaded() {
    return this.loaded;
  }

  get getErrors() {
    return toJS(this.errors);
  }

  set setSubId(str: string) {
    this.subId = str;
  }

  get getFile() {
    return this.file;
  }

  set setFile(file: File | null) {
    this.file = file;
    this.uploadState = 'waiting';
  }

  get getUploadState() {
    return this.uploadState;
  }

  setPage = (number: number) => {
    this.galleryFilterState.page = number - 1;
    this.galleryContent = [];
    this.fetchData();
  };

  uploadPhoto = () => {
    if (this.file) {
      this.uploadState = 'sending';
      const formData = new FormData();
      formData.append('file', this.file);
      formData.append('sub_id', this.subId);
      upload(formData).then((response) => {
        console.log(response);
        if (typeof response === 'string') {
          runInAction(() => {
            this.uploadState = 'failed';
          });
          return;
        }
        runInAction(() => {
          this.uploadState = 'success';
          favouritesStore.addToFavourite(response.id);
        });
      });
    }
  };

  fetchData = () => {
    this.loaded = false;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { breeds_ids } = this.galleryFilterState;
    const requestQueryParams =
      breeds_ids !== 'none'
        ? this.galleryFilterState
        : omit(this.galleryFilterState, 'breeds_ids');
    getGalleryContent(requestQueryParams).then((response) => {
      if (typeof response === 'string') {
        runInAction(() => {
          this.errors.push(response);
        });
        return;
      }
      runInAction(() => {
        this.errors = [];
        this.galleryContent = response.data;
        this.loaded = true;
      });
    });
  };
}

const galleryStore = new GalleryStore();

export default galleryStore;
