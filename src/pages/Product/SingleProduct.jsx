import React, { useState } from "react";
import { Button, Card, Col, Container, Row, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ProductColor from "./ProductColor";
import {
  fetchUpdateProductBrand,
  fetchUpdateProductCategory,
  fetchUpdateProductName,
} from "../../Slices/productSlice";
import { TextField } from "@mui/material";
import { reset } from "../../Slices/userSlice";
import { useNavigate } from "react-router-dom";
import { HexColorPicker } from "react-colorful";
import { Box } from "@mui/system";

function SingleProduct(props) {
  const colors = useSelector((state) => state.product.colors);

  const [color, setColor] = useState("#ffffff");

  const [addColor, setAddColor] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState(false);

  const [editName, setEditName] = useState(false);
  const [editBrand, setEditBrand] = useState(false);
  const [editCategory, setEditCategory] = useState(false);

  const [productName, setProductName] = useState(props.products.name);
  const [productBrand, setProductBrand] = useState(props.products.brand);
  const [productCategory, setProductCategory] = useState(
    props.products.category
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkColorMatchProduct = (colorId, productId) => {
    if (colorId === productId) return true;
    return false;
  };

  const handleSaveName = async (e) => {
    setEditName(!editName);
    try {
      const res = await dispatch(
        fetchUpdateProductName({
          productId: props.products._id,
          productName: productName,
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

  const handleSaveBrand = async (e) => {
    setEditBrand(!editBrand);
    try {
      const res = await dispatch(
        fetchUpdateProductBrand({
          productId: props.products._id,
          productBrand: productBrand,
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

  const handleSaveCategory = async (e) => {
    setEditCategory(!editCategory);
    try {
      const res = await dispatch(
        fetchUpdateProductCategory({
          productId: props.products._id,
          productCategory: productCategory,
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
    <Stack className="mt-1 d-flex">
      {props.products && (
        <div className="mb-4">
          <Card>
            <Card.Header className="bg-transparent">
              {editName ? (
                <>
                  <TextField
                    sx={{ width: "400px" }}
                    variant="standard"
                    value={productName}
                    onChange={(e) => {
                      setProductName(e.target.value);
                    }}
                  ></TextField>
                  <Button
                    className="ml-2"
                    variant="outline-primary"
                    onClick={handleSaveName}
                  >
                    Save
                  </Button>
                  <Button
                    className="ml-2"
                    variant="outline-danger"
                    onClick={() => {
                      setEditName(false);
                      setProductName(props.products.name);
                    }}
                  >
                    cancel
                  </Button>
                </>
              ) : (
                <>
                  <label>{props.products.name}</label>
                  <Button
                    className="ml-2"
                    variant="outline-primary"
                    onClick={() => {
                      setEditName(!editName);
                    }}
                  >
                    Edit name
                  </Button>
                </>
              )}
            </Card.Header>
            <Card.Body>
              <Container className="mb-2">
                <Row className="mb-2">
                  <Col xl={3} lg="auto">
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
                  <Col xl={9} lg="auto">
                    <Row>
                      <Col xs="auto">
                        <label className="text-primary font-weight-bold">
                          BRAND
                        </label>
                        {editBrand ? (
                          <div xs="auto">
                            <TextField
                              fullWidth
                              sx={{ width: "50%", ml: "1rem" }}
                              variant="standard"
                              value={productBrand}
                              onChange={(e) => {
                                setProductBrand(e.target.value);
                              }}
                            ></TextField>
                            <Button
                              className="ml-2"
                              variant="outline-primary"
                              onClick={handleSaveBrand}
                            >
                              Save
                            </Button>
                            <Button
                              className="ml-2"
                              variant="outline-danger"
                              onClick={() => {
                                setEditBrand(false);
                                setProductBrand(props.products.brand);
                              }}
                            >
                              cancel
                            </Button>
                          </div>
                        ) : (
                          <>
                            <label className="ml-2">
                              {props.products.brand}
                            </label>
                            <Button
                              className="ml-2"
                              variant="outline-primary"
                              onClick={() => {
                                setEditBrand(!editBrand);
                              }}
                            >
                              Edit brand
                            </Button>
                          </>
                        )}
                      </Col>
                      <Col xs="auto">
                        <label className="text-primary font-weight-bold">
                          CATEGORY
                        </label>
                        {editCategory ? (
                          <div xs="auto">
                            <TextField
                              fullWidth
                              sx={{ width: "50%", ml: "0.5rem" }}
                              variant="standard"
                              value={productCategory}
                              onChange={(e) => {
                                setProductCategory(e.target.value);
                              }}
                            ></TextField>
                            <Button
                              className="ml-2"
                              variant="outline-primary"
                              onClick={handleSaveCategory}
                            >
                              Save
                            </Button>
                            <Button
                              className="ml-2"
                              variant="outline-danger"
                              onClick={() => {
                                setEditCategory(false);
                                setProductCategory(props.products.category);
                              }}
                            >
                              cancel
                            </Button>
                          </div>
                        ) : (
                          <>
                            <label className="ml-2">
                              {props.products.category}
                            </label>
                            <Button
                              className="ml-2"
                              variant="outline-primary"
                              onClick={() => {
                                setEditCategory(!editCategory);
                              }}
                            >
                              Edit category
                            </Button>
                          </>
                        )}
                      </Col>
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
                            edit={addColor}
                          />
                        )
                      );
                    })}
                  </Col>
                </Row>
              </Container>
              {addColor ? (
                <Row>
                  <Col lg={3} xs="auto">
                    <HexColorPicker
                      className="m-2"
                      color={color}
                      onChange={setColor}
                    />
                    <Box
                      sx={{
                        backgroundColor: color,
                        width: "1.5rem",
                        height: "1.5rem",
                        borderRadius: "50%",
                        border: 2,
                      }}
                    ></Box>
                    <TextField
                      className="mb-2"
                      value={color}
                      variant="standard"
                      onChange={(e) => setColor(e.target.value)}
                    ></TextField>
                    <Button
                      variant="outline-primary"
                      className="mr-3"
                      onClick={() => setAddColor(!addColor)}
                    >
                      Save color
                    </Button>
                    <Button
                      className="mr-3"
                      variant="outline-danger"
                      onClick={() => {
                        setAddColor(!addColor);
                        setColor("#ffffff");
                      }}
                    >
                      Cancel
                    </Button>
                  </Col>
                </Row>
              ) : (
                !deleteProduct && (
                  <Button
                    variant="outline-primary"
                    className="mr-3"
                    onClick={() => setAddColor(!addColor)}
                  >
                    Add new color
                  </Button>
                )
              )}

              {deleteProduct ? (
                <>
                  <Button variant="outline-danger">Confirm?</Button>
                  <Button
                    className="ml-2"
                    variant="outline-primary"
                    onClick={() => setDeleteProduct(!deleteProduct)}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                !addColor && (
                  <Button
                    variant="outline-danger"
                    onClick={() => setDeleteProduct(!deleteProduct)}
                  >
                    Delete
                  </Button>
                )
              )}
            </Card.Body>
          </Card>
        </div>
      )}
    </Stack>
  );
}

export default SingleProduct;
