import React, { createContext, useEffect, useState } from "react";

import { MY_SERIES, POPULAR_SERIES } from "../constants/constants";

import { fatchDataFromAPI } from "../utils/api";

export const Context = createContext();

export const AppContext = ({ children }) => {
  const [movieData, setMovieData] = useState([]);
  const [seasonData, setSeasonData] = useState([]);
  const [selectedSeriesName, setSelectedSeriesName] = useState("");
  const [ratingsForSelectedItem, setRatingsForSelectedItem] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getSeries = async (isPopulerSelected) => {
    const category = isPopulerSelected ? POPULAR_SERIES : MY_SERIES;
    setMovieData([]);
    const promises = [];
    setRatingsForSelectedItem([]);
    category.forEach((title) => {
      const promise = getDataByName(title);
      promises.push(promise);
    });
    const result = await Promise.all(promises);
    setMovieData(result);
  };

  const getDataByName = async (title) => {
    setLoading(true);
    const result = await fatchDataFromAPI("t=" + title);
    getAllSeasons(result.Title, result.totalSeasons);
    return result;
  };

  const getTotalEpisodes = (seriesName) => {
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
  };

  const onSeriesSelect = (title) => {
    if (title === selectedSeriesName) return;
    setSelectedSeriesName(title);
    const ratingsForSelectedItems = [];
    getTotalEpisodes(title);
    seasonData[title] !== undefined &&
      seasonData[title].forEach((seasion) => {
        let rating = 0;
        seasion.Episodes.forEach((ep) => {
          if (ep.imdbRating !== "N/A") {
            rating = rating + Number(ep.imdbRating);
          }
        });
        const ratingValue = parseFloat(
          parseInt(((rating * 10) / seasion.Episodes.length) * 10) / 10
        );
        ratingsForSelectedItems.push({
          rating: ratingValue,
          SeasonNo: seasion.Season,
        });
      });
    setRatingsForSelectedItem(ratingsForSelectedItems);
  };

  const getAllSeasons = async (name, totalSeasons) => {
    setSeasonData([]);
    const promises = [];
    for (let i = 1; i <= totalSeasons; i++) {
      const promise = fatchDataFromAPI(
        "t=" + name + "&Season=" + i + "&plot=full"
      );
      promises.push(promise);
    }
    const results = await Promise.all(promises);

    setSeasonData((data) => {
      return { ...data, [name]: [...(data[name] || []), ...results] };
    });

    setLoading(false);
  };

  const sortBy = (params) => {
    setRatingsForSelectedItem([]);
    setSelectedSeriesName("");
    setMovieData((data) => {
      const newData = [...data];
      if (params === "ZA") {
        newData.sort((a,b) => b.Title.localeCompare(a.Title));
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

  const searchBy = (searchQuery) => {
    fatchDataFromAPI("s=" + searchQuery)
      .then((res) => {
        if (res.Search !== undefined) {
          setSearchData(res.Search);
        }
      })
      .catch((err) => {
        setSearchData([]);
      });
    return;
  };

  useEffect(() => {
    getSeries();

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
