import { Box,FormControl, InputLabel, Select } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import MovieCardHolder from "./components/MovieCardHolder";
import RatingCardHolder from "./components/RatingCardHolder";
import { Context } from "./context/AppContext";

const TVShows = () => {
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <TVShowsToolbar></TVShowsToolbar>
      <MovieCardHolder></MovieCardHolder>
      <RatingCardHolder></RatingCardHolder>
    </Box>
  );
};

export default TVShows;

export const TVShowsToolbar = () => {
  const { getPolularSeries, getMySeries } = useContext(Context);
  const [selectedCategory, setSelectedCategory] = useState(1);

  return (
    <Box
      sx={{
        flexWrap: "wrap",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: "30px",
      }}
    >
      <Box sx={{ padding: "15px", display: "flex", flexDirection: "row" }}>
        <Box
          
          style={
            selectedCategory === 1
            ? { backgroundColor: "#FCBC34" ,color:'black'}
            : { backgroundColor: "white" ,color:'gray'}
          }
          sx={{
            color: "black",
            fontWeight: "550",
            marginLeft: "50px",
            borderRadius: "0px",
            boxShadow:'none',
            width: "160px",
            height: "45px",
            display:'flex',
            justifyContent:'center',
            alignItems:'center'
          }}
          onClick={() => {
            setSelectedCategory(1);
            getMySeries();
          }}
        >
          My Series
        </Box>
        <Box
          variant="contained"
          style={
            selectedCategory === 2
              ? { backgroundColor: "#FCBC34" ,color:'black'}
              : { backgroundColor: "white" ,color:'gray'}
          }
          sx={{
            color: "black",
            fontWeight: "550",
            borderRadius: "0px",
            width: "160px",
            height: "45px",
            boxShadow:'none',
            display:'flex',
            justifyContent:'center',
            alignItems:'center'
          }}
          onClick={() => {
            setSelectedCategory(2);
            getPolularSeries();
          }}
        >
          Popular
        </Box>
      </Box>

      <SortBox />
    </Box>
  );
};

const SortBox = () => {
  const [label, setLabel] = useState("Rating(High to Low)");
  const { sortBy } = useContext(Context);
  useEffect(() => {
    sortBy(label);
  }, []);

  const handleSortClick = () => {
    setLabel(
      label === "Rating(High to Low)"
        ? "Sort Alphabetically(A-Z)"
        : "Rating(High to Low)"
    );
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", marginLeft: "30px" }}>
      <p style={{ color: "gray" }}>Sort By </p>

      <FormControl
        onClick={() => {
          handleSortClick();
          sortBy(label);
        }}
        sx={{ m: 2, minWidth: 260 }}
        disabled
      >
        <InputLabel id="demo-simple-select-disabled-label">{label}</InputLabel>
        <Select
          defaultValue=""
          labelId="demo-simple-select-disabled-label"
          id="demo-simple-select-disabled"
        ></Select>
      </FormControl>
    </Box>
  );
};
