import "./App.css";
import { Detail, Form, Home, Landing } from "./views";
import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";

function App() {
  const location = useLocation(); //es un Hook que lo utilizo para que me ayude a que la NavBar, se vea siempre, salvo en landing.

  return (
    <div className="App">
      {location.pathname === "/home" && <NavBar />}

      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<Form />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
