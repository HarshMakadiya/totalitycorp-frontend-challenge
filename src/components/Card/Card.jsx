import React, { useState } from "react";
import { addToCart } from "../../redux/features/cartSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

const Card = ({ item }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  const dispatch = useDispatch();
  const sendToCart = (item) => {
    dispatch(addToCart(item));
    toast.success(`${item.title} added to cart`);
  };
  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-4 w-64">
        <div className="flex-shrink-0">
          <img
            src={item.image}
            alt="Product"
            className="h-48 w-auto border border-gray-300 rounded-md mb-4"
          />
        </div>
        <div className="text-gray-800 flex-grow">
          <h2 className="text-xl font-semibold">{item.title}</h2>
          <div className="text-sm text-gray-600">
            {showFullDescription ? (
              <p>{item.description}</p>
            ) : (
              <p>{item.description.slice(0, 100)}...</p>
            )}
            <button
              className="text-blue-500 hover:underline"
              onClick={toggleDescription}
            >
              {showFullDescription ? "Read Less" : "Read More"}
            </button>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-lg text-gray-800 font-semibold">${item.price}</p>
          <button
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
            onClick={() => sendToCart(item)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
