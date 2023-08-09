import { useNavigate, Link } from "react-router-dom";

const Homepage = () => {
   

  return (
    <>
      <p>This is the Homepage</p>
      <br />
      <Link to={"/login"}>Login</Link> to shop
    </>
  );
}

export default Homepage