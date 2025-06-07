import { Box, styled } from "@mui/material";
import React from "react";
import LoginButton from "../../common/components/LoginButton";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Profile = styled("img")(({ theme }) => ({
  width: "40px",
  borderRadius: "50px",
  boxShadow: `0 0 0 8px ${theme.palette.action.hover}`,
}));

function Navbar() {
  const { data: userProfile } = useGetCurrentUserProfile();
  const imgUrl = userProfile?.images[0]?.url;
  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
      height="64px"
    >
      {!userProfile ? (
        <LoginButton />
      ) : imgUrl ? (
        <Profile src={imgUrl} alt="User profile image" />
      ) : (
        <AccountCircleIcon sx={{ width: "40px", height: "40px" }} />
      )}
    </Box>
  );
}

export default Navbar;
