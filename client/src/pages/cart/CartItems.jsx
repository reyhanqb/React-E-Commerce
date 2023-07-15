import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import { Button, TextField } from "@mui/material";
import { Add, Remove } from "@material-ui/icons";
import { Grid } from "@mui/material";


const CartItems = (props) => {
  let { id, name, price } = props.data;
  const { cartItems, addItems, removeItems, updateCartItems } =
    useContext(ShopContext);

  return (
    <>
      <br />
      <Grid position="relative" justifyContent="center" alignitems="center">
        <Card sx={{ display: "table-row", gap: 2 }}>
          <CardActionArea>
            <CardContent sx={{ flex: 1, gap: 2, alignItems: "center" }}>
              <Typography>{name}</Typography>
              <Typography>{price}</Typography>
              <br />
              <Grid
                container
                spacing={2}
                gap={2}
                justifyContent="center"
                alignitems="center"
              >
                <Button
                  startIcon={<Add />}
                  variant="contained"
                  size="large"
                  onClick={() => {
                    addItems(id);
                  }}
                  sx={{
                    height: "100%",
                    justifyContent: "center",
                    textAlign: "center",
                    lineHeight: "59px"
                  }}
                ></Button>
                <TextField
                  sx={{
                    width: "25%",
                    "& input": {
                      textAlign: "center",
                    },
                  }}
                  size="small"
                  id="outline-basic"
                  variant="outlined"
                  value={cartItems[id]}
                  onChange={(e) => {
                    updateCartItems(Number(e.target.value));
                  }}
                />
                <Button
                  startIcon={<Remove />}
                  onClick={() => {
                    removeItems(id);
                  }}
                  variant="contained"
                  size="large"
                  sx={{
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                ></Button>
              </Grid>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </>
  );
};

export default CartItems;
