import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import { Button, IconButton } from "@mui/material";
import { Add, Delete, Remove } from "@material-ui/icons";



const Product = (props) => {
  const { id, name, price } = props.data;
  const { addItems, removeItems, cartItems, addWishlist } =
    useContext(ShopContext);

  const cartItemAmount = cartItems[id];

  return (
    <Card sx={{ display: "flex", gap: 2 }} justifyContent="center">
      <CardActionArea component="a" href="#">
        <CardContent sx={{ flex: 1 }}>
          <Typography>
            <h3>{name}</h3>
          </Typography>
          <Typography>
            <p>{price}</p>
          </Typography>
          <br />
          <Button startIcon={<Add/>}
            onClick={() => {
              addItems(id);
            }}
          >
          </Button>
          {cartItemAmount}
          <Button startIcon={<Remove/>}
            aria-label="delete"
            onClick={() => {
              removeItems(id);
            }}
          >
          </Button>
          <br />
          <Button onClick={() => addWishlist(id)}>Add to wishlist</Button>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Product;
