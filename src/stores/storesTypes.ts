export type Breed = {
  weight: {
    metric: string;
  };
  id: string;
  name: string;
  temperament: string;
  origin: string;
  description: string;
  life_span: string;
  image: {
    id: string;
    url: string;
  };
};

export type BreedsColl = Array<Breed>;

export type BreedItemForSelect = {
  id: string;
  name: string;
};

export type AllBreedsForSelect = Array<BreedItemForSelect>;

export type GalleryItem = {
  id: string;
  url: string;
};

export type GalleryColl = Array<GalleryItem>;

export type GalleryFilterState = {
  limit: string;
  order: string;
  breeds_ids?: string;
  mime_types: string;
  page: number;
};

export type UploadState = 'noFile' | 'waiting' | 'sending' | 'failed' | 'success';

export type VotesItem = {
  id: number;
  imageId: string;
  createdAt: string;
  value: number;
  image: {
    id: string;
    url: string;
  };
  result: {
    action: string;
    fromTo: string;
  };
};

export type VotesColl = Array<VotesItem>;

export type FavouritesItem = {
  id: number;
  imageId: string;
  createdAt: string;
  image: {
    id: string;
    url: string;
  };
};

export type FavouritesColl = Array<FavouritesItem>;
