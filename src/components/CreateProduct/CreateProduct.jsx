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

  const [isCreateNewProduct, setIsCreateNewProduct] = useState(
    "bg-primary text-white"
  );
  const [isCreateExistProduct, setIsCreateExistProduct] = useState("");
  const [isNew, setIsNew] = useState(true);

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
        <Offcanvas.Title className="fs-2">Create Product</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Container className="d-inline ">
          <Row>
            <Col>
              <Button
                className={isCreateNewProduct}
                variant="outline-primary"
                onClick={() => {
                  setIsCreateNewProduct("bg-primary text-white");
                  setIsCreateExistProduct("");
                  setIsNew(true);
                }}
              >
                Create new Product
              </Button>
            </Col>
            <Col>
              <Button
                className={isCreateExistProduct}
                variant="outline-primary"
                onClick={() => {
                  setIsCreateNewProduct("");
                  setIsCreateExistProduct("bg-primary text-white");
                  setIsNew(false);
                }}
              >
                Create exsist Product
              </Button>
            </Col>
          </Row>
          <hr></hr>
          <Row>{isNew ? <CreateNewProduct /> : <CreateExistProduct />}</Row>
        </Container>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default CreateProduct;
