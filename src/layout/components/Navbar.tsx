import { Box, ListItemIcon, Menu, MenuItem, styled } from "@mui/material";
import React, { useState } from "react";
import LoginButton from "../../common/components/LoginButton";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import useUserLogout from "../../hooks/useUserLogout";

const Profile = styled("img")(({ theme }) => ({
  margin: "6px",
  width: "40px",
  borderRadius: "50px",
  boxShadow: `0 0 0 8px ${theme.palette.action.hover}`,
}));

function Navbar() {
  const { data: userProfile } = useGetCurrentUserProfile();
  const imgUrl = userProfile?.images[0]?.url;

  const logout = useUserLogout();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // null 또는 HTML Element
  const open = Boolean(anchorEl);

  const openMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget); // 클릭한 html 요소 저장
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
      height="64px"
    >
      {userProfile ? (
        <>
          {imgUrl ? (
            <Profile onClick={openMenu} src={imgUrl} alt="User profile image" />
          ) : (
            <AccountCircleIcon sx={{ width: "40px", height: "40px" }} />
          )}

          <Menu anchorEl={anchorEl} open={open} onClose={closeMenu}>
            <MenuItem onClick={logout}>
              <ListItemIcon sx={{ color: "white" }}>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Log out
            </MenuItem>
          </Menu>
        </>
      ) : (
        <LoginButton />
      )}
    </Box>
  );
}

export default Navbar;
