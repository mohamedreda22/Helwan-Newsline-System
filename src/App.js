

import React, { useState, useEffect } from "react";
import "./App.css";
import HomePage from "./components/homePage";
import Loading from "./components/loading";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return <div className="App">{isLoading ? <Loading /> : <HomePage />}</div>;
}

export default App;
