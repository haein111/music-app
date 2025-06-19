import { useInfiniteQuery } from "@tanstack/react-query";
import useClientCredentialToken from "./useClientCredentialToken";
import { getSearchCategories } from "../apis/searchApi";

const useGetSearchCategories = () => {
  const clientCedentialToken = useClientCredentialToken();

  return useInfiniteQuery({
    queryKey: ["search-categories"],
    queryFn: ({ pageParam = 0 }) => {
      if (!clientCedentialToken) {
        throw new Error("No token available");
      }

      return getSearchCategories(clientCedentialToken, {
        locale: "ko_KR",
        limit: 18,
        offset: pageParam,
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage?.categories?.next) {
        const url = new URL(lastPage?.categories?.next);
        const nextOffset = url.searchParams.get("offset");
        return nextOffset ? parseInt(nextOffset) : undefined;
      }
      return undefined;
    },
  });
};

export default useGetSearchCategories;
