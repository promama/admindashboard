import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset } from "../../Slices/userSlice";
import { Card, Col, Row, Stack } from "react-bootstrap";
import { Box } from "@mui/system";
import { Button, CircularProgress } from "@mui/material";
import { formatCurrency } from "../../utils/formatCurrency";
import SingleDelivery from "./SingleDelivery";
import { finishOrder } from "../../Slices/cartSlice";

function Deliverys(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.cart.isLoading);

  function checkStatusDelivering(status) {
    if (status === "Delivering") return true;
    return false;
  }

  function checkStatus(status) {
    if (status === "Finish") {
      return "text-success";
    } else if (status === "Waiting approve") {
      return "text-warning";
    } else if (status === "Delivering") {
      return "text-primary";
    } else {
      return "text-secondary";
    }
  }

  const handleFinishOrder = async () => {
    console.log({ orderId: props.orders.orderId });
    try {
      await dispatch(finishOrder({ orderId: props.orders.orderId })).unwrap();
      alert("Order Finished");
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
              <Stack
                direction="horizontal"
                gap={2}
                className="d-flex align-items-center font-weight-bold"
              >
                <div className="me-auto">Order id: {props.orders.orderId}</div>
                <div className={checkStatus(props.orders.status)}>
                  {props.orders.status}
                </div>
              </Stack>
            </Card.Header>
            <Card.Body>
              {props.orders.productInOrder &&
                props.orders.productInOrder.map((product) => {
                  return (
                    <div>
                      <SingleDelivery
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
                    checkStatusDelivering(props.orders.status) && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleFinishOrder}
                      >
                        Finish Order
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

export default Deliverys;
