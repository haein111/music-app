import { styled, Box, Typography, Button } from "@mui/material";
import React from "react";
import theme from "../../theme";

const CreatePlaylist = styled(Box)(({ theme }) => ({
  borderRadius: "8px",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  width: "90%",
  padding: "16px",
  margin: "auto",
  marginBottom: "8px",
}));

const CreatePlaylistButton = styled(Button)({
  fontWeight: "700",
});

function EmptyPlaylist() {
  return (
    <CreatePlaylist>
      <Typography variant="h2" fontWeight={700}>
        Create your first playlist
      </Typography>
      <Typography variant="body2" fontWeight={500} sx={{ marginBottom: 2 }}>
        It's easy, We'll help you
      </Typography>
      <CreatePlaylistButton variant="contained" color="secondary">
        Create palylist
      </CreatePlaylistButton>
    </CreatePlaylist>
  );
}

export default EmptyPlaylist;
