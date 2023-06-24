import axios from "axios";
import { useEffect, useState } from "react";


const useProductData = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/products/fetch")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  
  return products

}

export default useProductData