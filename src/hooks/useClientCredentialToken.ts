import { useQuery } from "@tanstack/react-query";
import { getClientCredentialTodken } from "../apis/authApi";

const useClientCredentialToken = (): string | undefined => {
  const { data } = useQuery({
    queryKey: ["client-credential-token"],
    queryFn: getClientCredentialTodken,
  });

  const clientCedentialToken = data?.access_token;
  return clientCedentialToken;
};

export default useClientCredentialToken;
