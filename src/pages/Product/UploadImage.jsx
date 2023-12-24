import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUploadImage } from "../../Slices/productSlice";

function UploadImage() {
  const [file, setFile] = useState(null);
  const loading = useSelector((state) => state.product.loading);
  const dispatch = useDispatch();

  const handleSelectFile = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    try {
      const data = new FormData();
      data.append("my_file", file);
      dispatch(fetchUploadImage(data));
      //const res = await axios.post("http://localhost:5000/upload", data);
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div>
      <label htmlFor="file" className="btn-grey">
        {" "}
        select file
      </label>

      <input
        id="file"
        type="file"
        onChange={handleSelectFile}
        multiple={false}
      />
      {file && <text>{file.type}</text>}
      {file && (
        <>
          <button onClick={handleUpload} className="btn-green">
            {loading ? "uploading..." : "upload to cloudinary"}
          </button>
        </>
      )}
    </div>
  );
}

export default UploadImage;
