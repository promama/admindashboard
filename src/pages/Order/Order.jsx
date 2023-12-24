import React, { useEffect } from "react";
import SideBar from "../../components/SideBar/SideBar";
import TopBar from "../../components/TopBar/TopBar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showAllOrder } from "../../Slices/cartSlice";
import { Card, Container } from "react-bootstrap";
import Orders from "../../components/Orders/Orders";

function Order() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const listOrders = useSelector((state) => state.cart.orders);

  useEffect(() => {
    try {
      dispatch(showAllOrder());
    } catch (err) {
      if (err.message === "signin again") {
        navigate("/login");
      }
    }
  }, [dispatch, navigate]);

  return (
    <body id="page-top">
      {/* Page Wrapper */}
      <div id="wrapper">
        <SideBar />
        {/* Topbar */}
        <div className="d-flex flex-column" id="content-wrapper">
          <TopBar />
          <Card>
            <Card.Header className="bg-transparent mt-2">
              All Orders
            </Card.Header>
            <Card.Body>
              {listOrders &&
                listOrders
                  ?.slice(0)
                  .reverse()
                  .map((order) => {
                    return (
                      <Container>
                        <Orders key={order.orderId} orders={order} />
                      </Container>
                    );
                  })}
            </Card.Body>
          </Card>
        </div>
      </div>
    </body>
  );
}

export default Order;
