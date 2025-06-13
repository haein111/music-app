import { Box, Typography } from "@mui/material";
import { isAxiosError } from "axios";
import LoginButton from "../../common/components/LoginButton";

interface Props {
  error: unknown;
}

const ErrorHandler = ({ error }: Props) => {
  if (isAxiosError(error)) {
    if (error.response?.status === 401) {
      console.log("401 Unauthorized - 로그인 필요");
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          height="100%"
        >
          <Typography variant="h2" fontWeight="bold" mb={2}>
            다시 로그인 하세요
          </Typography>
          <LoginButton />
        </Box>
      );
    }
  }

  return <Typography>오류가 발생했습니다.</Typography>;
};

export default ErrorHandler;
