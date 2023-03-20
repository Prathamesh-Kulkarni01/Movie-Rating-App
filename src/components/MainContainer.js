import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../Home";
import Movies from "../Movies";
import TopNavBar from "./TopNavBar";
import TVShows from "../TVShows";

const MainContainer = () => {
  return (
    <div style={{ width: "100%" }}>
      <TopNavBar></TopNavBar>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/tv-shows" element={<TVShows />} />
          <Route exact path="/movies" element={<Movies />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default MainContainer;
