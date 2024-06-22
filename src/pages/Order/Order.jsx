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
  const orderCount = useSelector((state) => state.cart.orderCount);

  const [value, setValue] = useState("");
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
                    label={"All order".concat(" (", orderCount[4], ")")}
                    onClick={() => {
                      setTextColor("black");
                      setIndicatorColor("black");
                      setpageCount(Math.ceil(orderCount[4] / 5));
                      setPage(1);
                    }}
                  />
                  <Tab
                    value="Waiting approve"
                    label={"Waiting Approve".concat(" (", orderCount[0], ")")}
                    onClick={() => {
                      setTextColor("#ff6500");
                      setIndicatorColor("#ff6500");
                      setpageCount(Math.ceil(orderCount[0] / 5));
                      setPage(1);
                    }}
                  />
                  <Tab
                    value="Delivering"
                    label={"Delivering".concat(" (", orderCount[1], ")")}
                    onClick={() => {
                      setTextColor("#00f6ff");
                      setIndicatorColor("#00f6ff");
                      setpageCount(Math.ceil(orderCount[1] / 5));
                      setPage(1);
                    }}
                  />
                  <Tab
                    value="Finish"
                    label={"Finish".concat(" (", orderCount[2], ")")}
                    onClick={() => {
                      setTextColor("#1bff00");
                      setIndicatorColor("#1bff00");
                      setpageCount(Math.ceil(orderCount[2] / 5));
                      setPage(1);
                    }}
                  />
                  <Tab
                    value="Cancelled"
                    label={"Cancelled".concat(" (", orderCount[3], ")")}
                    onClick={() => {
                      setTextColor("#ff2525");
                      setIndicatorColor("#ff2525");
                      setpageCount(Math.ceil(orderCount[3] / 5));
                      setPage(1);
                    }}
                  />
                </Tabs>
              </Box>
              {listOrders &&
                filteredProduct
                  ?.slice(0)
                  .reverse()
                  .filter((order) => order.status.includes(value))
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
