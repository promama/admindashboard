import React, { useRef, useEffect } from "react";
import { Card, Col, Container, Row, Stack } from "react-bootstrap";
import SingleOrder from "./SingleOrder";
import { formatCurrency } from "../../utils/formatCurrency";
import { Button, CircularProgress, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { approveOrder } from "../../Slices/cartSlice";
import { reset } from "../../Slices/userSlice";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";

import socketIOClient from "socket.io-client";

function Order(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.cart.isLoading);
  const socketRef = useRef();

  function checkStatusWaitingApprove(status) {
    if (status === "Waiting approve") return true;
    return false;
  }

  function checkStatus(status) {
    if (status === "Waiting approve") {
      return "#ff6500";
    } else if (status === "Delivering") {
      return "#00f6ff";
    } else if (status === "Finish") {
      return "#1bff00";
    } else return "#ff2525";
  }

  useEffect(() => {
    socketRef.current = socketIOClient.connect("http://localhost:5001");
  });

  const handleApproveOrder = async () => {
    console.log({ orderId: props.orders.orderId });
    try {
      await dispatch(approveOrder({ orderId: props.orders.orderId })).unwrap();
      await socketRef.current.emit("manager:approve-order", {
        message: "manager approve an order",
        orderDetail: props.orders,
      });

      alert("Order Approved");
    } catch (err) {
      if (err.message === "signin again") {
        dispatch(reset());
        navigate("/signin");
      } else {
        console.log(err);
        alert(err.message);
      }
    }
  };

  return (
    <Stack className="mt-1">
      {props.orders && (
        <div className="mb-4">
          <Card>
            <Card.Header className="bg-transparent">
              <Stack gap={2} className="font-weight-bold">
                <Container className="">
                  <Row className="">
                    <Col>
                      <div className="">Order id: {props.orders?.orderId}</div>
                    </Col>
                    <Col className="d-flex justify-content-end">
                      <div
                        className=""
                        style={{ color: checkStatus(props.orders.status) }}
                      >
                        {props.orders.status}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <div className="me-auto">
                      Receiver: {props.orders?.name}
                    </div>
                  </Row>
                  <Row>
                    <div className="me-auto">
                      Phone numbers: {props.orders?.phoneNumber}
                    </div>
                  </Row>
                  <Row>
                    <div className="me-auto">
                      Address: {props.orders?.address}
                    </div>
                  </Row>
                </Container>
              </Stack>
            </Card.Header>
            <Card.Body>
              {props.orders.productInOrder &&
                props.orders.productInOrder.map((product) => {
                  return (
                    <div>
                      <SingleOrder
                        product={product}
                        key={product._id + product.orderId}
                      />
                    </div>
                  );
                })}
              <Row>
                <Col xs={10}>
                  {isLoading ? (
                    <Box sx={{ display: "flex" }}>
                      <CircularProgress />
                    </Box>
                  ) : (
                    checkStatusWaitingApprove(props.orders.status) && (
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={handleApproveOrder}
                      >
                        Approve Order
                      </Button>
                    )
                  )}
                </Col>
                <Col
                  className="d-flex align-items-center flex-row-reverse"
                  xs={2}
                >
                  <div className="text-primary">
                    {formatCurrency(props.orders?.total)}
                  </div>
                  Total:
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </div>
      )}
    </Stack>
  );
}

export default Order;
