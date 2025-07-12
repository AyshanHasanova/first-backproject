import { Navigate } from "react-router-dom";

import { useGetUserProfileQuery } from "../redux/api/userApi";

const PrivateRoute = ({ children, allowedRoles }) => {
  //   const token = localStorage.getItem("token");

  const { data, isLoading, isError } = useGetUserProfileQuery();

  if (isLoading) return <p>Yuklenir...</p>;

  if (isError || !data?.user) {
    return <Navigate to="/login" replace />;
  }

  const userRole = data.user.role;

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default PrivateRoute;