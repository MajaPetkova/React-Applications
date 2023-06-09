import "./App.css";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { User } from "./components/users/User";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { NotFound } from "./pages/NotFound";
import { GithubProvider } from "./context/github/GithubContext";
import { AlertProvider } from "./context/alert/AlertContext";

function App() {
  return (
    <GithubProvider>
      <AlertProvider>
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-container">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/user/:login" element={<User/>} />
            <Route path="/notfound" element={<NotFound/>}/>
            <Route path="/*" element={<NotFound/>}/>
          </Routes>
        </main>
        <Footer/>
      </div>
    </Router>
    </AlertProvider>
    </GithubProvider>
  );
}

export default App;
