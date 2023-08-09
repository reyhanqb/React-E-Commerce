import { products } from "../../Products";
import Product from "./Product";
import { Grid } from "@mui/material";
import {URL} from "../../api/url"
import { useNavigate } from "react-router-dom";


const Shop = () => {

  const nav = useNavigate()

  const x = async () => {
    await URL.post("/auth/logout")
    localStorage.clear()
    nav("/login")
  }

  return (
    <>
      <div className="shop">
        <br />
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {products.map((product) => (
            <Grid item xs={6} sm={3} key={product.id}>
              <Product data={product} />
            </Grid>
          ))}
        </Grid>
        <button onClick={x}>Log out</button>
      </div>
    </>
  );
};

export default Shop;
