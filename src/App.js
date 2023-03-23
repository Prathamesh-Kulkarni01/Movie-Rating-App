import Box from "@mui/material/Box";

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppContext } from "./context/AppContext";
import Home from "./Home";
import TVShows from "./TVShows";
import Movies from "./Movies";
import TopNavBar from "./components/TopNavBar";
import LeftToolBar from "./components/LeftToolBar";

import "./App.css";

function App() {
  return (
    <AppContext>
      <Box className="App" sx={{ display: "flex",width:'100%' }}>
        <BrowserRouter>
          <LeftToolBar/>
          <Box sx={{ width: "100%", minHeight: "100vh",ml:10 ,mt:10}}>
            <TopNavBar />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/tv-shows" element={<TVShows />} />
              <Route exact path="/movies" element={<Movies />} />
            </Routes>
          </Box>
        </BrowserRouter>
      </Box>
    </AppContext>
  );
}

export default App;
