import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useLocation, useNavigate } from "react-router";

const useUserLogout = () => {
  const qeryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = async () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("code-verifier");

    qeryClient.clear();

    qeryClient.refetchQueries();
    navigate(location.pathname, { replace: true });
  };

  return logout;
};

export default useUserLogout;
