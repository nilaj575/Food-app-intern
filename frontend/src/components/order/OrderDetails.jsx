import React, { Fragment, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";

import Loader from "../layout/Loader";
import { getOrderDetails } from "../../redux/actions/orderActions";
import { clearErrors } from "../../redux/slices/orderSlice";

import "./order-status-badge.css";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  //  order state
  const { loading, error, order } = useSelector((state) => state.order);

  // fetch data
  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch, id]);

  // toast error
  useEffect(() => {
    if (error) {
      toast.error(error, { position: "bottom-right" });
      dispatch(clearErrors());
    }
  }, [error, dispatch]);

  // safe destructuring
  const {
    _id,
    deliveryInfo = {},
    orderItems = [],
    paymentInfo = {},
    user = {},
    finalTotal,
    orderStatus,
  } = order || {};

  // delivery address
  const deliveryDetails = deliveryInfo
    ? `${deliveryInfo.address || ""}, ${deliveryInfo.city || ""}, ${
        deliveryInfo.postalCode || ""
      }, ${deliveryInfo.country || ""}`
    : "";

  // payment status
  const isPaid = paymentInfo?.status === "paid";

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="row d-flex justify-content-center orderdetails">
            <div className="col-12 order-details">
              <div className="d-flex align-items-center justify-content-between flex-wrap mb-4">
                <h1 className="mb-0">Order # {_id}</h1>
                <span
                  className={
                    orderStatus?.includes("Delivered")
                      ? "status-delivered"
                      : "status-pending"
                  }
                >
                  {orderStatus || "Pending"}
                </span>
              </div>

              {/* Delivery Info */}
              <h4 className="mb-3">
                <i className="fa fa-map-marker mr-2"></i>
                Delivery Info
              </h4>
              <p>
                <b>Name:</b> {user?.name || "N/A"}
              </p>
              <p>
                <b>Phone:</b> {deliveryInfo?.phoneNo || "N/A"}
              </p>
              <p className="mb-4">
                <b>Address:</b> {deliveryDetails || "N/A"}
              </p>

              <p>
                <b>Amount:</b>{" "}
                <FontAwesomeIcon icon={faIndianRupeeSign} size="xs" />
                {finalTotal || 0}
              </p>

              <hr />

              {/* Payment */}
              <h4 className="my-4">
                Payment :{" "}
                <span className={isPaid ? "greenColor" : "redColor"}>
                  <b>{isPaid ? " PAID" : " NOT PAID"}</b>
                </span>
              </h4>

              {/* Order Items */}
              <h4 className="my-4">
                <i className="fa fa-shopping-bag mr-2"></i>
                Order Items
              </h4>
              <hr />

              <div className="cart-item my-1">
                {orderItems.length > 0 ? (
                  orderItems.map((item) => (
                    <div key={item._id} className="row align-items-center my-4">
                      <div className="col-3 col-lg-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          height="55"
                          width="75"
                          style={{
                            objectFit: "cover",
                            borderRadius: "var(--radius-s)",
                          }}
                        />
                      </div>

                      <div className="col-5 col-lg-6">
                        <Link to="#">{item.name}</Link>
                        <p className="mb-0 text-muted">
                          {item.quantity} Item(s)
                        </p>
                      </div>

                      <div className="col-4 col-lg-4 text-right">
                        <p className="mb-0">
                          <b>
                            <FontAwesomeIcon
                              icon={faIndianRupeeSign}
                              size="xs"
                            />
                            {item.price}
                          </b>
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No items found</p>
                )}
              </div>

              <hr />
            </div>
          </div>
        </Fragment>
      )}
    </>
  );
};

export default OrderDetails;
