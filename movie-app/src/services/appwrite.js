import { Client, Databases, ID, Query } from "appwrite";
import conf from "../conf/conf";

export class AppWriteService {
  client = new Client();
  database;

  constructor() {
    this.client
      .setEndpoint(conf.APPWRITE_URL)
      .setProject(conf.APPWRITE_PROJECT_ID);

    this.database = new Databases(this.client);
  }

  async updateSearchCount(searchTerm, movie) {
    try {
      const result = await this.database.listDocuments(
        conf.APPWRITE_DATABASE_ID,
        conf.APPWRITE_COLLECTION_ID,
        [Query.equal("searchTerm", searchTerm)]
      );

      if (result.documents.length > 0) {
        const doc = result.documents[0];
        await this.database.updateDocument(
          conf.APPWRITE_DATABASE_ID,
          conf.APPWRITE_COLLECTION_ID,
          doc.$id,
          { count: doc.count + 1 }
        );
      } else {
        await this.database.createDocument(
          conf.APPWRITE_DATABASE_ID,
          conf.APPWRITE_COLLECTION_ID,
          ID.unique(),
          {
            searchTerm,
            count: 1,
            movie_id: movie.id,
            poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          }
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getTrendingMovies() {
    try {
      const result = await this.database.listDocuments(
        conf.APPWRITE_DATABASE_ID,
        conf.APPWRITE_COLLECTION_ID,
        [Query.limit(5), Query.orderDesc("count")]
      );

      return result.documents;
    } catch (error) {
      console.error(error);
    }
  }
}

const appWriteService = new AppWriteService();
export default appWriteService;
