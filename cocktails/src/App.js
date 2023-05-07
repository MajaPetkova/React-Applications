import {BrowserRouter, Routes, Route} from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Error } from "./pages/Error";
import { Navbar } from "./components/Navbar";
import { SingleCocktail } from "./components/SingleCocktail";



function App() {

  return <div className="App">
    <BrowserRouter>
      <Navbar/>
    <Routes>
      <Route exact path="/" element={ <Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/cocktail/:id" element={<SingleCocktail/>}/>
      <Route path="*" element={<Error/>}/>
    </Routes>
    </BrowserRouter>
  </div>;
}

export default App;
