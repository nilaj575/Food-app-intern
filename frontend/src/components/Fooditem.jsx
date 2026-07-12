import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addItemToCart,
  updateCartQuantity,
  removeItemFromCart,
} from "../redux/actions/cartActions";
import axios from "axios";
import { getMenus } from "../redux/actions/menuActions";

const Fooditem = ({ fooditem, restaurant }) => {
  const [quantity, setQuantity] = useState(1);
  const [showButtons, setShowButtons] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //state (Redux Toolkit user slice)
  const { user } = useSelector((state) => state.user);
  const isAuthenticated = !!user;

  //cart from slice
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    const cartItem = cartItems.find(
      (item) => item.foodItem._id === fooditem._id,
    );

    if (cartItem) {
      setQuantity(cartItem.quantity);
      setShowButtons(true);
    } else {
      setQuantity(1);
      setShowButtons(false);
    }
  }, [cartItems, fooditem]);

  // decrease
  const decreaseQty = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);

      dispatch(updateCartQuantity(fooditem._id, newQuantity));
    } else {
      setQuantity(0);
      setShowButtons(false);
      dispatch(removeItemFromCart(fooditem._id));
    }
  };

  // increase
  const increaseQty = () => {
    if (quantity < fooditem.stock) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);

      dispatch(updateCartQuantity(fooditem._id, newQuantity));
    } else {
      alert("Exceeded stock limit");
    }
  };

  //add to cart
  const addToCartHandler = () => {
    if (!isAuthenticated) {
      return navigate("/users/login");
    }

    dispatch(addItemToCart(fooditem._id, restaurant, quantity));
    setShowButtons(true);
  };

  return (
    <div className="card">
      <div className="food-image-wrap">
        <img
          className="food-image"
          src={fooditem.images?.[0]?.url || "/images/placeholder.png"}
          alt={fooditem.name}
        />
      </div>

      <div className="card-body">
        <h5 className="card-title">{fooditem.name}</h5>

        <p className="fooditem_des">{fooditem.description}</p>

        <p className="card-text">
          <FontAwesomeIcon icon={faIndianRupeeSign} size="xs" />
          {fooditem.price}
        </p>

        {!showButtons ? (
          (!isAuthenticated || user?.role !== "admin") && (
            <button
              id="cart_btn"
              className="btn"
              disabled={fooditem.stock === 0}
              onClick={addToCartHandler}
            >
              Add to Cart
            </button>
          )
        ) : (
          <div className="stockCounter d-inline">
            <span className="btn minus" onClick={decreaseQty}>
              -
            </span>

            <input
              type="number"
              className="form-control count d-inline"
              value={quantity}
              readOnly
            />

            <span className="btn plus" onClick={increaseQty}>
              +
            </span>
          </div>
        )}

        <p className="mt-2 mb-0">
          Status:{" "}
          <span
            id="stock_status"
            className={fooditem.stock > 0 ? "greenColor" : "redColor"}
          >
            {fooditem.stock > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </p>

        {/* ADMIN DELETE */}
        {isAuthenticated && user?.role === "admin" && (
          <button
            className="btn btn-danger btn-sm mt-2"
            style={{ width: "fit-content" }}
            onClick={async () => {
              if (!window.confirm("Delete this food item?")) return;

              try {
                await axios.delete(`/api/v1/eats/item/${fooditem._id}`, {
                  withCredentials: true,
                });

                if (restaurant) {
                  dispatch(getMenus(restaurant));
                }
              } catch (err) {
                console.error(err);
                alert(err.response?.data?.message || "Unable to delete item");
              }
            }}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default Fooditem;
