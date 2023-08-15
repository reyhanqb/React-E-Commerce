import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button } from "@mui/material";
import { Add, Remove } from "@material-ui/icons";



const Product = (props) => {
  const { id, name, price, image } = props.data;
  const { addItems, removeItems, cartItems, addWishlist } =
    useContext(ShopContext);

  const cartItemAmount = cartItems[id];

  return (
    <>
      <section className="bg-white py-8">
        <div class="container mx-auto flex items-center flex-wrap pt-4 pb-12">
        <Card sx={{ display: "flex", gap: 2 }} justifycontent="center">
          <CardActionArea>
            <CardContent sx={{ flex: 1 }}>
              <CardMedia
                component="img"
                height="140px"
                image={image}
              ></CardMedia>
              <Typography>{name}</Typography>
              <Typography>{price}</Typography>
              <br />
            </CardContent>
          </CardActionArea>
        </Card>
        </div>
      </section>
    </>
  );
};

export default Product;
