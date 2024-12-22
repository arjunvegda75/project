import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddUser from "./AddUser";
import UserList from "./UserList";
import UserDetails from "./UserDetails";
import './Style.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/add-user/:userId?" element={<AddUser />} /> 
          <Route path="/user/:id" element={<UserDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
