import { products } from "../../Products";
import Product from "./Product";
import { Grid } from "@mui/material";

const Shop = () => {
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
      </div>
    </>
  );
};

export default Shop;
