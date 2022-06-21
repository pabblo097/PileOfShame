export type Game = {};

export type GameShort = {
  id: number;
  cover: Cover;
  first_release_date: number;
  genres: Genre[];
  name: string;
  platforms: Platform[];
  summary: string;
};

export type Cover = {
  id: number;
  image_id: string;
};

export type Genre = {
  id: number;
  name: string;
};

export type Platform = {
  id: number;
  name: string;
};
