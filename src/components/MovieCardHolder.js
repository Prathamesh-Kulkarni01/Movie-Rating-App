import React, { useContext } from "react";
import MovieCard from "./MovieCard";
import { Context } from "../context/AppContext";
import { Box, CircularProgress } from "@mui/material";

const MovieCardHolder = () => {
  const { movieData, loading } = useContext(Context);
  return loading ? (
    <Box sx={{ display: "flex",justifyContent:'center' }}>
      <CircularProgress />
    </Box>
  ) : (
    <div
      style={{
        display: "flex",
        marginLeft: "40px",
        flexWrap: "wrap",
        flexDirection: "row",
      }}
    >
      {movieData.map((val, key) => {
        return <MovieCard key={val.imdbID} item={val} />;
      })}
    </div>
  );
};

export default MovieCardHolder;
