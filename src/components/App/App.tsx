import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieGrid from "../MovieGrid/MovieGrid";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSearch = async (query: string) =>{
    try{
      setMovies([]);
      setIsError(false);
      setIsLoading(true)

      const data = await fetchMovies(query);

      if(data.length === 0){
        toast.error("No movies found by this request.")
        return
      }
      setMovies(data);
    }catch{
      setIsError(true);
    }finally{
      setIsLoading(false);
    }

  }

  return (
    <>
      <SearchBar onSubmit={handleSearch}/>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movies.length > 0 && <MovieGrid movies={movies} />}
      <Toaster position="top-center" />
    </>
  )
}


