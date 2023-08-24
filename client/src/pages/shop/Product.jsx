import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";



const Product = (props) => {
  const { id, name, price, image } = props.data;
  const { addItems, removeItems, cartItems, addWishlist } =
    useContext(ShopContext);

  const cartItemAmount = cartItems[id];
  return (
    <>
      <div class="flex flex-col">
        <div class="container z-10 ">
          <div class="grid mt-8  gap-8 grid-cols-1 md:grid-cols-3">
            <div class="flex flex-col ">
              <div class="bg-white shadow-md  rounded-3xl p-3">
                <div class="">
                  <div class="relative h-62 w-full lg:mb-0 mb-3">
                    <div class="">
                      <button class="transition ease-in duration-300 hover:text-indigo-500 text-gray-200 rounded-full"></button>
                    </div>
                    <img
                      src="https://images.unsplash.com/photo-1618623583196-e4e9e11f8511?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1048&q=80"
                      alt="Just a flower"
                      class=" w-full   object-fill  h-full rounded-2xl"
                    />
                  </div>
                  <div class="flex-auto justify-evenly p-2">
                    <div class="flex flex-wrap ">
                      <div class="w-full flex-none text-sm flex items-center text-gray-600"></div>
                      <div class="flex items-center w-full justify-between min-w-0 ">
                        <h2 class="text-lg mr-auto cursor-pointer hover:text-gray-900 truncate ">
                          {name}
                        </h2>
                      </div>
                    </div>

                    <div class="text-xl font-semibold mt-1 flex flex-wrap">
                      {price}
                    </div>
                    <div class="flex flex-wrap p-2 mb-0">
                      <button
                        class="transition ease-in duration-300 bg-yellow-300 hover:bg-yellow-400  text-white  hover:shadow-lg rounded-full w-9 h-9 text-center p-2"
                        onClick={() => addWishlist(id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class=""
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </button>
                    </div>
                    <div class="lg:flex  py-4  text-sm text-gray-600">
                      <div class="flex-1 inline-flex items-center  mb-3 lg:mb-0">
                        <div class="w-full flex-none text-sm flex items-center text-gray-600"></div>
                      </div>
                      <div class="flex-1 inline-flex items-center">
                        <div class="cursor-pointer text-gray-400 "></div>
                      </div>
                    </div>
                    <div class="flex p-4 pb-2 border-t border-gray-200 "></div>
                    <div class="flex space-x-2 text-sm font-medium justify-center">
                      <button
                        class="transition ease-in duration-300 inline-flex items-centertext-sm font-medium mb-2 md:mb-0 bg-indigo-500 px-5 py-2 hover:shadow-lg tracking-wider text-white rounded-full hover:bg-indigo-600 "
                        onClick={() => addItems(id)}
                      >
                        <span>+</span>
                      </button>
                      <div className="text-xl mt-1 flex flex-wrap">
                        <p>{cartItemAmount}</p>
                      </div>
                      <button
                        class="transition ease-in duration-300 inline-flex items-centertext-sm font-medium mb-2 md:mb-0 bg-indigo-500 px-5 py-2 hover:shadow-lg tracking-wider text-white rounded-full hover:bg-indigo-600 "
                        onClick={() => removeItems(id)}
                      >
                        <span>-</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*  */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
