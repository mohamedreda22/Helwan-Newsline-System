import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import Collages from "./pages/Collages";

function App() {
  return (
    <div className="App">
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="/collages" element={<Collages />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </>
    </div>
  );
}

export default App;
