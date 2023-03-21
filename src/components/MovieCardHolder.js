import React, { useContext } from "react";
import MovieCard from "./MovieCard";
import { Context } from "../context/AppContext";
import  CircularProgress  from "@mui/material/CircularProgress";
import { styled } from "@mui/styles";

const Wrapper = styled("div")(() => ({
  display: "flex",
  marginLeft: "40px",
  flexWrap: "wrap",
  flexDirection: "row",
}));
const ProgressWrapper = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
}));

const MovieCardHolder = () => {
  const { movieData, loading } = useContext(Context);
  return loading ? (
    <ProgressWrapper>
      <CircularProgress />
    </ProgressWrapper>
  ) : (
    <Wrapper>
      {movieData.map((val)=> {
        return <MovieCard key={val.imdbID} item={val} />;
      })}
    </Wrapper>
  );
};

export default MovieCardHolder;
