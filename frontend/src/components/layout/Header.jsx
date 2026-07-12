import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Routes } from "react-router-dom";
import { logout } from "../../redux/actions/userActions";

import { toast } from "react-toastify"; //

import Search from "./Search";
import "../../App.css";

const Header = () => {
  const dispatch = useDispatch();

  // Updated slice
  const { user, loading } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  const logoutHandler = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
  };

  return (
    <>
      <nav className="navbar sticky-top">
        {/* logo */}
        <div className="brand-col">
          <Link to="/" className="brand-link">
            <span className="brand-mark">F</span>
            <span className="brand-name">
              food<span>ie</span>
            </span>
          </Link>
        </div>

        {/* search */}
        <div className="search-col">
          <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/eats/stores/search/:keyword" element={<Search />} />
          </Routes>
        </div>

        {/* right side */}
        <div className="nav-actions-col">
          <Link to="/cart" className="cart-link">
            <i className="fa fa-shopping-cart" aria-hidden="true"></i>
            <span id="cart">Cart</span>
            <span id="cart_count">{cartItems.length}</span>
          </Link>

          {user ? (
            <div className="user-menu dropdown d-inline">
              <Link
                to="/"
                className="btn dropdown-toggle"
                id="dropDownMenuButton"
                data-toggle="dropdown"
              >
                <figure className="avatar avatar-nav mb-0">
                  <img
                    src={user?.avatar?.url}
                    alt={user?.name}
                    className="rounded-circle"
                  />
                </figure>

                <span>{user?.name}</span>
              </Link>

              <div className="dropdown-menu dropdown-menu-right">
                <Link className="dropdown-item" to="/eats/orders/me/myOrders">
                  <i className="fa fa-receipt mr-2" aria-hidden="true"></i>
                  Orders
                </Link>

                <Link className="dropdown-item" to="/users/me">
                  <i className="fa fa-user mr-2" aria-hidden="true"></i>
                  Profile
                </Link>

                <Link
                  className="dropdown-item text-danger"
                  to="/"
                  onClick={logoutHandler}
                >
                  <i className="fa fa-sign-out mr-2" aria-hidden="true"></i>
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            !loading && (
              <Link to="/users/login" className="btn" id="login_btn">
                Login
              </Link>
            )
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
