import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCreateProduct } from "../../Slices/productSlice";
import { reset } from "../../Slices/userSlice";
const yup = require("yup");

const testValidate = yup.object().shape({
  name: yup.string().required().nonNullable().trim(),
  category: yup.string().required().nonNullable().trim(),
  brand: yup.string().required().nonNullable().trim(),
  description: yup.string().required().nonNullable().trim(),
  color: yup.string().required().nonNullable().trim(),
  size: yup.number().required().positive(),
  quantity: yup.number().required().positive(),
  price: yup.number().required().positive(),
});

function CreateNewProduct() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(1);

  const [file, setFile] = useState([]);
  const [files, setFiles] = useState(new FormData());
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelectFile = async (e) => {
    setFile("");
    // setFile(...file, e.target.files[0]);
    const data = new FormData();

    if (e.target.files.length < 5) {
      for (let i = 0; i < e.target.files.length; i++) {
        data.append("myFiles", e.target.files[i]);
        setFile((file) => [...file, e.target.files[i]]);
      }
      data.append(
        "productData",
        JSON.stringify({
          success: true,
          multiple: true,
          folderName: name,
          folderColor: color,
          brand: brand,
          category: category,
          description: description,
          size: size,
          quantity: quantity,
          price: price,
        })
      );
      setFiles(data);
      console.log(files?.test);
    } else {
      alert("only upload 4 or less than 4 files");
      setFiles("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const obj = {
      name: data.get("name"),
      category: data.get("category"),
      brand: data.get("brand"),
      description: data.get("description"),
      color: data.get("color"),
      size: parseInt(data.get("size")),
      quantity: parseInt(data.get("quantity")),
      price: parseInt(data.get("price")),
    };
    testValidate
      .validate(obj)
      .then(function (value) {
        console.log("data ready to dispatch");
      })
      .catch(function (err) {
        console.log(err);
      });

    console.log(files);
    try {
      const res = await dispatch(fetchCreateProduct(files)).unwrap();
      alert(res.message);
      console.log(res.message);
    } catch (err) {
      if (err.message === "signin again") {
        dispatch(reset());
        navigate("/signin");
      } else {
        console.log(err);
        alert(err.message);
      }
    }
  };

  return (
    <>
      <Box
        className="align-items-center"
        component="form"
        onSubmit={handleSubmit}
      >
        {/* product name */}
        <Row>
          <Col xs={6}>
            <TextField
              margin="normal"
              fullWidth
              required
              name="name"
              label="Product Name"
              type="text"
              sx={{ marginBottom: 2 }}
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></TextField>
          </Col>
        </Row>
        {/* product category */}
        <Row>
          <Col xs={6}>
            <TextField
              margin="normal"
              fullWidth
              required
              name="category"
              label="Product Category"
              type="text"
              sx={{ marginBottom: 2 }}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            ></TextField>
          </Col>
        </Row>
        {/* product brand */}
        <Row>
          <Col xs={6}>
            <TextField
              margin="normal"
              fullWidth
              required
              name="brand"
              label="Product Brand"
              type="text"
              sx={{ marginBottom: 2 }}
              onChange={(e) => {
                setBrand(e.target.value);
              }}
            ></TextField>
          </Col>
        </Row>
        {/* product description */}
        <Row>
          <Col xs={6}>
            <TextField
              margin="normal"
              fullWidth
              required
              name="description"
              label="Product Description"
              type="text"
              sx={{ marginBottom: 2 }}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></TextField>
          </Col>
        </Row>
        {/* product color */}
        <Row>
          <Col xs={6}>
            <TextField
              margin="normal"
              fullWidth
              required
              name="color"
              label="Product Color"
              type="text"
              sx={{ marginBottom: 2 }}
              onChange={(e) => {
                setColor(e.target.value);
              }}
            ></TextField>
          </Col>
        </Row>
        {/* product size */}
        <Row>
          <Col xs={6}>
            <TextField
              margin="normal"
              fullWidth
              required
              value={size}
              name="size"
              label="Product Size"
              sx={{ marginBottom: 2 }}
              onChange={(e) => {
                setSize(e.target.value.replace(/\D/, ""));
              }}
            ></TextField>
          </Col>
        </Row>
        {/* product quantity */}
        <Row>
          <Col xs={6}>
            <TextField
              margin="normal"
              fullWidth
              required
              value={quantity}
              name="quantity"
              label="Product Quantity"
              sx={{ marginBottom: 2 }}
              onChange={(e) => {
                setQuantity(e.target.value.replace(/\D/, ""));
              }}
            ></TextField>
          </Col>
        </Row>
        {/* product price */}
        <Row>
          <Col xs={6}>
            <TextField
              margin="normal"
              fullWidth
              required
              value={price}
              name="price"
              label="Product Price"
              sx={{ marginBottom: 2 }}
              onChange={(e) => {
                setPrice(e.target.value.replace(/\D/, ""));
              }}
            ></TextField>
          </Col>
        </Row>
        {/* product 4 images */}
        <Row>
          <input
            className="mb-2"
            id="file"
            type="file"
            onChange={handleSelectFile}
            multiple
          />
          {file &&
            file.map((sfile) => {
              return (
                <Col xs={3}>
                  <img
                    width="100%"
                    height="auto"
                    alt=""
                    className="image"
                    src={URL.createObjectURL(sfile)}
                    key={URL.createObjectURL(sfile)}
                  />
                </Col>
              );
            })}
        </Row>
        <Button className="mt-3" type="submit" variant="contained">
          Create new Product
        </Button>
      </Box>
    </>
  );
}

export default CreateNewProduct;
