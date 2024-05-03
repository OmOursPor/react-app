import React from "react";
import axios from "axios";

const DeleteUser = () => {
  const [adminPassword, setAdminPassword] = React.useState("");
  const [userId, setUserId] = React.useState("");

  /**
 * Fonction qui supprime un utilisateur
 * @param {string} adminPassword - Mot de passe administrateur
 * @param {string} userId - Id de l'utilisateur à supprimer 
 */
  const removeUserFunction = async () => {
    if (adminPassword && userId) {
      try {
        const response = await axios.delete(
          `${process.env.REACT_APP_API_URL}api/users/${userId}`,
          { data: { adminPassword } }
        );
        response.data.success == true && alert("Utilisateur supprimé");
        response.data.success == false && alert(response.data.message);
        setAdminPassword("");
        setUserId(0);
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      alert("Veuillez remplir tout les champs");
    }
  };

  return (
    <div className="delete-users">
      <h1>Supprimer un utilisateur</h1>

      <form>
        <label htmlFor="adminPassword">Mot de passe administrateur:</label>
        <input
          data-testid="pwd"
          placeholder="mot de passe"
          name="adminPassword"
          id="adminPassword"
          type="password"
          value={adminPassword}
          onChange={(event) => setAdminPassword(event.target.value)}
        />

        <label htmlFor="userId">Id de l'utilisateur à supprimer:</label>
        <input
          data-testid="userId"
          placeholder="Id utilisateur"
          name="userId"
          id="userId"
          value={userId}
          onChange={(event) => setUserId(event.target.value)}
        />

        <input
          type="button"
          data-testid="send"
          value="send"
          onClick={removeUserFunction}
        />
      </form>
    </div>
  );
};

export default DeleteUser;
