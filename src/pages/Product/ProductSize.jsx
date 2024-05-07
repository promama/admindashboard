import { CircularProgress, TextField } from "@mui/material";
import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDeleteProductSize,
  fetchUpdateProductSize,
} from "../../Slices/productSlice";
import { reset } from "../../Slices/userSlice";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";

function ProductSize(props) {
  const [isEdit, setIsEdit] = useState(false);
  const [size, setSize] = useState(props.size?.productSize);
  const [quantity, setQuantity] = useState(props.size?.quantity);
  const [price, setPrice] = useState(props.size?.price);
  const [deleteSize, setDeleteSize] = useState(false);

  const isLoading = useSelector((state) => state.product.isLoading);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSaveSize = async (e) => {
    setIsEdit(!isEdit);
    setDeleteSize(false);
    try {
      const res = await dispatch(
        fetchUpdateProductSize({
          sizeId: props.size._id,
          productId: props.size.productId,
          productColor: props.size.productColor,
          size,
          quantity,
          price,
        })
      ).unwrap();
      alert(res.message);
    } catch (err) {
      if (err.message === "signin again") {
        dispatch(reset());
        navigate("/signin");
      } else {
        alert(err.message);
      }
    }
  };

  const handleDeleteSize = async (e) => {
    setDeleteSize(false);
    try {
      const res = await dispatch(
        fetchDeleteProductSize({
          sizeId: props.size._id,
          productId: props.size.productId,
          productColor: props.size.productColor,
          size: props.size.productSize,
        })
      ).unwrap();
      alert(res.message);
    } catch (err) {
      if (err.message === "signin again") {
        dispatch(reset());
        navigate("/signin");
      } else {
        alert(err.message);
      }
    }
  };
  return (
    <Row
      value={props.size?.productSize}
      key={props.size?.productId.toString() + props.index + props.size?.color}
      className="mt-2"
    >
      <Col xs={2}>
        {isEdit ? (
          <TextField
            value={size}
            variant="standard"
            className="mt-1"
            onChange={(e) => {
              setSize(e.target.value.replace(/\D/, ""));
            }}
          ></TextField>
        ) : (
          size
        )}
      </Col>
      <Col xs={2}>
        {isEdit ? (
          <TextField
            value={quantity}
            variant="standard"
            className="mt-1"
            onChange={(e) => {
              setQuantity(e.target.value.replace(/\D/, ""));
            }}
          ></TextField>
        ) : (
          quantity
        )}
      </Col>
      <Col xs={3}>
        {isEdit ? (
          <TextField
            value={price}
            variant="standard"
            className="mt-1"
            onChange={(e) => {
              setPrice(e.target.value.replace(/\D/, ""));
            }}
          ></TextField>
        ) : (
          price
        )}
      </Col>
      <Col xs={5}>
        {isLoading ? (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        ) : (
          <Row>
            <Col className="mr-2" xs={4}>
              {/* separate component for loading */}
              {isEdit ? (
                <Button variant="outline-primary" onClick={handleSaveSize}>
                  save
                </Button>
              ) : !deleteSize ? (
                <Button
                  variant="outline-primary"
                  onClick={() => {
                    setIsEdit(!isEdit);
                  }}
                >
                  edit
                </Button>
              ) : (
                <Button variant="outline-danger" onClick={handleDeleteSize}>
                  confirm?
                </Button>
              )}
            </Col>
            <Col xs={7}>
              {isEdit ? (
                <Button
                  variant="outline-primary"
                  onClick={() => setIsEdit(false)}
                >
                  cancel
                </Button>
              ) : !deleteSize ? (
                <Button
                  variant="outline-danger"
                  onClick={() => setDeleteSize(!deleteSize)}
                >
                  delete
                </Button>
              ) : (
                <Button
                  variant="outline-primary"
                  onClick={() => setDeleteSize(!deleteSize)}
                >
                  Cancel
                </Button>
              )}
            </Col>
          </Row>
        )}
      </Col>
    </Row>
  );
}

export default ProductSize;
