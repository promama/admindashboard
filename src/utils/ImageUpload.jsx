import { useState } from "react";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import { Rowing } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { saveImages } from "../Slices/productSlice";

function ImageUpload(props) {
  const [file, setFile] = useState([]);
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState({});
  const dispatch = useDispatch();

  const [files, setFiles] = useState(new FormData());
  const handleSelectFile = async (e) => {
    setFile("");
    // setFile(...file, e.target.files[0]);
    const data = new FormData();

    for (let i = 0; i < e.target.files.length; i++) {
      data.append("myFiles", e.target.files[i]);
      setFile((file) => [...file, e.target.files[i]]);
    }
    data.append(
      "test",
      JSON.stringify({
        success: true,
        multiple: true,
        folderName: props?.name || "myFolder",
        folderColor: props?.color || "White",
      })
    );
    setFiles(data);
    console.log(data);
    dispatch(saveImages(data));
    // props.handleCallback(files);
  };

  const handleUpload = async () => {
    try {
      setLoading(true);
      //const data = new FormData();
      console.log(files);

      //data.append("myFiles", file);
      // data.append("myFiles", file);
      // const res = await axios.post("http://localhost:80", data);
      const res = await axios({
        method: "POST",
        url: "http://localhost:80/test",
        data: files,
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      setRes(res.data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Row>
        <label htmlFor="file" className="btn-grey"></label>
      </Row>
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
      <Row>
        {file && (
          <>
            <button onClick={handleUpload} className="btn-green">
              {loading ? "uploading..." : "upload to cloudinary"}
            </button>
          </>
        )}
      </Row>
    </div>
  );
}
export default ImageUpload;
