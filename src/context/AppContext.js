import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";

import { MY_SERIES, POPULAR_SERIES } from "../constants/constants";

import { fetchDataFromAPI } from "../utils/api";

export const Context = createContext();

export const AppContext = ({ children }) => {
  // State variables
  const [movieData, setMovieData] = useState([]);
  const [seasonData, setSeasonData] = useState([]);
  const [selectedSeriesName, setSelectedSeriesName] = useState("");
  const [ratingsForSelectedItem, setRatingsForSelectedItem] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get series data (popular or my series)
  const getSeries = async (isPopularSelected) => {
    const category = isPopularSelected ? POPULAR_SERIES : MY_SERIES;
    setMovieData([]);
    setRatingsForSelectedItem([]);
    const promises = category.map((title) => getDataByName(title));
    const results = await Promise.allSettled(promises);
    const movies = results
      .filter((result) => result.status === "fulfilled")
      .map((result) => result.value);
    setMovieData(movies);
  };


  // Get data for a series by name
  const getDataByName = async (title) => {
    setLoading(true);
    const result = await fetchDataFromAPI("t=" + title);
    getAllSeasons(result.Title, result.totalSeasons);
    setLoading(false);
    return result;
  };

   // Get total number of episodes for a series
  const getTotalEpisodes = useMemo(() => (seriesName) => {
    let epCount = 0;
    seasonData[seriesName].forEach((item) => {
      epCount += item.Episodes.length;
    });
    setMovieData((data) => {
      const newData = [...data];
      const index = newData.findIndex((item) => item.Title === seriesName);
      newData[index].ep = epCount;
      return newData;
    });
  }, [seasonData]);

   // Handle selection of a series
  const onSeriesSelect = (title) => {
    if (title === selectedSeriesName) return;
    setSelectedSeriesName(title);
    const ratingsForSelectedItems = [];
    getTotalEpisodes(title);
    console.log("",seasonData);
    seasonData[title] !== undefined &&
      seasonData[title].forEach((season) => {
        let rating = 0;
        season.Episodes.forEach((ep) => {
          if (ep.imdbRating !== "N/A") {
            rating = rating + Number(ep.imdbRating);
          }
        });
        const ratingValue = parseFloat(
          parseInt(((rating * 10) / season.Episodes.length) * 10) / 10
        );
        ratingsForSelectedItems.push({
          rating: ratingValue,
          SeasonNo: season.Season,
        });
      });
    setRatingsForSelectedItem(ratingsForSelectedItems);
  };
// Get all seasons of a series
  const getAllSeasons = async (name, totalSeasons) => {
    setSeasonData([]);
    const promises = [];
    for (let i = 1; i <= totalSeasons; i++) {
      const promise = fetchDataFromAPI(
        "t=" + name + "&Season=" + i + "&plot=full"
      );
      promises.push(promise);
    }
    const results = await Promise.all(promises);
    setSeasonData((data) => {
      return { ...data, [name]: [...(data[name] || []), ...results] };
    });
  };

  // Sort by query 
  const sortBy = (params) => {
    setRatingsForSelectedItem([]);
    setSelectedSeriesName("");
    setMovieData((data) => {
      const newData = [...data];
      if (params === "ZA") {
        newData.sort((a, b) => b.Title.localeCompare(a.Title));
      } else if (params === "AZ") {
        newData.sort((a, b) => a.Title.localeCompare(b.Title));
      } else if (params === "HL") {
        newData.sort((a, b) => (a.imdbRating - b.imdbRating <= 0 ? 1 : -1));
      } else {
        newData.sort((a, b) => (a.imdbRating - b.imdbRating > 0 ? 1 : -1));
      }
      return newData;
    });
  };

  //Search by query
  const searchBy = useCallback(
    async (searchQuery) => {
      try {
        const res = await fetchDataFromAPI("s=" + searchQuery);
        if (res.Search !== undefined) {
          setSearchData(res.Search);
        }
      } catch (err) {
        setSearchData([]);
      }
    },
    [setSearchData]
  );

  useEffect(() => {
    getSeries(false);
  }, []);

  return (
    <Context.Provider
      value={{
        movieData,
        selectedSeriesName,
        setSelectedSeriesName,
        setRatingsForSelectedItem,
        ratingsForSelectedItem,
        seasonData,
        searchData,
        searchBy,
        sortBy,
        onSeriesSelect,
        getSeries,
        loading,
      }}
    >
      {children}
    </Context.Provider>
  );
};
