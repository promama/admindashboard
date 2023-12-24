import React from "react";
import { Card, Col, Row, Stack } from "react-bootstrap";
import SingleOrder from "./SingleOrder";
import { formatCurrency } from "../../utils/formatCurrency";
import { Button } from "@mui/material";

function Order(props) {
  function checkStatusWaitingApprove(status) {
    if (status === "Waiting approve") return true;
    return false;
  }

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
                  // return <Stack>{product.productName}</Stack>;
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
                  {checkStatusWaitingApprove(props.orders.status) && (
                    <Button variant="contained" color="warning">
                      Approve Order
                    </Button>
                  )}
                  {checkStatusDelivering(props.orders.status) && (
                    <Button variant="contained">Finish Order</Button>
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
