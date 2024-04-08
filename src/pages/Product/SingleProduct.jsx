import React from "react";
import { Button, Card, Col, Container, Row, Stack } from "react-bootstrap";
import { useSelector } from "react-redux";
import ProductColor from "./ProductColor";

function SingleProduct(props) {
  const colors = useSelector((state) => state.product.colors);

  const checkColorMatchProduct = (colorId, productId) => {
    if (colorId === productId) return true;
    return false;
  };
  return (
    <Stack className="mt-1 d-flex">
      {props.products && (
        <div className="mb-4">
          <Card>
            <Card.Header className="bg-transparent">
              {props.products.name}
            </Card.Header>
            <Card.Body>
              <Container className="mb-2">
                <Row className="mb-2">
                  <Col xs="auto">
                    <img
                      src={props.products.url}
                      alt=""
                      style={{
                        width: "250px",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                  </Col>
                  <Col xs="auto">
                    <Row>
                      <Col xs="auto" md={2}>
                        brand: {props.products.brand}
                      </Col>
                      <Col xs="auto">category: {props.products.category}</Col>
                    </Row>
                    {colors.map((color, index) => {
                      return (
                        checkColorMatchProduct(
                          color.productId,
                          props.products._id
                        ) && (
                          <ProductColor
                            colors={color}
                            key={color._id + index}
                          />
                        )
                      );
                    })}
                  </Col>
                </Row>
              </Container>
              <Button variant="outline-primary" className="mr-3">
                Edit
              </Button>
              <Button variant="outline-primary" className="mr-3">
                Refill
              </Button>
              <Button variant="outline-danger">Delete</Button>
            </Card.Body>
          </Card>
        </div>
      )}
    </Stack>
  );
}

export default SingleProduct;
