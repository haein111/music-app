import { Button, styled, Typography } from "@mui/material";
import React from "react";
import theme from "../../theme";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import AddIcon from "@mui/icons-material/Add";
import useCreatePlaylist from "../../hooks/useCreatePlaylist";
import { getSpotifyAuthUrl } from "../../utils/auth";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";

const LibraryTitle = styled("div")({
  display: "flex",
  color: theme.palette.text.primary,
  alignItems: "center",
  padding: "4px",
  gap: "10px",
});

function LibraryHead() {
  const { mutate: createPlaylist } = useCreatePlaylist();
  const { data: userProfile } = useGetCurrentUserProfile();
  const handleCreatePlaylist = () => {
    if (userProfile) {
      createPlaylist({
        name: "New Playlist",
      });
    } else {
      getSpotifyAuthUrl();
    }
  };

  return (
    <LibraryTitle>
      <BookmarkIcon />
      <Typography variant="h2" fontWeight={700}>
        Your Library
      </Typography>
      <Button onClick={handleCreatePlaylist}>
        <AddIcon sx={{ color: "primary.main" }} />
      </Button>
    </LibraryTitle>
  );
}

export default LibraryHead;
