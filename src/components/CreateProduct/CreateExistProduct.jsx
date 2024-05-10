import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { reset } from "../../Slices/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCreateColor } from "../../Slices/productSlice";
import { HexColorPicker } from "react-colorful";

function CreateExistProduct(props) {
  const [color, setColor] = useState("white");

  const [file, setFile] = useState([]);
  const [files, setFiles] = useState(new FormData());
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelectFile = async (e) => {
    setFile("");
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
          folderName: props.colorData.name,
          folderColor: color,
          productId: props.colorData._id,
        })
      );
      setFiles(data);
      console.log(files?.productData);
    } else {
      alert("only upload 4 or less than 4 files");
      setFiles("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(files);
    try {
      const res = await dispatch(fetchCreateColor(files)).unwrap();
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
    <div>
      Create new Color
      <Box
        className="align-items-center"
        component="form"
        onSubmit={handleSubmit}
      >
        {/* product name */}
        <Row>
          <Col>
            <TextField
              margin="normal"
              fullWidth
              disabled
              defaultValue={props.colorData?.name}
              variant="standard"
              name="name"
              label="Product Name"
              type="text"
              sx={{ marginBottom: 2 }}
            ></TextField>
          </Col>
        </Row>
        {/* product category */}
        <Row>
          <Col>
            <TextField
              margin="normal"
              fullWidth
              disabled
              defaultValue={props.colorData?.category}
              variant="standard"
              name="category"
              label="Product Category"
              type="text"
              sx={{ marginBottom: 2 }}
            ></TextField>
          </Col>
        </Row>
        {/* product brand */}
        <Row>
          <Col>
            <TextField
              margin="normal"
              fullWidth
              disabled
              defaultValue={props.colorData?.brand}
              variant="standard"
              name="brand"
              label="Product Brand"
              type="text"
              sx={{ marginBottom: 2 }}
            ></TextField>
          </Col>
        </Row>

        {/* product color */}
        <Row>
          <HexColorPicker className="m-2" color={color} onChange={setColor} />
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
            value={color}
            variant="standard"
            helperText="color"
            name="color"
            type="text"
            required
            onChange={(e) => setColor(e.target.value)}
            style={{ minWidth: "75px", maxWidth: "75px", marginLeft: "10px" }}
          ></TextField>
        </Row>

        {/* product 4 images */}
        <Row>
          <input id="file" type="file" onChange={handleSelectFile} multiple />
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
        <Button type="submit" variant="contained" sx={{ marginTop: "10px" }}>
          Create new Color
        </Button>
      </Box>
    </div>
  );
}

export default CreateExistProduct;
