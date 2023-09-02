import React from 'react';
import { Link } from 'react-router-dom';
import CartIcon from '../icons/CartIcon.js';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const {cart} = useSelector((state) => state.allCart);
  // console.log(cart);
  return (
    <nav className="bg-black p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <ul className="text-white font-semibold text-lg">
            <Link to="/" className="text-white">totalitycorp-frontend-challenge</Link>
          </ul>
          <ul className="flex space-x-4">
            <li><Link to="/cart" className="text-white"><CartIcon cartLength={cart.length} /></Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
