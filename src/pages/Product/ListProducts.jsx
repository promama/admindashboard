import React from "react";
import { Button, Card, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import SingleProduct from "./SingleProduct";
import { showOffcanvasCreateProduct } from "../../Slices/productSlice";

function ListProducts() {
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();

  const handleCreateProduct = () => {
    dispatch(showOffcanvasCreateProduct());
  };

  return (
    <Card>
      <Card.Header className="bg-transparent mt-2 d-flex justify-content-between">
        All products{" "}
        <Button variant="outline-primary" onClick={handleCreateProduct}>
          Create Product
        </Button>
      </Card.Header>
      <Card.Body>
        {products &&
          products.map((product, index) => {
            return (
              <Container key={product._id + index} className="d-flex">
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
