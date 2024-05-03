import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddUser from "./components/AddUser";
import Home from "./components/Home";
import ShowUsers from "./components/ShowUsers";
import DeleteUser from "./components/DeleteUser";
import Header from "./components/Header";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Users" element={<ShowUsers />} />
          <Route path="/Users/Add" element={<AddUser />} />
          <Route path="/Users/Delete" element={<DeleteUser />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}


export default App;
