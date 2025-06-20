import { Artist } from "../../models/artist";
import { ApiResponse } from "../../models/apiResponse";
import { Box, Typography } from "@mui/material";
import ArtistCard from "./ArtistCard";

type ArtistsBoxProps = {
  artists?: ApiResponse<Artist>;
};

const ArtistsBox = ({ artists }: ArtistsBoxProps) => {
  return (
    <Box>
      <Typography variant="h1">Artists</Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        {artists?.items.slice(0, 8).map((artist) => {
          return <ArtistCard key={artist.id} artist={artist} />;
        })}
      </Box>
    </Box>
  );
};

export default ArtistsBox;
