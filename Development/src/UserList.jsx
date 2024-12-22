import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const UserList = () => {
  const [allData, setAllData] = useState([]);

  const fetchData = () => {
    axios.get("http://localhost:3000/users").then((res) => {
      setAllData(res.data);
    });
  };

  const delData = (id) => {
    axios.delete(`http://localhost:3000/users/${id}`).then(() => {
      fetchData();
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h3>User List</h3>
      <Link to="/add-user">
        <button>Add User</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Username</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allData.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.age}</td>
              <td>{user.gender}</td>
              <td>
                <Link to={`/user/${user.id}`}>
                  <button>View</button>
                </Link>
                <button onClick={() => delData(user.id)}>Delete</button>
                {/* Route to /add-user/:id for editing */}
                <Link to={`/add-user/${user.id}`}>
                  <button>Edit</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
