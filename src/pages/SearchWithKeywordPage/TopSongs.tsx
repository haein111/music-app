import { Avatar, Box, Typography } from "@mui/material";
import { Track } from "../../models/track";

interface TopSongsProps {
  items?: Track[];
}

const TopSongs = ({ items }: TopSongsProps) => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Typography variant="h1">Songs</Typography>
      </Box>
      {items?.slice(0, 4).map((track) => (
        <Box
          key={track.id}
          sx={{
            display: "flex",
            alignItems: "center",
            gab: 2,
            borderRadius: "6px",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Avatar src={track.album?.images[0].url} alt={track.name} />
          </Box>

          <Box>
            <Typography>{track.name}</Typography>
            <Typography>{track.artists?.[0]?.name}</Typography>
          </Box>
        </Box>
      ))}
    </>
  );
};

export default TopSongs;
