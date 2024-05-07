import React from "react";
import { Container, Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { hideOffCanvasEditProduct } from "../../Slices/productSlice";

function EditProduct() {
  const dispatch = useDispatch();
  const isShowEditProduct = useSelector(
    (state) => state.product.isShowEditProduct
  );
  const productId = useSelector((state) => state.product.editId);
  const listProducts = useSelector((state) => state.product.products);
  const listColors = useSelector((state) => state.product.colors);
  const listSizes = useSelector((state) => state.product.sizes);
  return (
    <Offcanvas
      show={isShowEditProduct}
      onHide={() => {
        dispatch(hideOffCanvasEditProduct());
      }}
      placement="start"
      style={{ width: "50%", background: "light" }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className="fs-2">Edit Product</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Container className="d-inline">
          {listProducts
            .filter((product) => product._id === productId)
            .map((filteredProduct) => (
              <>{filteredProduct.name}</>
            ))}{" "}
          {listColors
            .filter((color) => color.productId === productId)
            .map((filteredColor) => (
              <>{filteredColor.productColor}</>
            ))}
        </Container>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default EditProduct;
