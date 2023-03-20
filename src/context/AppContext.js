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
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    getMySeries();
    sortBy("");
  }, []);
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
    mySeries.map((title) => getDataByName(title));
  };
  const getPolularSeries = () => {
    setMovieData([]);
    setRatingsForSelectedItem([]);
    popularSeries.map((title) => getDataByName(title));
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
  const getAllSeasons = (name, totalSeasons) => {
    let totleEp = 0;
    setSeasonData([]) 
    for (let i = 1; i < totalSeasons; i++) {
      fatchDataFromAPI("t=" + name + "&Season=" + i + "&plot=full")
        .then((result) => {
          totleEp = totleEp + result.Episodes.length;
          setMovieData((data) => {
            const newData = [...data];
            const index = newData.findIndex((item) => item.Title === name);
            newData[index].ep = totleEp;
            return newData;
          });
          setSeasonData((data) => {
            return { ...data, [name]: [...(data[name] || []), result] };
          });
        })
        .catch((err) => {});
    }
  };
  const getDataByName = (title) => {
    setLoading(true)
    fatchDataFromAPI("t=" + title)
      .then((result) => {
        setMovieData((data) => [...data, result]);
        getAllSeasons(result.Title, result.totalSeasons);
     setLoading(false)
      })
      .catch((err) => {});
     
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
        loading
      }}
    >
      {children}
    </Context.Provider>
  );
};
