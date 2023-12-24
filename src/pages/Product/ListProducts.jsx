import React from "react";
import { Card, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import SingleProduct from "./SingleProduct";

function ListProducts() {
  const products = useSelector((state) => state.product.products);

  return (
    <Card>
      <Card.Header className="bg-transparent mt-2">All products</Card.Header>
      <Card.Body>
        {products &&
          products.map((product, index) => {
            return (
              <Container key={product._id + index}>
                <SingleProduct
                  key={product._id}
                  products={product}
                ></SingleProduct>
              </Container>
            );
          })}
      </Card.Body>
    </Card>
  );
}

export default ListProducts;
