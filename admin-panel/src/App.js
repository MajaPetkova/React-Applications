import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss"
import { useContext, useState } from "react";
import { DarkModeContext } from "./context/darkModeContext";

function App() {
const {darkMode} = useContext(DarkModeContext)

return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home  />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/users">
            <Route index element={<List />}></Route>
            <Route path=":userId" element={<Single />}></Route>
            <Route path="new" element={<New inputs= {userInputs} title="Add new user"/>}></Route>
          </Route>
          <Route path="/products">
            <Route index element={<List />}></Route>
            <Route path=":productId" element={<Single />}></Route>
            <Route path="new" element={<New inputs={productInputs} title="Add new Product" />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
