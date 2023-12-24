import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import DashBoard from "./pages/DashBoard/DashBoard";
import User from "./pages/User/User";
import Product from "./pages/Product/Product";
import Statistic from "./pages/Statistic/Statistic";
import Order from "./pages/Order/Order";
import Delivery from "./pages/Delivery/Delivery";
import SignIn from "./pages/SignIn/SignIn";
import UserEdit from "./components/UserEdit/UserEdit";
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <UserEdit />
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" Component={DashBoard}></Route>
            <Route path="/users" Component={User}></Route>
            <Route path="/products" Component={Product}></Route>
            <Route path="/statistics" Component={Statistic}></Route>
            <Route path="/orders" Component={Order}></Route>
            <Route path="/deliverys" Component={Delivery}></Route>
          </Route>
          <Route path="/signin" Component={SignIn}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
