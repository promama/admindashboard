import React from "react";
import { Card, Col, Container, Row, Stack } from "react-bootstrap";
import { useSelector } from "react-redux";
import ProductColor from "./ProductColor";

function SingleProduct(props) {
  const colors = useSelector((state) => state.product.colors);

  const checkColorMatchProduct = (colorId, productId) => {
    if (colorId === productId) return true;
    return false;
  };
  return (
    <Stack className="mt-1">
      {props.products && (
        <div className="mb-4">
          <Card>
            <Card.Header className="bg-transparent">
              {props.products.name}
            </Card.Header>
            <Card.Body>
              <Container className="mb-2">
                <Row className="mb-2">
                  <Col xs={3}>
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
                  <Col xs={9}>
                    <Row>
                      <Col xs={2}>brand: {props.products.brand}</Col>
                      <Col>category: {props.products.category}</Col>
                    </Row>
                    {colors.map((color) => {
                      return (
                        checkColorMatchProduct(
                          color.productId,
                          props.products._id
                        ) && <ProductColor colors={color} key={color._id} />
                      );
                    })}
                  </Col>
                </Row>
              </Container>
            </Card.Body>
          </Card>
        </div>
      )}
    </Stack>
  );
}

export default SingleProduct;
