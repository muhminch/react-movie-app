const conf = {
  MOVIE_URL: String(import.meta.env.VITE_TMDB_MOVIE_URL),
  MOVIE_API_KEY: String(import.meta.env.VITE_TMDB_API_KEY),
  APPWRITE_URL: String(import.meta.env.VITE_APPWRITE_URL),
  APPWRITE_PROJECT_ID: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  APPWRITE_DATABASE_ID: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  APPWRITE_COLLECTION_ID: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
};

export default conf;
