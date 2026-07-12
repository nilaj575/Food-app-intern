import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteRestaurant } from "../redux/actions/restaurantAction";

const Restaurant = ({ restaurant }) => {
  const dispatch = useDispatch();
  const [showAI, setShowAI] = useState(false);

  const { isAuthenticated, user } = useSelector((state) => state.user || {});

  //DELETE
  const handleDelete = () => {
    if (!window.confirm("Delete this restaurant?")) return;

    dispatch(deleteRestaurant(restaurant._id)).catch(() => {
      alert("Unable to delete");
    });
  };

  return (
    <div className="restaurant-card">
      <Link
        to={`/eats/stores/${restaurant._id}/menus`}
        className="restaurant-media"
      >
        <img
          className="restaurant-image"
          src={restaurant.images?.[0]?.url}
          alt={restaurant.name}
        />

        {restaurant.ratings > 0 && (
          <span className="restaurant-badge">
            <i className="fa fa-star" aria-hidden="true"></i>{" "}
            {restaurant.ratings.toFixed
              ? restaurant.ratings.toFixed(1)
              : restaurant.ratings}
          </span>
        )}

        {restaurant.isVeg && (
          <span
            className="restaurant-badge veg"
            style={{ left: "auto", right: "0.75rem" }}
          >
            <i className="fa fa-leaf" aria-hidden="true"></i> Pure Veg
          </span>
        )}
      </Link>

      <div className="restaurant-info">
        <Link
          to={`/eats/stores/${restaurant._id}/menus`}
          style={{ textDecoration: "none" }}
        >
          <h4>{restaurant.name}</h4>
        </Link>

        <p className="rest_address">{restaurant.address}</p>

        <div className="ratings">
          <div className="rating-outer">
            <div
              className="rating-inner"
              style={{
                width: `${(restaurant.ratings / 5) * 100}%`,
              }}
            ></div>
          </div>

          <span>({restaurant.numOfReviews} Reviews)</span>
        </div>

        {restaurant.reviewSentiment && (
          <button className="ai-btn" onClick={() => setShowAI(!showAI)}>
            {showAI ? "− Hide Summary" : "💬 View Review Summary"}
          </button>
        )}

        {isAuthenticated && user && user.role === "admin" && (
          <button
            className="btn btn-danger btn-sm mt-2"
            style={{ width: "fit-content" }}
            onClick={handleDelete}
          >
            Delete
          </button>
        )}
      </div>

      {showAI && (
        <div className="ai-insights-box">
          <div className="ai-status">
            Review Summary: 😊 <strong>{restaurant.reviewSentiment}</strong>
          </div>

          <ul>
            {(restaurant.reviewSummaryBullets || []).map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>

          <div className="mentions">
            {(restaurant.reviewTopMentions || []).map((item, index) => (
              <span key={index} className="mention-tag">
                #{item}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Restaurant;
