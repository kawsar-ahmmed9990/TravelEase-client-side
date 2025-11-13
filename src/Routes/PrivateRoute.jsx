import React, { use } from "react";
import { AuthContext } from "../Provider/AuthContext";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, authProviderLoading } = use(AuthContext);

  if (authProviderLoading) {
    return (
      <div className="flex justify-center items-center h-64 bg-[#f1f5e8] dark:bg-gray-900">
        <div className="text-3xl font-bold text-black dark:text-white flex flex-col items-center">
          <p className="mt-2">
            L<span className="inline-block animate-spin">🔄</span>ading...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to={"/auth/signin"}></Navigate>;
  }

  return children;
};

export default PrivateRoute;
