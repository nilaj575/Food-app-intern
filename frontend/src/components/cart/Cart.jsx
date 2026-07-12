import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCartItems,
  removeItemFromCart,
  updateCartQuantity,
} from "../../redux/actions/cartActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupee } from "@fortawesome/free-solid-svg-icons";
import { payment } from "../../redux/actions/orderActions";
import { toast } from "react-toastify";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems, restaurant } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const removeCartItemHandler = (id) => {
    dispatch(removeItemFromCart(id));
    toast.success("Item removed from cart");
  };

  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (newQty > stock) {
      toast.error("Exceeded stock limit");
      return;
    }
    dispatch(updateCartQuantity(id, newQty));
  };

  const decreaseQty = (id, quantity) => {
    if (quantity > 1) {
      const newQty = quantity - 1;
      dispatch(updateCartQuantity(id, newQty));
    } else {
      toast.error("Minimum quantity reached");
    }
  };

  const checkoutHandler = () => {
    dispatch(payment(cartItems, restaurant));
  };

  return (
    <>
      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <i
            className="fa fa-shopping-cart"
            style={{ fontSize: "3rem", color: "#d8d8dc" }}
            aria-hidden="true"
          ></i>
          <h2 className="mt-3">Your cart is empty</h2>
          <p className="text-muted">
            Looks like you haven't added anything to your cart yet.
          </p>
          <button className="btn" id="cart_btn" onClick={() => navigate("/")}>
            Browse Restaurants
          </button>
        </div>
      ) : (
        <>
          <h2 className="cart-page-title mt-5">
            Your Cart: <b>{cartItems.length} items</b>
          </h2>
          <h3 className="cartt mt-2 mb-4">
            Restaurant: <b>{restaurant.name}</b>
          </h3>

          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8">
              {cartItems.map((item) => (
                <div className="cart-item" key={item._id}>
                  <div className="row align-items-center">
                    <div className="col-4 col-lg-3">
                      <img
                        src={item.foodItem.images[0].url}
                        alt="items"
                        height="70"
                        width="90"
                      />
                    </div>

                    <div className="col-5 col-lg-3">{item.foodItem.name}</div>

                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                      <p id="card_item_price" className="mb-0">
                        <FontAwesomeIcon icon={faIndianRupee} size="xs" />
                        {item.foodItem.price}
                      </p>
                    </div>

                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                      <div className="stockCounter d-inline">
                        <span
                          className="btn minus"
                          onClick={() =>
                            decreaseQty(item.foodItem._id, item.quantity)
                          }
                        >
                          -
                        </span>

                        <input
                          type="number"
                          className="form-control count d-inline"
                          value={item.quantity}
                          readOnly
                        />

                        <span
                          className="btn plus"
                          onClick={() =>
                            increaseQty(
                              item.foodItem._id,
                              item.quantity,
                              item.foodItem.stock,
                            )
                          }
                        >
                          +
                        </span>
                      </div>
                    </div>

                    <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                      <i
                        id="delete_cart_item"
                        className="fa fa-trash btn"
                        onClick={() => removeCartItemHandler(item.foodItem._id)}
                      ></i>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="col-12 col-lg-3 my-4">
              <div id="order_summary">
                <h4>Order Summary</h4>
                <hr />

                <p>
                  Subtotal:
                  <span className="order-summary-values">
                    {cartItems.reduce(
                      (acc, item) => acc + Number(item.quantity),
                      0,
                    )}{" "}
                    (Units)
                  </span>
                </p>

                <p>
                  Total:
                  <span className="order-summary-values">
                    <FontAwesomeIcon icon={faIndianRupee} size="xs" />
                    {cartItems
                      .reduce(
                        (acc, item) =>
                          acc + item.quantity * item.foodItem.price,
                        0,
                      )
                      .toFixed(2)}
                  </span>
                </p>

                <hr />

                <button
                  id="checkout_btn"
                  className="btn btn-primary btn-block"
                  onClick={checkoutHandler}
                >
                  Check Out
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
