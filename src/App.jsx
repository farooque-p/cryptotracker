import React, { lazy, Suspense } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";

const Home = lazy(() => import("./pages/Home/Home"));
const Coin = lazy(() => import("./pages/Coin/Coin"));

function App() {
  return (
    <div className="app">
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coin/:coinId" element={<Coin />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;
