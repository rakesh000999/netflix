import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const { movieName, movieResults } = useSelector((store) => store.gpt);

  if (!movieName) return null;

  return (
    <div className="p-4 m-4 bg-black text-white bg-opacity-85">
      <div>
        <MovieList title={movieName} movies={movieResults?.results}/>
      </div>
    </div>
  );
};

export default GptMovieSuggestions;
