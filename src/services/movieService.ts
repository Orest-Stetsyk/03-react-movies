import axios from 'axios';
import type { Movie } from '../types/movie';

interface FetchMoviesResponse {
  results: Movie[];
}

export async function fetchMovies(query: string): Promise<Movie[]> {
  const options = {
    method: 'GET' as const,
    url: 'https://api.themoviedb.org/3/search/movie',
    params: { query },
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  };

  const response = await axios.request<FetchMoviesResponse>(options);
  return response.data.results;
}