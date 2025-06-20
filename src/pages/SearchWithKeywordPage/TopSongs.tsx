import { Avatar, Box, styled, Typography } from "@mui/material";
import { Track } from "../../models/track";

const SongsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 2,
  borderRadius: "6px",
  justifyContent: "space-between",
  padding: "8px",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    cursor: "pointer",
  },
}));

interface TopSongsProps {
  items?: Track[];
}

const TopSongs = ({ items }: TopSongsProps) => {
  const formatDuration = (ms?: number) => {
    if (!ms) return "";
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Typography variant="h1">Songs</Typography>
      {items?.slice(0, 4).map((track) => (
        <SongsContainer key={track.id}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              component="img"
              src={track.album?.images[0].url}
              alt={track.name}
              sx={{ width: "40px", height: "40px", borderRadius: "6px" }}
            />
            <Box>
              <Typography variant="body2">{track.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {track.artists?.[0]?.name}
              </Typography>
            </Box>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {formatDuration(track.duration_ms)}
          </Typography>
        </SongsContainer>
      ))}
    </Box>
  );
};

export default TopSongs;
