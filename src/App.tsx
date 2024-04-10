import React from "react";
import "./App.css";

import { Route, Routes } from "react-router-dom";
import { navigPaths } from "./navigationPaths";

import { AllFilms } from "./pages/AllFimls/AllFilms";
import { LikedFilms } from "./pages/LikedFimls/LikedFilms";
import { Footer } from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={navigPaths.main} element={<AllFilms />} />
        <Route path={navigPaths.liked} element={<LikedFilms />} />
      </Routes>

      <Footer></Footer>
    </div>
  );
}

export default App;
