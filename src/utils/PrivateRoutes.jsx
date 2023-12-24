import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { fetchVerify, reset } from "../Slices/userSlice";

function PrivateRoutes() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allowAccess = useSelector((state) => state.user.allowAccess);

  useEffect(() => {
    try {
      dispatch(fetchVerify());
    } catch (err) {
      dispatch(reset());
      navigate("/signin");
    }
  }, [dispatch, navigate]);
  return allowAccess ? <Outlet /> : <Navigate to="/signin" />;
}

export default PrivateRoutes;
