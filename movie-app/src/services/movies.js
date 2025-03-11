import conf from "../conf/conf";

export class MovieService {
  apiURL;
  apiKKey;
  apiOptions;

  constructor() {
    this.apiKKey = conf.MOVIE_URL;
    this.apiKKey = conf.MOVIE_API_KEY;
    this.apiOptions = {
      accept: "applcation/json",
      Authorization: `Bearer ${this.apiKKey}`,
    };
  }

  async getMovies() {
    const endpoint = `${this.apiKKey}/genre/movie/list`;
    const response = await fetch(endpoint, this.apiOptions);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();

    return data;
  }
}
