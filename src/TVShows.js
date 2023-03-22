import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";

import React, { useContext, useState } from "react";
import MovieCardHolder from "./components/MovieCardHolder";
import RatingCardHolder from "./components/RatingCardHolder";
import { Context } from "./context/AppContext";

const TVShows = () => {
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <TVShowsToolbar />
      <MovieCardHolder />
      <RatingCardHolder />
    </Box>
  );
};

export default TVShows;

export const TVShowsToolbar = () => {
  const { getSeries } = useContext(Context);
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
          variant="contained"
          sx={{
            backgroundColor:
              selectedCategory === 1 ? "#FCBC34" : "white",
            color: selectedCategory === 1 ? "black" : "gray",
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
          sx={{
            backgroundColor:
              selectedCategory === 2 ? "#FCBC34" : "white",
            color: selectedCategory === 2 ? "black" : "gray",
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
const [searchQuery, setSearchQuery] = useState("HL")
  const handleChange = (event) => {
    sortBy(event.target.value);
    setSearchQuery(event.target.value)
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", marginLeft: "30px" }}>
      <p style={{ color: "gray" }}>Sort By </p>

      <FormControl sx={{ m: 2, minWidth: 260 }}>
        <Select
          value={searchQuery}
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
