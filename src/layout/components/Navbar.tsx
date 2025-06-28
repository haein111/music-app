import {
  Box,
  InputBase,
  ListItemIcon,
  Menu,
  MenuItem,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import LoginButton from "../../common/components/LoginButton";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import useUserLogout from "../../hooks/useUserLogout";
import { useNavigate } from "react-router";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation } from "react-router-dom";

const SearchBox = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "300px",
  margin: "8px",
  alignItems: "center",
  backgroundColor: theme.palette.action.active,
  borderRadius: "8px",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "transparent",
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.dark,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
}));

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

  // Search

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const navigate = useNavigate();

  const location = useLocation();
  const isSearchPage = location.pathname.startsWith("/search"); // check if it is search page

  // debouncing search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const trimmed = debouncedSearch.trim();

    if (location.pathname.startsWith("/search")) {
      if (trimmed) {
        navigate(`/search/${encodeURIComponent(trimmed)}`); // safely encode non-English characters and spaces in URLs
      } else {
        // if keyword is empty, redirect to home page
        navigate("/search", { replace: true });
      }
    }
  }, [debouncedSearch, navigate, location.pathname]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // null or HTML Element
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
      {isSearchPage ? (
        <SearchBox>
          <SearchIcon sx={{ margin: "4px" }} />
          <InputBase
            placeholder={"What do you want to play?"}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </SearchBox>
      ) : (
        <Box sx={{ width: 300, height: 40 }} />
      )}
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
