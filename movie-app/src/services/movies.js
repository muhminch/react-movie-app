import conf from "../conf/conf";

export class MovieService {
  apiURL;
  apiKey;
  apiOptions;

  constructor() {
    this.apiURL = conf.MOVIE_URL;
    this.apiKey = conf.MOVIE_API_KEY;
    this.apiOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
    };
  }

  async getMovies(query = "") {
    const endpoint = query
      ? `${this.apiURL}/search/movie?query=${encodeURIComponent(query)}`
      : `${this.apiURL}/discover/movie?sort_by=popularity.desc`;
    const response = await fetch(endpoint, this.apiOptions);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();

    return data;
  }
}

const movieService = new MovieService();
export default movieService;
