import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/actions/userActions";
import { clearErrors } from "../../redux/slices/userSlice";

import "./auth.css";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    phoneNumber: "",
  });

  const { name, email, password, passwordConfirm, phoneNumber } = user;

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/images/images.png");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.user,
  );

  //useEffect to handle redirection and error alerts
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      window.alert(error);
      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, error, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      alert("Passwords do not match");
      return;
    }

    const userData = {
      name,
      email,
      password,
      passwordConfirm,
      phoneNumber,
      avatar: avatar === "" ? "/images/images.png" : avatar,
    };

    dispatch(register(userData));
  };

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  return (
    <>
      <div className="row wrapper">
        <div className="col-10 col-lg-5 registration-form">
          <form
            className="shadow-lg"
            onSubmit={submitHandler}
            encType="multipart/form-data"
          >
            <h1 className="mb-3">Register</h1>

            <div className="form-group">
              <label htmlFor="avatar_upload">Avatar</label>
              <div className="avatar-upload-wrap">
                <figure className="avatar">
                  <img
                    src={avatarPreview}
                    className="rounded-circle"
                    alt="Avatar Preview"
                  />
                </figure>
                <label className="avatar-upload-btn" htmlFor="customFile">
                  <i className="fa fa-camera"></i>
                  <input
                    type="file"
                    name="avatar"
                    id="customFile"
                    accept="images/*"
                    onChange={onChange}
                  ></input>
                </label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="name_field">Name</label>
              <div className="input-icon-group">
                <i className="fa fa-user input-icon"></i>
                <input
                  type="text"
                  id="name_field"
                  className="form-control"
                  name="name"
                  value={name}
                  onChange={onChange}
                ></input>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <div className="input-icon-group">
                <i className="fa fa-envelope input-icon"></i>
                <input
                  type="email"
                  id="email_field"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChange}
                ></input>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <div className="input-icon-group">
                <i className="fa fa-lock input-icon"></i>
                <input
                  type="password"
                  id="password_field"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChange}
                ></input>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="passwordConfirm_field">Password Confirm</label>
              <div className="input-icon-group">
                <i className="fa fa-lock input-icon"></i>
                <input
                  type="password"
                  id="passwordConfirm_field"
                  className="form-control"
                  name="passwordConfirm"
                  value={passwordConfirm}
                  onChange={onChange}
                ></input>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber_field">Phone Number</label>
              <div className="input-icon-group">
                <i className="fa fa-phone input-icon"></i>
                <input
                  type="number"
                  id="phoneNumber_field"
                  className="form-control"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={onChange}
                ></input>
              </div>
            </div>

            <button
              id="register_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading ? true : false}
            >
              REGISTER
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
