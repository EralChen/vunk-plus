export type Movie = {
  id: string;
  title: string;
  release_date: string;
  episode_id: number;
};

export type MovieDetails = Movie & {
  director: string;
  producer: string;
};
