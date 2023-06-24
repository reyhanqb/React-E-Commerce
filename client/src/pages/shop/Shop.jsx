import { products } from "../../Products";
import Product from "./Product";

const Shop = () => {


  return (
    <>
      <div className="shop">
        <h1>Shop</h1>
        <div className="products">
          <div>
            {products.map((product) => (
              <Product data={product} key={product.id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
