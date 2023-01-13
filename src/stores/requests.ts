/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

import {
  BreedsColl,
  AllBreedsForSelect,
  GalleryFilterState,
  GalleryColl,
} from './storesTypes';

const instance = axios.create({
  baseURL: 'https://api.thecatapi.com/v1/',
  headers: {
    'x-api-key':
      'live_l0jg8zbQbuegTARZ4rYZFBIMdYRJwR0pMBMgrtvknJ1Ot9ocNbsJfGTrirSLJOiO',
    'content-type': 'application/json',
  },
});

export default instance;

// ---------   BREEDS   ----------

const proccessBreeds = (array: any): BreedsColl => {
  const withPhoto = array.filter((item: any) => item.image);
  return withPhoto.map((item: any) => {
    if (!item.image) {
      return null;
    }
    const newItem = {
      weight: item.weight.metric,
      id: item.id,
      name: item.name,
      temperament: item.temperament,
      origin: item.origin,
      description: item.description,
      life_span: item.life_span,
      image: {
        id: item.image.id,
        url: item.image.url,
      },
    };
    return newItem;
  });
};

const processBreedsForSelect = (array: any): AllBreedsForSelect => {
  const withPhoto = array.filter((item: any) => item.image);
  return withPhoto.map((item: any) => {
    const newItem = { id: item.id, name: item.name };
    return newItem;
  });
};

export const getBreedsContent = () =>
  instance
    .get('breeds')
    .then(({ data }) => proccessBreeds(data))
    .catch((error) => error.message);

export const getBreedsForSelect = () =>
  instance
    .get('breeds')
    .then(({ data }) => processBreedsForSelect(data))
    .catch((error) => error.message);

// ---------   GALLERY   ----------

const processGalleryContent = (array: any): GalleryColl =>
  array.map((item: any) => {
    const newItem = { id: item.id, url: item.url };
    return newItem;
  });

export const getGalleryContent = (requestQueryParams: GalleryFilterState) =>
  instance
    .get('images/search', {
      params: requestQueryParams,
    })
    .then((response) => {
      const pagination = { count: '', page: '' };
      if (Object.hasOwn(response.headers, 'pagination-count')) {
        pagination.count = response.headers['pagination-count']!;
        pagination.page = response.headers['pagination-page']!;
      }
      const data = processGalleryContent(response.data);
      return { pagination, data };
    })
    .catch((error) => error.message);

export const upload = (path: string, subId: string) =>
  instance
    .post('images/upload2', {
      file: path,
      sub_id: subId,
    })
    .then((response) => response);

// ---------   VOTES   ----------

export const getVotes = (subId: string) =>
  instance
    .get(`votes?${subId}`)
    .then((response) => response.data)
    .catch((error) => error.message);

export const vote = (imageId: string, subId: string, value: number) =>
  instance
    .post('votes', {
      image_id: imageId,
      sub_id: subId,
      value,
    })
    .then((response) => response.data)
    .catch((error) => error.message);

// ---------   FAVOURITES   ----------

export const getFavourites = (subId: string) =>
  instance
    .get(`favourites?${subId}`)
    .then((response) => response.data)
    .catch((error) => error.message);

export const postFavourite = (imageId: string, subId: string) =>
  instance
    .post('favourites', { image_id: imageId, sub_id: subId })
    .then((response) => response.data)
    .catch((error) => error.message);

export const delFavourite = (favouriteId: number) =>
  instance
    .delete(`favourites/${favouriteId}`)
    .then((response) => response.data)
    .catch((error) => error.message);
