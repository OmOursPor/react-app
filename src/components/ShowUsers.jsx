import React from "react";
import axios from "axios";

const ShowUsers = () => {
  const [users, setUsers] = React.useState([]);

  const getUsers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}api/users`
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  React.useEffect(() => {
    users.length == 0 && getUsers();
  }, [users]);

  return (
    <div className="show-users">    
      <h1>Liste des utilisateurs</h1>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowUsers;
