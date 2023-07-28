import React, { useEffect, useState } from "react";
import { ShopContext } from "../../context/shop-context";
import { useContext } from "react";
import CartItems from "../cart/CartItems";
import { products } from "../../Products";
import axios from "axios";
import { Grid, TextField, Button, Typography } from "@mui/material";
import * as uuid from "uuid";

const Checkout = () => {
  const { cartItems, totalCartAmount, checkTimestamp } =
    useContext(ShopContext);

  const total = totalCartAmount();

  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const [token, setToken] = useState("");

  let today = checkTimestamp();

  const validationCheck = () => {
    let isValid = false;
    if (
      !orders.address ||
      !orders.email ||
      !orders.nama ||
      !orders.city ||
      !orders.zipcode ||
      !orders.province
    ) {
      isValid = true;
    } else {
      isValid = false;
    }

    return isValid;
  };

  let defaultOrders = {
    nama: "",
    email: "",
    details: "",
    address: "",
    city: "",
    province: "",
    zipcode: "",
    total: total,
    createdAt: today,
  };

  const [orders, setCustomerOrders] = useState(defaultOrders);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerOrders((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (total > 0) {
      // let v = validationCheck();
      // console.log(v);
      // if (v === true) {
      //   console.log("x");
      //   console.log(orders)
      //   return;
      // }
      setToken(uuid.v4());
      try {
        const cartOrder = Object.entries(cartItems)
          .filter(([id, quantity]) => quantity > 0)
          .map(([id, quantity]) => `${id}(${quantity})`)
          .join(", ");
        let c = "p";
        let p = "c";
        const res = await axios.post("http://localhost:3001/create-orders", {
          nama: orders.nama,
          address: orders.address,
          total: total,
          details: cartOrder,
          city: cities,
          province: provinces,
          zipcode: orders.zipcode,
          email: orders.email,
          createdAt: orders.createdAt,
          token: token,
        });
        console.log(res);
        setIsOrderPlaced(true);
        localStorage.setItem("token", token);
      } catch (error) {
        throw error;
      }
    } else {
      console.log("Your cart is empty");
    }
  };

  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
      );
      setProvinces(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleProvinceChange = async (provinceId) => {
    try {
      const response = await axios.get(
        `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceId}.json`
      );
      setCities(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCityChange = async (cityId) => {
    try {
      const response = await axios.get(
        `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${cityId}.json`
      );
      setDistricts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeCity = (e) => {
    const { value } = e.target;
    setCustomerOrders((prevState) => ({
      ...prevState,
      city: value,
    }));
  };
  const handleChangeProvince = (e) => {
    const { value } = e.target;
    setCustomerOrders((prevState) => ({
      ...prevState,
      province: value,
    }));
  };

  return (
    <>
      <p>Checkout</p>
      <div>
        <Grid
          container
          justifyContent="center"
          gap={2}
          direction={"column"}
          flex={"column"}
          alignItems={"center"}
        >
          <div className="item-list">
            {products.map((product) => {
              if (cartItems[product.id] !== 0) {
                return <CartItems data={product} key={product.id} />;
              } else {
                return null;
              }
            })}
          </div>
          {total === 0 ? (
            <>
              <p>Your cart is empty</p>
            </>
          ) : (
            <>
              <Grid
                sx={{ display: "flex", textAlign: "center" }}
                gap={2}
                direction={"column"}
                maxWidth={"450px"}
                justifycontent="center"
                alignItems={"center"}
              >
                <TextField
                  label="Nama"
                  type="text"
                  name="nama"
                  value={orders.nama}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Email"
                  type="email"
                  name="email"
                  value={orders.email}
                  onChange={handleChange}
                  required
                />

                <TextField
                  label="Address"
                  type="text"
                  name="address"
                  value={orders.address}
                  onChange={handleChange}
                  required
                />

                <div>
                  <label>Provinsi:</label>
                  <select onChange={{ handleChangeProvince }}>
                    <option value="">Pilih Provinsi</option>
                    {provinces.map((province) => (
                      <option key={province.id} value={province.name}>
                        {province.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>Kota/Kabupaten:</label>
                  <select onChange={(e) => handleCityChange(e.target.value)}>
                    <option value="">Pilih Kota/Kabupaten</option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>
                <TextField
                  label="Zip code"
                  type="text"
                  name="zipcode"
                  value={orders.zipcode}
                  onChange={handleChange}
                  required
                />
                <Typography>Total : Rp{total}</Typography>
                <br />
                <Button onClick={handleSubmit} variant="outlined">
                  Order
                </Button>
              </Grid>
              <br />
            </>
          )}
        </Grid>
      </div>
      {isOrderPlaced ? <p>Terima kasih!</p> : null}
    </>
  );
};

export default Checkout;
