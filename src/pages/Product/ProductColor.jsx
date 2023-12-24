import { Box } from "@mui/material";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

function ProductColor(props) {
  const [size, setSize] = useState("");
  const sizes = useSelector((state) => state.product.sizes);

  function handleBoxChange(e) {
    setSize(e.target.value.toString());
  }

  function isMatched(arg1, arg2) {
    if (arg1 === arg2) return true;
    return false;
  }
  return (
    <>
      <Row className="mb-2 mt-2">
        <Col xs={1}>
          <Box
            sx={{
              backgroundColor: props.colors?.productColor,
              width: "1.5rem",
              height: "1.5rem",
              borderRadius: "50%",
              border: 2,
            }}
          ></Box>
          {props.colors?.productColor}
        </Col>
        <Col xs={1} className="mr-2">
          <img
            src={props.colors.url}
            alt=""
            style={{ width: "70px", height: "50px", objectFit: "cover" }}
          />
        </Col>
        <Col xs={1} className="mr-2">
          <img
            src={props.colors.url1}
            alt=""
            style={{ width: "70px", height: "50px", objectFit: "cover" }}
          />
        </Col>
        <Col xs={1} className="mr-2">
          <img
            src={props.colors.url2}
            alt=""
            style={{ width: "70px", height: "50px", objectFit: "cover" }}
          />
        </Col>
        <Col xs={1} className="mr-2">
          <img
            src={props.colors.url3}
            alt=""
            style={{ width: "70px", height: "50px", objectFit: "cover" }}
          />
        </Col>
        <Col xs={3}>
          <div className="">
            <select
              className="form-select"
              aria-label="Choose size"
              onChange={handleBoxChange}
            >
              <option>Choose Sizes</option>
              {sizes.map((size, index) => {
                return (
                  isMatched(size?.productId, props.colors?.productId) &&
                  isMatched(size?.productColor, props.colors?.productColor) && (
                    <>
                      <option
                        value={size?.productSize}
                        key={size?.productId.toString() + index + size?.color}
                      >
                        {size?.productSize}
                      </option>
                    </>
                  )
                );
              })}
            </select>
          </div>
        </Col>
        <Col xs={2}>
          Quantity:{" "}
          {sizes.map((productSize) => {
            return (
              isMatched(productSize?.productId, props.colors?.productId) &&
              isMatched(
                productSize?.productColor,
                props.colors?.productColor
              ) &&
              isMatched(productSize?.productSize.toString(), size) &&
              productSize?.quantity
            );
          })}
        </Col>
        <Col>
          Price:{" "}
          {sizes.map((productSize) => {
            return (
              isMatched(productSize?.productId, props.colors?.productId) &&
              isMatched(
                productSize?.productColor,
                props.colors?.productColor
              ) &&
              isMatched(productSize?.productSize.toString(), size) &&
              productSize?.price
            );
          })}
        </Col>
      </Row>
    </>
  );
}

export default ProductColor;
