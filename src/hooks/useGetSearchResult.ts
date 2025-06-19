import { useQuery } from "@tanstack/react-query";
import useClientCredentialToken from "./useClientCredentialToken";
import { searchItemsByKeyword } from "../apis/searchApi";
import { SearchRequestParams } from "../models/search";

const useGetSearchResult = (params: SearchRequestParams) => {
  const clientCedentialToken = useClientCredentialToken();
  return useQuery({
    queryKey: ["search", params],
    enabled: !!clientCedentialToken && !!params.q?.trim(),
    queryFn: () => {
      if (!clientCedentialToken) throw new Error("No Token available");

      return searchItemsByKeyword(clientCedentialToken, {
        ...params,
        limit: 20,
      });
    },
  });
};

export default useGetSearchResult;
