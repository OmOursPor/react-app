import React from "react";
import axios from "axios";

const AddUser = () => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");

  /**
   * Fonction qui ajoute un utilisateur
   * @param {string} username - Nom d'utilisateur
   * @param {string} email - Email de l'utilisateur
   */
  const addUserFunction = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!username || !email) {
      return alert("Veuillez remplir tous les champs");
    }
    
    if (!emailRegex.test(email)) {
      return alert("Veuillez renseigner une adresse e-mail valide");
    }
  
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}api/users`,
        { username, email }
      );
      
      if (response.data._id) {
        alert("Utilisateur ajouté");
        setUsername("");
        setEmail("");
      } else {
        alert("Problème lors de l'ajout de l'utilisateur");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  return (
    <div>
      <h1>Ajouter un utilisateur:</h1>
      <form>
        <label htmlFor="username">Username:</label>
        <input
          placeholder="Username"
          id="username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />

        <label htmlFor="email">Email:</label>
        <input
          placeholder="Email"
          type="email"
          id="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          type="button"
          value="send"
          data-testid="send"
          onClick={addUserFunction}
        />
      </form>
    </div>
  );
};

export default AddUser;
