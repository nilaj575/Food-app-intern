import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-inner">
        <div>
          <h5>foodie</h5>
          <ul>
            <li>Discover the best food & drinks near you.</li>
          </ul>
        </div>

        <div>
          <h5>Company</h5>
          <ul>
            <li>
              <Link to="/">About Us</Link>
            </li>
            <li>
              <Link to="/">Careers</Link>
            </li>
            <li>
              <Link to="/">Team</Link>
            </li>
          </ul>
        </div>

        <div>
          <h5>For You</h5>
          <ul>
            <li>
              <Link to="/eats/orders/me/myOrders">My Orders</Link>
            </li>
            <li>
              <Link to="/cart">My Cart</Link>
            </li>
            <li>
              <Link to="/users/me">My Profile</Link>
            </li>
          </ul>
        </div>

        <div>
          <h5>Get in Touch</h5>
          <ul>
            <li>support@foodie.com</li>
            <li>+91 90000 00000</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        Food Delivery Website &copy; {new Date().getFullYear()}, All Rights
        Reserved.
      </div>
    </footer>
  );
};

export default Footer;
