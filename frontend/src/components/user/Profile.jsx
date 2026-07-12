import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader";

import "./profile.css";

const Profile = () => {
  const { user, loading } = useSelector((state) => state.user);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="row justify-content-around mt-5 user-info">
            <div className="col-12 col-md-5 profile">
              <div className="profile-header">
                <figure className="avatar avatar-profile text-center">
                  <img
                    className="rounded-circle figure-img img-fluid"
                    src={user.avatar.url}
                    alt={user.name}
                  />
                </figure>
                <h3>Welcome, {user.name}!</h3>
                <Link
                  to="/users/me/update"
                  id="edit_profile"
                  className="btn-edit-profile"
                >
                  Edit Profile
                </Link>
              </div>

              <div className="profile-field">
                <span className="profile-field-label">Full Name</span>
                <span className="profile-field-value">{user.name}</span>
              </div>

              <div className="profile-field">
                <span className="profile-field-label">Email Address</span>
                <span className="profile-field-value">{user.email}</span>
              </div>

              <div className="profile-field">
                <span className="profile-field-label">Joined On</span>
                <span className="profile-field-value">
                  {String(user.createdAt).substring(0, 10)}
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
