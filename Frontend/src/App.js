import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserState from "./Context/UserState";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
function App() {
  return (
    <BrowserRouter>
      <UserState>
        <div>
          <h1>
            Welcome To <span>Cliffex</span>
          </h1>
        </div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/users" element={<Home />} />
        </Routes>
      </UserState>
    </BrowserRouter>
  );
}

export default App;
