import React, { useEffect, useMemo, useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import TopBar from "../../components/TopBar/TopBar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showAllOrder } from "../../Slices/cartSlice";
import { Card, Container } from "react-bootstrap";
import Orders from "../../components/Orders/Orders";
import { Box, Pagination, Tab, Tabs, TextField } from "@mui/material";

function Order() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const listOrders = useSelector((state) => state.cart.orders);

  const [value, setValue] = useState("In cart");
  const [textColor, setTextColor] = useState("blue");
  const [indicatorColor, setIndicatorColor] = useState("blue");

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangePagination = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    setpageCount(Math.ceil(filteredProduct.length / 5));
  }, [setpageCount, filteredProduct]);

  useEffect(() => {
    try {
      dispatch(showAllOrder());
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
              <Box sx={{ width: "100%", marginBottom: "10px" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  textColor="primary"
                  sx={{
                    "& .MuiTab-root.Mui-selected": {
                      color: textColor,
                    },
                    "& .MuiTabs-indicator": {
                      backgroundColor: indicatorColor,
                      height: 3,
                    },
                  }}
                  aria-label="secondary tabs example"
                >
                  <Tab
                    value=""
                    label="All order"
                    onClick={() => {
                      setTextColor("black");
                      setIndicatorColor("black");
                    }}
                  />
                  <Tab
                    value="In cart"
                    label="In cart"
                    onClick={() => {
                      setTextColor("blue");
                      setIndicatorColor("blue");
                    }}
                  />
                  <Tab
                    value="Waiting approve"
                    label="Waiting Approve"
                    onClick={() => {
                      setTextColor("#ff6500");
                      setIndicatorColor("#ff6500");
                    }}
                  />
                  <Tab
                    value="Delivering"
                    label="Delivering"
                    onClick={() => {
                      setTextColor("#00f6ff");
                      setIndicatorColor("#00f6ff");
                    }}
                  />
                  <Tab
                    value="Finish"
                    label="Finish"
                    onClick={() => {
                      setTextColor("#1bff00");
                      setIndicatorColor("#1bff00");
                    }}
                  />
                  <Tab
                    value="Cancelled"
                    label="Cancelled"
                    onClick={() => {
                      setTextColor("#ff2525");
                      setIndicatorColor("#ff2525");
                    }}
                  />
                </Tabs>
              </Box>
              {listOrders &&
                filteredProduct
                  ?.slice(0)
                  .reverse()
                  .map((order, index) => {
                    if (
                      index > (page - 1) * 5 - 1 &&
                      index < (page - 1) * 5 + 5
                    ) {
                      if (order.status === value || value === "") {
                        return (
                          <Container>
                            <Orders key={order.orderId} orders={order} />
                          </Container>
                        );
                      }
                      return <></>;
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

export default Order;
