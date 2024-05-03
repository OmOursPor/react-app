import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <p onClick={() => navigate("Users")}>Afficher liste des utilisateurs</p>
      <p onClick={() => navigate("Users/Add")}>Ajouter un utilisateur</p>
      <p onClick={() => navigate("Users/Delete")}>Supprimer un utlisateur</p>
    </div>
  );
};

export default Home