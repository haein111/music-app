import { useQuery } from "@tanstack/react-query";
import { getNewReleases } from "../apis/albumApi";
import useClientCredentialToken from "./useClientCredentialToken";

const useGetNewReleases = () => {
  const clientCedentialToken = useClientCredentialToken();
  return useQuery({
    queryKey: ["new-releases"],
    queryFn: async () => {
      if (!clientCedentialToken) {
        throw new Error("No token available");
      }
      return getNewReleases(clientCedentialToken);
    },
  });
};

export default useGetNewReleases;
