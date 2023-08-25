import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { TextField, Grid, Button } from "@mui/material";
import {URL} from "../../api/url"

const Paywall = () => {
  const [method, setMethod] = useState({
    payment_method: "",
    account: "",
    payment_proof: null,
  });
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMethod((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    setMethod((prevState) => ({
      ...prevState,
      payment_proof: file,
    }));
  };

  

  const handleSubmit = async () => {
    let token = localStorage.getItem("token")
    try {
      const fd = new FormData();
      fd.append("payment_method", method.payment_method);
      fd.append("account", method.account);
      fd.append("payment_proof", method.payment_proof);
      fd.append("payment_token", token);

      const response = await URL.post(
        "/orders/payment",
        fd,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitted(true)
    }
  };

  return (
    <>
      {submitted ? (
        <>
          <p>Thank you. We will process your order shortly</p>
        </>
      ) : (
        <>
          <br />
          <Grid
            container
            gap={2}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <FormControl sx={{ minWidth: 300 }}>
              <InputLabel>Payment method</InputLabel>
              <Select
                value={method.payment_method}
                label="Method"
                onChange={handleChange}
                style={{ maxWidth: "100%" }}
                name="payment_method"
              >
                <MenuItem value={"Transfer Bank"}>Transfer Bank</MenuItem>
                <MenuItem value={"OVO"}>OVO</MenuItem>
                <MenuItem value={"Dana"}>Dana</MenuItem>
              </Select>
            </FormControl>
            <TextField
              placeholder="Account number"
              variant="outlined"
              sx={{ width: 300 }}
              onChange={handleChange}
              value={method.account}
              name="account"
            />
            <InputLabel htmlFor="myfile">Payment proof</InputLabel>
            <input
              formEncType="multipart/form-data"
              type="file"
              id="myfile"
              name="payment_proof"
              accept="image/*"
              onChange={handleFileInput}
            />
          </Grid>
          <Button onClick={handleSubmit}>Submit</Button>
        </>
      )}
    </>
  );
};
export default Paywall;
