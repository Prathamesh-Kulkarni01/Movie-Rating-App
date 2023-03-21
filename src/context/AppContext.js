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
    MY_SERIES.forEach((title) => {
      getDataByName(title);
    });
  };
  const getPolularSeries = () => {
    setMovieData([]);
    setRatingsForSelectedItem([]);
    POPULAR_SERIES.forEach((title) => {
      getDataByName(title);
    });
  };
  const onSeriesSelect = (title) => {
    if (title === selectedSeriesName) return;
    
    setSelectedSeriesName(title);
    // getTotalEpisodes(title)
    const ratingsForSelectedItems = [];
 getTotalEpisodes(title)
    seasonData[title] !== undefined &&
      seasonData[title].forEach((seasion) => {
        let rating = 0;
// getTotalEpisode+=seasion.Episodes.length;
// console.log(">>>>",seasion.Episodes);
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
      // console.log(getTotalEpisode);
    setRatingsForSelectedItem(ratingsForSelectedItems);
  };
  //Updated logic
  const getAllSeasons = async(name, totalSeasons) => {
    setSeasonData([]);
    const promises = [];
    for (let i = 1; i <= totalSeasons; i++) {
      const promise = fatchDataFromAPI(
        "t=" + name + "&Season=" + i + "&plot=full"
      );
      promises.push(promise);
    }
    const results=await Promise.all(promises)
    
      setSeasonData((data) => {
        return { ...data, [name]: [...(data[name] || []), ...results] };
      });
    
    setLoading(false);
  };

  const getTotalEpisodes=(seriesName)=>{
// console.log("=>",seasonData);
let epCount=0;
console.log("___>",seasonData[seriesName])
seasonData[seriesName].forEach(item=>{
  epCount+=item.Episodes.length;
})
setMovieData((data)=>{

const newData=[...data];
const index=newData.findIndex(item=>
  item.Title===seriesName
)
newData[index].ep=epCount
return newData
}
)




  }
  // let totleEp = 0;
  // results.forEach((result) => {
  //   totleEp = totleEp + result.Episodes.length;
  //   const index = newData.findIndex((item) => item.Title === name);
  //   const newObj = { ...newData[index] };
  //   newObj.ep = totleEp;
  //   newData[index] = newObj;
  // });
  const getDataByName = (title) => {
    setLoading(true);
    const promise = fatchDataFromAPI("t=" + title);
    promise.then((result) => {
      setMovieData((data) => [...data, result]);
      getAllSeasons(result.Title, result.totalSeasons);
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
