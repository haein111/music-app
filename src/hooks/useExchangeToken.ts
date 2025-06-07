import React from "react";
import { exchangeToken } from "../apis/authApi";
import { exchangeTokenResponse } from "../models/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useExchangeToken = () => {
  const queryClient = useQueryClient();
  return useMutation<
    exchangeTokenResponse,
    Error,
    { code: string; codeVerifier: string }
  >({
    mutationFn: ({ code, codeVerifier }) => exchangeToken(code, codeVerifier),
    onSuccess: (data) => {
      localStorage.setItem("access_token", data.access_token);
      queryClient.invalidateQueries({
        queryKey: ["current-user-profile"],
      });
    },
  });
};

export default useExchangeToken;
