import { Box, Typography } from "@mui/material";
import { Track } from "../../models/track";

interface TopResultsPops {
  item?: Track;
}

const TopResults = ({ item }: TopResultsPops) => {
  return (
    <Box>
      <Typography variant="h1">Top result</Typography>
      {item?.album?.images?.[0].url && (
        <Box sx={{ padding: "14px" }}>
          <Box
            component="img"
            src={item.album.images[0].url}
            alt={item.name}
            sx={{ width: "100px", my: "8px" }}
          />
          <Typography variant="h1" fontWeight="bold">
            {item?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Song • {item.artists?.[0]?.name}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default TopResults;
