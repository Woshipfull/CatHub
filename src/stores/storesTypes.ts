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
  width: number;
  height: number;
};

export type GalleryColl = Array<GalleryItem>;

export type GalleryFilterState = {
  limit: string;
  order: string;
  breed: string;
  type: string;
};
