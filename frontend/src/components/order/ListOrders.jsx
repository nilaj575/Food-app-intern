import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import DataTableModule from "react-data-table-component";

const DataTable = DataTableModule.default || DataTableModule;

import Loader from "../layout/Loader";

import { getRestaurants } from "../../redux/actions/restaurantAction";
import { myOrders } from "../../redux/actions/orderActions";
import { clearErrors } from "../../redux/slices/orderSlice";

import "./ListOrders.css";
import "./order-status-badge.css";

const ListOrders = () => {
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(myOrders());
    dispatch(getRestaurants());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "bottom-right" });
      dispatch(clearErrors());
    }
  }, [error, dispatch]);

  // Columns
  const columns = [
    {
      name: "Restaurant",
      selector: (row) => row.restaurant,
      sortable: true,
    },
    {
      name: "Items",
      selector: (row) => row.items,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => (
        <span
          className={
            row.status.includes("Delivered")
              ? "status-delivered"
              : "status-pending"
          }
        >
          {row.status}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <Link to={`/eats/orders/${row.id}`} className="btn btn-primary btn-sm">
          View
        </Link>
      ),
    },
  ];

  // Data
  const data =
    orders?.map((order) => ({
      id: order._id,
      restaurant: order.restaurant?.name || "Unknown",
      items: order.orderItems.length,
      amount: `₹${order.finalTotal}`,
      status: order.orderStatus,
      date: new Date(order.createdAt).toLocaleDateString(),
    })) || [];

  return (
    <div className="list-orders-container">
      <h1 className="orders-title">
        <i className="fa fa-shopping-bag mr-2"></i> My Orders
      </h1>

      {loading ? (
        <Loader />
      ) : (
        <DataTable
          columns={columns}
          data={data}
          pagination
          highlightOnHover
          striped
          responsive
          customStyles={customStyles}
        />
      )}
    </div>
  );
};

// Custom styling
const customStyles = {
  table: {
    style: {
      borderRadius: "16px",
      overflow: "hidden",
    },
  },
  headRow: {
    style: {
      backgroundColor: "#f6f6f8",
      borderBottom: "1px solid #e5e5ea",
      minHeight: "52px",
    },
  },
  headCells: {
    style: {
      fontWeight: 700,
      fontSize: "12px",
      textTransform: "uppercase",
      letterSpacing: "0.04em",
      color: "#6b6b76",
    },
  },
  rows: {
    style: {
      fontSize: "14px",
      minHeight: "60px",
      "&:not(:last-of-type)": {
        borderBottomColor: "#e5e5ea",
      },
    },
    highlightOnHoverStyle: {
      backgroundColor: "#fafafa",
      transitionDuration: "0.15s",
      borderBottomColor: "#e5e5ea",
      outline: "none",
    },
  },
  pagination: {
    style: {
      borderTop: "1px solid #e5e5ea",
    },
  },
};

export default ListOrders;
