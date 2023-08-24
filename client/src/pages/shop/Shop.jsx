import { products } from "../../Products";
import Product from "./Product";

const Shop = () => {
  return (
    <>
      <div className="flex">
        <br />
        <div className="flex flex-row gap-1 justify-between mt-5 p-2 top-0 max-w-full">
          {products.map((product) => (
            <Product data={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Shop;
