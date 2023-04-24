import "./App.css";
import Home from "./pages/Home";
import Confirm from "./pages/Confirm";
import Error from "./pages/Error";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/invite/verify/:token" element={<Confirm />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
