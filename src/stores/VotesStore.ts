/* eslint-disable @typescript-eslint/comma-dangle */
import { makeAutoObservable, runInAction, toJS } from 'mobx';
import sortBy from 'lodash/sortBy';
import groupBy from 'lodash/groupBy';

import { getVotes, vote } from './requests';
import { VotesColl } from './storesTypes';

export class VotesStore {
  private likedContent: VotesColl = [];

  private dislikedContent: VotesColl = [];

  private history: VotesColl = [];

  private subId = '';

  private loaded = false;

  public errors: string[] = [];

  constructor() {
    makeAutoObservable(this);
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

  get isLoaded() {
    return this.loaded;
  }

  get getErrors() {
    return toJS(this.errors);
  }

  set setSubId(str: string) {
    this.subId = str;
    this.fetchData();
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

  addVote = (imgId: string, value: number) => {
    vote(imgId, this.subId, value).then(() => this.fetchData());
  };

  fetchData = () => {
    this.loaded = false;
    getVotes(this.subId).then((data) => {
      if (typeof data === 'string') {
        runInAction(() => {
          this.errors.push(data);
        });
        return;
      }
      const grouped = groupBy(data, (item) => item.image_id);
      const keys = Object.keys(grouped);

      const addedTo = (value: number) => (value > 0 ? 'Likes' : 'Dislikes');

      const proccessed: VotesColl[] = keys.map((key) => {
        const imgActions = grouped[key];

        let tempFromTo = '';
        return imgActions.map((v) => {
          const removed = v.value === 0;
          const action = removed ? 'was removed' : 'was added to';
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

      runInAction(() => {
        this.errors = [];
        this.history = history;
        this.likedContent = liked;
        this.dislikedContent = disliked;
        this.loaded = true;
      });
    });
  };
}

const votesStore = new VotesStore();

export default votesStore;
