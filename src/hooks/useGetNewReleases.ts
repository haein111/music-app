import { useQuery } from "@tanstack/react-query";
import { getNewReleases } from "../apis/albumapi";

const useGetNewReleases = () => {
  return useQuery({
    queryKey: ["new-releases"],
    queryFn: async () => {
      return getNewReleases();
    },
  });
};
