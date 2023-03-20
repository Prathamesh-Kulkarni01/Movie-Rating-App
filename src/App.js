import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import TVShows from "./TVShows";
import Movies from "./Movies";
import TopNavBar from "./components/TopNavBar";
import LeftToolBar from "./components/LeftToolBar";
import { AppContext } from "./context/AppContext";

function App() {
  return (
    <AppContext>
      <div className="App">
        <div style={{ display: "flex" }}>
          <BrowserRouter>
            <LeftToolBar></LeftToolBar>
            <div style={{ width: "100%", minHeight: "100vh" }}>
              <TopNavBar></TopNavBar>

              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/tv-shows" element={<TVShows />} />
                <Route exact path="/movies" element={<Movies />} />
              </Routes>
            </div>
          </BrowserRouter>
        </div>
      </div>
    </AppContext>
  );
}

export default App;
