import React, { useEffect, useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();

  const langKey = useSelector((store) => store.config.lang);

  const searchText = useRef(null);
  // console.log(searchText?.current?.value);

  const text = searchText?.current?.value;

  const searchMovieTMDB = async (text) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        text +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    console.log(json);

    dispatch(addGptMovieResult({ movieName: text, movieResults: json }));
  };

  const handleGptSearchClick = () => {
    searchMovieTMDB(searchText?.current?.value);
  };

  return (
    <div className=" pt-[40%] md:pt-[10%] flex justify-center">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9"
          placeholder={lang[langKey]?.gptSearchPlaceholder}
        />
        <button
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
          onClick={handleGptSearchClick}
        >
          {lang[langKey]?.search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
