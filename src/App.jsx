import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Team from "./pages/Team";
import Strategies from "./pages/Strategies";
import Games from "./pages/Games";
import Contact from "./pages/Contact";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Favorites from "./pages/Favorites";
import Logout from "./pages/Logout";
import UserMessages from "./pages/UserMessages";
import Inbox from "./pages/Inbox";
import StratDetail from "./pages/StrategyDetail";
import "./styles/styles.css";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<Team />} />
          <Route path="/strategies" element={<Strategies />} />
          <Route path="/games" element={<Games />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />}/>
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/messages" element={<UserMessages />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/strategy/:game/:name" element={<StratDetail />} />
        </Routes>
      </main>
      <Footer/>
    </>
  );
}