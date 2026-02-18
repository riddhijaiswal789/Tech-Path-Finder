import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DomainPage from "./pages/DomainPage";  
import QuizPage from "./pages/QuizPage";
import ScoreCard from "./pages/ScoreCard";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
       <Route path="/login" element={<Login />} />
       <Route path="/register" element={<Register />} />
       <Route path="/domain/:domain" element={<DomainPage />} />
       <Route path="/quiz/:domain" element={<QuizPage />} />
       <Route path="/score/:domain" element={<ScoreCard />} />
       <Route path="/profile" element={<Profile />} />


      </Route>
    </Routes>
  );
}

export default App;
 