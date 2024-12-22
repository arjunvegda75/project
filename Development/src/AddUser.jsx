import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const AddUser = () => {
  const [userData, setUserData] = useState({
    username: "",
    age: "",
    gender: "",
  });
  const [id, setId] = useState(null);
  const navigate = useNavigate();
  const { userId } = useParams(); // Capture userId from URL if it's provided

  useEffect(() => {
    if (userId) {
      // Fetch user data for editing
      axios.get(`http://localhost:3000/users/${userId}`).then((res) => {
        setUserData(res.data);
        setId(res.data.id);
      });
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const saveData = (e) => {
    e.preventDefault();
    if (id) {
      // Update existing user data
      axios.put(`http://localhost:3000/users/${id}`, userData).then(() => {
        navigate("/"); // Navigate to the user list page after update
      });
    } else {
      // Add new user data
      axios.post("http://localhost:3000/users", userData).then(() => {
        navigate("/"); // Navigate to the user list page after adding
      });
    }
  };

  return (
    <div>
      <h3>{id ? "Edit User" : "Add User"}</h3>
      <form onSubmit={saveData}>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={userData.username}
          onChange={handleChange}
        />
        <br />
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={userData.age}
          onChange={handleChange}
        />
        <br />
        <label>Gender:</label>
        <input
          type="radio"
          name="gender"
          value="male"
          onChange={handleChange}
          checked={userData.gender === "male"}
        />
        Male
        <input
          type="radio"
          name="gender"
          value="female"
          onChange={handleChange}
          checked={userData.gender === "female"}
        />
        Female
        <br />
        <button type="submit">{id ? "Update" : "Save"}</button>
      </form>
    </div>
  );
};

export default AddUser;
