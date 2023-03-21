import { Box, FormControl, MenuItem, Select } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import MovieCardHolder from "./components/MovieCardHolder";
import RatingCardHolder from "./components/RatingCardHolder";
import { Context } from "./context/AppContext";

const TVShows = () => {
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <TVShowsToolbar/>
      <MovieCardHolder/>
      <RatingCardHolder/>
    </Box>
  );
};

export default TVShows;

export const TVShowsToolbar = () => {
  const { getSeries } = useContext(Context);
  const [selectedCategory, setSelectedCategory] = useState(1);

  

  console.log(sometingnotdefined)

  
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
          variant="contained"
          style={
            selectedCategory === 1
              ? { backgroundColor: "#FCBC34", color: "black" }
              : { backgroundColor: "white", color: "gray" }
          }
          sx={{
            color: "black",
            fontWeight: "550",
            marginLeft: "50px",
            borderRadius: "0px",
            width: "160px",
            height: "45px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => {
            setSelectedCategory(1);
            getSeries();
          }}
        >
          My Series
        </Box>
        <Box
          variant="contained"
          style={
            selectedCategory === 2
              ? { backgroundColor: "#FCBC34", color: "black" }
              : { backgroundColor: "white", color: "gray" }
          }
          sx={{
            color: "black",
            fontWeight: "550",
            borderRadius: "0px",
            width: "160px",
            height: "45px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => {
            setSelectedCategory(2);
            getSeries(true);
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
  const { sortBy } = useContext(Context);

  const handleChange = (event) => {
    sortBy(event.target.value);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", marginLeft: "30px" }}>
      <p style={{ color: "gray" }}>Sort By </p>

      <FormControl sx={{ m: 2, minWidth: 260 }}>
        {/* <InputLabel id="demo-simple-select-label">{label}</InputLabel> */}
        <Select
          defaultValue={"LA"}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={(e) => handleChange(e)}
        >
          <MenuItem value={"AZ"}>Sort Alphabetically(A-Z)</MenuItem>
          <MenuItem value={"ZA"}>Sort Alphabetically(Z-A)</MenuItem>
          <MenuItem value={"LH"}>Rating(Low to High)</MenuItem>
          <MenuItem value={"HL"}>Rating(High to Low)</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
