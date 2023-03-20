import React, { createContext, useEffect, useState } from "react";

import { mySeries, popularSeries } from "../constants/constants";

import { fatchDataFromAPI } from "../utils/api";

export const Context = createContext();

export const AppContext = ({ children }) => {
  const [movieData, setMovieData] = useState([]);
  const [seasonData, setSeasonData] = useState([]);
  const [selectedSeriesName, setSelectedSeriesName] = useState("");
  const [ratingsForSelectedItem, setRatingsForSelectedItem] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(false);

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
  const getMySeries = () => {
    setMovieData([]);
    setRatingsForSelectedItem([]);
    mySeries.forEach((title) => {
      getDataByName(title);
    });
  };
  const getPolularSeries = () => {
    setMovieData([]);
    setRatingsForSelectedItem([]);
    popularSeries.forEach((title) => { getDataByName(title);

   
    });
  };
  const onSeriesSelect = (title) => {
    if (title === selectedSeriesName) return;
    setSelectedSeriesName(title);

    const ratingsForSelectedItems = [];

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
  //Updated logic
  const getAllSeasons = (name, totalSeasons) => {
    let totleEp = 0;
    setSeasonData([]);
    setMovieData((data) => {
      const newData = [...data];
      const promises = [];
      for (let i = 1; i < totalSeasons; i++) {
        const promise = fatchDataFromAPI(
          "t=" + name + "&Season=" + i + "&plot=full"
        );

        promises.push(promise);
      }

      Promise.all(promises).then((results) => {
        results.forEach((result) => {
          totleEp = totleEp + result.Episodes.length;
          const index = newData.findIndex((item) => item.Title === name);
          const newObj = { ...newData[index] };
          newObj.ep = totleEp;
          newData[index] = newObj;
        });

        setSeasonData((data) => {
          return { ...data, [name]: [...(data[name] || []), ...results] };
        });
      });
      return newData;
    });
  };

  const getDataByName = (title) => {
    setLoading(true);
    const promise = fatchDataFromAPI("t=" + title);
    promise.then((result) => {
      setMovieData((data) => [...data, result]);
      getAllSeasons(result.Title, result.totalSeasons);
      setLoading(false);
    });
  };
  const sortBy = (params) => {
    setRatingsForSelectedItem([]);
    setSelectedSeriesName("");
    setMovieData((data) => {
      const newData = [...data];
      if (params === "Sort Alphabetically(A-Z)") {
        newData.sort((a, b) => a.Title.localeCompare(b.Title));
      } else {
        newData.sort((a, b) => (a.imdbRating - b.imdbRating < 0 ? 1 : -1));
      }
      return newData;
    });
  };

  useEffect(() => {
    getMySeries();
    sortBy("");
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
        getPolularSeries,
        getMySeries,
        loading,
      }}
    >
      {children}
    </Context.Provider>
  );
};
