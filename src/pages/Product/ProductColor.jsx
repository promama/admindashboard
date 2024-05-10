import { Box, CircularProgress, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ProductSize from "./ProductSize";
import { HexColorPicker } from "react-colorful";
import {
  fetchAddProductSize,
  fetchDeleteProductColor,
  fetchUpdateProductColor,
} from "../../Slices/productSlice";
import { reset } from "../../Slices/userSlice";
import { useNavigate } from "react-router-dom";

function ProductColor(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sizes = useSelector((state) => state.product.sizes);
  const isLoading = useSelector((state) => state.product.isLoading);

  const [isColorEdit, setIsColorEdit] = useState(false);
  const [color, setColor] = useState(props.colors?.productColor);
  const [addSize, setAddSize] = useState(false);
  const [deleteColor, setDeleteColor] = useState(false);

  const [newSize, setNewSize] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  const [newPrice, setNewPrice] = useState("");

  function isMatched(arg1, arg2) {
    if (arg1 === arg2) return true;
    return false;
  }

  const handleEditColor = async () => {
    setIsColorEdit(!isColorEdit);
    try {
      const res = await dispatch(
        fetchUpdateProductColor({
          colorId: props.colors?._id,
          productColor: color,
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

  const handleAddSize = async () => {
    setAddSize(!addSize);
    try {
      const res = await dispatch(
        fetchAddProductSize({
          productId: props.colors?.productId,
          productColor: props.colors?.productColor,
          size: newSize,
          quantity: newQuantity,
          price: newPrice,
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

  const handleDeleteColor = async () => {
    //productId and productColor
    setAddSize(!addSize);
    try {
      const res = await dispatch(
        fetchDeleteProductColor({
          productId: props.colors?.productId,
          productColor: props.colors?.productColor,
          productName: props.colors?.productName,
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
    <>
      <Row className="mb-2 mt-2">
        <Col lg={1} xs="auto">
          <Box
            sx={{
              backgroundColor: color,
              width: "1.5rem",
              height: "1.5rem",
              borderRadius: "50%",
              border: 2,
            }}
          ></Box>
          {isColorEdit ? (
            <>
              <TextField
                value={color}
                variant="standard"
                onChange={(e) => {
                  setColor(e.target.value);
                }}
                style={{ minWidth: "75px" }}
              ></TextField>
              <HexColorPicker
                className="m-2"
                color={color}
                onChange={setColor}
              />
            </>
          ) : (
            <label className="w-10">{color}</label>
          )}
        </Col>
        <Col lg={3} xs="auto">
          {isColorEdit ? (
            <>
              <Button
                className="ml-2"
                variant="outline-primary"
                onClick={handleEditColor}
              >
                Save
              </Button>
              <Button
                className="ml-2"
                variant="outline-danger"
                onClick={() => {
                  setIsColorEdit(false);
                  setColor(props.colors?.productColor);
                }}
              >
                Cancel
              </Button>
            </>
          ) : !deleteColor ? (
            <>
              <Button
                variant="outline-primary"
                onClick={() => setIsColorEdit(true)}
              >
                Edit
              </Button>
              <Button
                className="ml-2"
                variant="outline-danger"
                onClick={() => setDeleteColor(!deleteColor)}
              >
                Delete
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline-danger" onClick={handleDeleteColor}>
                confirm?
              </Button>
              <Button
                className="ml-2"
                variant="outline-primary"
                onClick={() => setDeleteColor(!deleteColor)}
              >
                Cancel
              </Button>
            </>
          )}
        </Col>
        <Col className="mr-2" lg={1} xs="auto">
          <div className="bg-image hover-zoom">
            <img
              src={props.colors.url}
              alt=""
              style={{ width: "70px", height: "50px", objectFit: "cover" }}
            />
          </div>
        </Col>
        <Col className="mr-2" lg={1} xs="auto">
          <img
            src={props.colors.url1}
            alt=""
            style={{ width: "70px", height: "50px", objectFit: "cover" }}
          />
        </Col>
        <Col className="mr-2" lg={1} xs="auto">
          <img
            src={props.colors.url2}
            alt=""
            style={{ width: "70px", height: "50px", objectFit: "cover" }}
          />
        </Col>
        <Col className="mr-2" lg={1} xs="auto">
          <img
            src={props.colors.url3}
            alt=""
            style={{ width: "70px", height: "50px", objectFit: "cover" }}
          />
        </Col>
        <Col lg={3} xs="auto">
          <Button variant="outline-primary">Edit images</Button>
        </Col>
        <Col className="ml-2" lg={10} xs="auto">
          <Row>
            <Col xs={2} className="text-center">
              sizes
            </Col>
            <Col xs={2} className="text-center">
              qty
            </Col>
            <Col xs={2} className="text-center">
              price
            </Col>
            <Col xs={5} className="text-center">
              actions
            </Col>
          </Row>
          {sizes.map((size, index) => {
            return (
              isMatched(size?.productId, props.colors?.productId) &&
              isMatched(size?.productColor, props.colors?.productColor) && (
                <>
                  <ProductSize size={size} index={index} />
                </>
              )
            );
          })}
          <Row className="d-flex justify-content-center mt-2">
            {addSize ? (
              <>
                <Row className="justify-content-center mb-1">
                  <Col xs="auto">
                    <TextField
                      variant="standard"
                      helperText="size"
                      value={newSize}
                      type="text"
                      inputMode="numeric"
                      onChange={(e) =>
                        setNewSize(e.target.value.replace(/\D/, ""))
                      }
                    ></TextField>
                  </Col>
                  <Col xs="auto">
                    <TextField
                      variant="standard"
                      helperText="quantity"
                      value={newQuantity}
                      onChange={(e) =>
                        setNewQuantity(e.target.value.replace(/\D/, ""))
                      }
                    ></TextField>
                  </Col>
                  <Col xs="auto">
                    <TextField
                      variant="standard"
                      helperText="price"
                      value={newPrice}
                      onChange={(e) =>
                        setNewPrice(e.target.value.replace(/\D/, ""))
                      }
                    ></TextField>
                  </Col>
                </Row>
                {isLoading ? (
                  <Box sx={{ display: "flex" }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <>
                    <Col xs="auto">
                      <Button
                        variant="outline-primary"
                        className="mr-3"
                        onClick={handleAddSize}
                      >
                        Save size
                      </Button>
                    </Col>
                    <Col xs="auto">
                      <Button
                        className="mr-3"
                        variant="outline-danger"
                        onClick={() => setAddSize(!addSize)}
                      >
                        Cancel
                      </Button>
                    </Col>
                  </>
                )}
              </>
            ) : (
              <Col xs="auto">
                <Button
                  variant="outline-primary"
                  className="mr-3 mt-2"
                  onClick={() => setAddSize(!addSize)}
                >
                  Add new size
                </Button>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
      <br />
    </>
  );
}

export default ProductColor;
