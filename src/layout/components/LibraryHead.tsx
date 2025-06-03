import { Button, styled, Typography } from "@mui/material";
import React from "react";
import theme from "../../theme";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import AddIcon from "@mui/icons-material/Add";

const LibraryTitle = styled("div")({
  display: "flex",
  color: theme.palette.text.primary,
  alignItems: "center",
  padding: "8px",
  gap: "20px",
});

function LibraryHead() {
  const handleCreatePlaylist = () => {};

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
