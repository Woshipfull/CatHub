/* eslint-disable @typescript-eslint/comma-dangle */
import { makeAutoObservable, toJS } from 'mobx';
import sortBy from 'lodash/sortBy';
import groupBy from 'lodash/groupBy';

import { votesContent } from './tempData';

import { VotesColl } from './storesTypes';

export class VotesStore {
  private likedContent: VotesColl = [];

  private dislikedContent: VotesColl = [];

  private history: VotesColl = [];

  constructor() {
    makeAutoObservable(this);
    this.initVotesStore();
  }

  get getLiked() {
    return toJS(this.likedContent);
  }

  get getDisliked() {
    return toJS(this.dislikedContent);
  }

  get getHistory() {
    return toJS(this.history);
  }

  wasLiked = (imgId: string) => {
    const filtered = this.likedContent.filter(
      ({ imageId }) => imageId === imgId
    );
    return filtered.length > 0;
  };

  wasDisliked = (imgId: string) => {
    const filtered = this.dislikedContent.filter(
      ({ imageId }) => imageId === imgId
    );
    return filtered.length > 0;
  };

  initVotesStore = () => {
    const grouped = groupBy(votesContent, (item) => item.image_id);
    const keys = Object.keys(grouped);

    const addedTo = (value: number) => (value > 0 ? 'Likes' : 'Dislikes');

    const proccessed: VotesColl[] = keys.map((key) => {
      const imgActions = grouped[key];

      let tempFromTo = '';
      return imgActions.map((v) => {
        const removed = v.value === 0;
        const action = removed ? 'was removed from' : 'was added to';
        const fromTo = removed ? tempFromTo : addedTo(v.value);
        tempFromTo = fromTo;

        const newObj = {
          id: v.id,
          imageId: v.image_id,
          createdAt: v.created_at,
          value: v.value,
          image: v.image,
          result: { action, fromTo },
        };

        return newObj;
      });
    });

    const nonRepeatingImgs = proccessed.map((imgActions) => {
      const lastItemIndex = imgActions.length - 1;
      return imgActions[lastItemIndex];
    });

    const sortByDate = (array: VotesColl) =>
      sortBy(array, (item) => item.createdAt).reverse();

    const liked: VotesColl = sortByDate(
      nonRepeatingImgs.filter((item) => item.value > 0)
    );

    const disliked: VotesColl = sortByDate(
      nonRepeatingImgs.filter((item) => item.value < 0)
    );

    const history: VotesColl = sortByDate(proccessed.flat());

    this.history = history;
    this.likedContent = liked;
    this.dislikedContent = disliked;
  };
}

const votesStore = new VotesStore();

export default votesStore;
