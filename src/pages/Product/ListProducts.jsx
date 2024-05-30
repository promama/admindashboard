import React, { useEffect, useMemo, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import SingleProduct from "./SingleProduct";
import { showOffcanvasCreateProduct } from "../../Slices/productSlice";
import { Pagination, TextField } from "@mui/material";

function ListProducts() {
  const products = useSelector((state) => state.product.products);

  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageCount, setpageCount] = useState(1);

  const dispatch = useDispatch();

  const handleCreateProduct = () => {
    dispatch(showOffcanvasCreateProduct());
  };

  const handleChangePagination = (event, value) => {
    setPage(value);
  };

  const filteredProduct = useMemo(() => {
    return products.filter((item) => {
      return item.name.toLowerCase().includes(query.toLowerCase());
    });
  }, [products, query]);

  useEffect(() => {
    setpageCount(Math.ceil(filteredProduct.length / 5));
  }, [setpageCount, filteredProduct]);

  return (
    <Card>
      <Card.Header className="bg-transparent mt-2 d-flex justify-content-between">
        All products{" "}
        <Button variant="outline-primary" onClick={handleCreateProduct}>
          Create Product
        </Button>
      </Card.Header>
      <Card.Body>
        <TextField
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="search"
          helperText="search"
          variant="standard"
        ></TextField>
        {products &&
          filteredProduct.map((product, index) => {
            if (index > (page - 1) * 5 - 1 && index < (page - 1) * 5 + 5) {
              return (
                <Container key={product._id + index} className="d-flex">
                  <SingleProduct
                    key={product._id}
                    products={product}
                  ></SingleProduct>
                </Container>
              );
            } else {
              return <></>;
            }
          })}
      </Card.Body>
      <Card.Footer>
        <Pagination
          count={pageCount}
          page={page}
          variant="outlined"
          color="secondary"
          onChange={handleChangePagination}
        ></Pagination>
      </Card.Footer>
    </Card>
  );
}

export default ListProducts;
