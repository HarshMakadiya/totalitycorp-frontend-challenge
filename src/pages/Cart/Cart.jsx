import React, { useEffect, useState }   from "react";
import TrashIcon from "../../components/icons/TrashIcon";
import CartIcon from "../../components/icons/CartIcon";
import PlusIcon from "../../components/icons/PlusIcon";
import MinusIcon from "../../components/icons/MinusIcon";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, emptyCartItems, removeFromCart, removeSingleItem } from "../../redux/features/cartSlice";
import { toast } from "react-hot-toast";

const Cart = () => {
  const {cart} = useSelector((state) => state.allCart);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const dispatch = useDispatch();
  const handleIncrement = (data) => {
    dispatch(addToCart(data));
  }
  const handleDecrement = (id) => {
    // console.log(id);
    dispatch(removeFromCart(id));
  }
  const handleSingleDecrement = (data) => {
    dispatch(removeSingleItem(data));
  }
  const emptycart = () => {
    dispatch(emptyCartItems());
    toast.success("Cart is Empty");
  }
  const calculateTotalPrice = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });
    setTotalPrice(total);
  }
  const calculateTotalItems = () => {
    let totalItems = 0;
    cart.forEach((item) => {
      totalItems += item.quantity;
    });
    setTotalItems(totalItems);
  }
  useEffect(() => {
    calculateTotalPrice();
    calculateTotalItems();
  },[cart])
  return (
    <>
      <div className="flex justify-center m-0">
        <div className="w-full sm:w-11/12 md:w-10/12 lg:w-8/12 mt-5 mb-5">
          <div className=" bg-white border rounded-lg shadow-lg">
            <div className="bg-black p-3">
              <div className="flex justify-between items-center text-white">
                <h5 className="text-white">Cart Calculation</h5>
                {cart.length > 0 ? (
                  <button
                    className="px-4 py-2 rounded bg-red-500 text-white mt-0 text-sm"
                    onClick={emptycart}
                  >
                    <div className="flex items-center gap-1">
                      <TrashIcon />
                      <span>Empty Cart</span>
                    </div>
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="p-0">
              {cart.length === 0 ? (
                <table className=" w-full mb-0">
                  <tbody>
                    <tr>
                      <td colSpan={6}>
                        <div className="flex items-center justify-center gap-5bg-gray-100 p-4 rounded-lg text-center">
                          <CartIcon />
                          <p className="text-gray-600 text-lg">
                            Your Cart Is Empty
                          </p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="p-2 text-left">Action</th>
                      <th className="p-2 text-left">Product</th>
                      <th className="p-2 text-left">Name</th>
                      <th className="p-2 text-left">Price</th>
                      <th className="p-2 text-left">Qty</th>
                      <th className="p-2 text-right">
                        <span id="amount" className="amount text-gray-700">
                          Total Amount
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((data, index) => (
                      <tr key={index} className="border-b border-gray-200">
                        <td className="py-2">
                          <button
                            className="px-2 py-1 text-red-600 hover:text-red-800"
                            onClick={() => handleDecrement(data.id)}
                          >
                            <TrashIcon />
                          </button>
                        </td>
                        <td className="py-2 px-3">
                          <div className="flex items-center">
                            <img
                              src={data.image}
                              alt=""
                              className="w-10 h-10 object-cover rounded"
                            />
                          </div>
                        </td>
                        <td className="py-2 px-3">
                          <div className="text-gray-800">{data.title.trim()}</div>
                        </td>
                        <td className="py-2 px-3">
                          <div className="text-gray-800">{data.price}</div>
                        </td>
                        <td className="py-2">
                          <div className="flex items-center">
                            <button
                              className="px-2 py-1 text-gray-600 hover:text-gray-800"
                              type="button"
                              onClick={data.quantity <= 1 ? () => handleDecrement(data.id) : () => handleSingleDecrement(data)}
                            >
                              <MinusIcon />
                            </button>
                            <input
                              type="text"
                              className="px-2 py-1 text-center border border-gray-300 w-10"
                              value={data.quantity}
                              disabled
                            />
                            <button
                              className="px-2 py-1 text-gray-600 hover:text-gray-800"
                              type="button"
                              onClick={() => handleIncrement(data)}
                            >
                              <PlusIcon />
                            </button>
                          </div>
                        </td>
                        <td className="py-2 text-right">
                          ₹ {(data.price * data.quantity).toFixed(2)} 
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th className="border-t border-gray-300">&nbsp;</th>
                      <th colSpan={3} className="border-t border-gray-300">
                        &nbsp;
                      </th>
                      <th className="border-t border-gray-300">
                        Items In Cart <span className="ml-2 mr-2">:</span>
                        <span className="text-red-500">{totalItems}</span>
                      </th>
                      <th className="border-t border-gray-300 text-right">
                        Total Price<span className="ml-2 mr-2">:</span>
                        <span className="text-red-500">₹ {totalPrice.toFixed(2)}</span>
                      </th>
                    </tr>
                  </tfoot>
                </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
