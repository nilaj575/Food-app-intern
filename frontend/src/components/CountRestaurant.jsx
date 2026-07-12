import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRestaurants } from "../redux/actions/restaurantAction";
import "./css/count.css";

const CountRestaurant = () => {
  const dispatch = useDispatch();

  const { count, pureVegRestaurantsCount, showVegOnly, loading, error } =
    useSelector((state) => state.restaurants);

  useEffect(() => {
    dispatch(getRestaurants());
  }, [dispatch, showVegOnly]);

  return (
    <div className="discover-hero">
      <h1>Order food & discover great restaurants</h1>

      {loading ? (
        <p>Loading restaurant count...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <p>
          <span className="NumOfRestro">
            {showVegOnly ? pureVegRestaurantsCount : count}
          </span>
          <span className="Restro">
            {showVegOnly
              ? pureVegRestaurantsCount === 1
                ? " restaurant serving pure veg near you"
                : " restaurants serving pure veg near you"
              : count === 1
                ? " restaurant near you"
                : " restaurants near you"}
          </span>
        </p>
      )}
    </div>
  );
};

export default CountRestaurant;
