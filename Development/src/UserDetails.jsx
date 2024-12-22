import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserDetails = () => {
  const [userData, setUserData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3000/users/${id}`).then((res) => {
      setUserData(res.data);
    });
  }, [id]);

  return (
    <div className="userdetail">
      <h3>User Details</h3>
      <p><strong>Username:</strong> {userData.username}</p>
      <p><strong>Age:</strong> {userData.age}</p>
      <p><strong>Gender:</strong> {userData.gender}</p>
    </div>
  );
};

export default UserDetails;
