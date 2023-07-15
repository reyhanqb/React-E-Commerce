import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { Grid, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {Stack} from "@mui/material";

const WishlistItems = (props) => {
  const { id, name, price } = props.data;
  const { removeWishlist } = useContext(ShopContext);
  return (
    <>
      <div>
        <Grid position="relative" justifyContent="center" alignitems="center">
          <Card sx={{ display: "table-row", gap: 2 }}>
            <CardActionArea>
              <CardContent sx={{ flex: 1, gap: 2, alignItems: "center" }}>
                    <Typography> {name}</Typography>
                    <Typography> {price}</Typography>
                    <br />
                <Button
                variant="contained"
                  onClick={() => {
                    removeWishlist(id);
                  }}
                >
                  Remove from wishlist
                </Button>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </div>
    </>
  );
};

export default WishlistItems;
