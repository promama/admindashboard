import React, { useEffect, useMemo, useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import TopBar from "../../components/TopBar/TopBar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Container } from "react-bootstrap";
import Deliverys from "../../components/Deliverys/Deliverys";
import { showDeliveringOrder } from "../../Slices/cartSlice";
import { Pagination, TextField } from "@mui/material";

function Delivery() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const listOrders = useSelector((state) => state.cart.orders);

  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageCount, setpageCount] = useState(1);

  const filteredProduct = useMemo(() => {
    return listOrders.filter((item) => {
      return (
        item.name?.toLowerCase().includes(query.toLowerCase()) ||
        item.phoneNumber?.toLowerCase().includes(query.toLowerCase())
      );
    });
  }, [listOrders, query]);

  const handleChangePagination = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    setpageCount(Math.ceil(filteredProduct.length / 5));
  }, [setpageCount, filteredProduct]);

  useEffect(() => {
    try {
      dispatch(showDeliveringOrder());
    } catch (err) {
      if (err.message === "signin again") {
        navigate("/login");
      }
    }
  }, [dispatch, navigate]);
  return (
    <body id="page-top">
      {/* Page Wrapper */}
      <div id="wrapper">
        <SideBar />
        {/* Topbar */}
        <div className="d-flex flex-column" id="content-wrapper">
          <TopBar />
          <Card>
            <Card.Header className="bg-transparent mt-2">
              <TextField
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="search"
                helperText="search"
                variant="standard"
              ></TextField>
            </Card.Header>
            <Card.Body>
              {listOrders &&
                filteredProduct
                  ?.slice(0)
                  .reverse()
                  .map((order, index) => {
                    if (
                      index > (page - 1) * 5 - 1 &&
                      index < (page - 1) * 5 + 5
                    ) {
                      if (order.status === "Delivering") {
                        return (
                          <Container>
                            <Deliverys key={order.orderId} orders={order} />
                          </Container>
                        );
                      } else {
                        return <></>;
                      }
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
              />
            </Card.Footer>
          </Card>
        </div>
        {/* Scroll to Top Button*/}
        <a className="scroll-to-top rounded" href="#page-top">
          <i className="fas fa-angle-up"></i>
        </a>
      </div>
    </body>
  );
}

export default Delivery;
