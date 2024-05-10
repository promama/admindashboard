import React, { useState } from "react";
import { Button, Col, Container, Offcanvas, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { hideOffCanvasCreateProduct } from "../../Slices/productSlice";
import CreateNewProduct from "./CreateNewProduct";
import CreateExistProduct from "./CreateExistProduct";

function CreateProduct() {
  const isShowCreateProduct = useSelector(
    (state) => state.product.isShowCreateProduct
  );
  const isCreateNewColor = useSelector(
    (state) => state.product.isCreateNewColor
  );
  const colorData = useSelector((state) => state.product.colorData);
  const dispatch = useDispatch();

  return (
    <Offcanvas
      show={isShowCreateProduct}
      onHide={() => {
        dispatch(hideOffCanvasCreateProduct());
      }}
      placement="start"
      style={{ width: "50%", background: "light" }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className="fs-2">
          {!isCreateNewColor ? "Create Product" : "Create Color"}
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Container className="d-inline ">
          <Row>
            {!isCreateNewColor ? (
              <CreateNewProduct />
            ) : (
              <CreateExistProduct colorData={colorData} />
            )}
          </Row>
        </Container>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default CreateProduct;
