import { Artist } from "../../models/artist";
import { ApiResponse } from "../../models/apiResponse";
import { Box, Grid, Typography } from "@mui/material";
import ArtistCard from "./ArtistCard";

type ArtistsBoxProps = {
  artists?: ApiResponse<Artist>;
};

const ArtistsBox = ({ artists }: ArtistsBoxProps) => {
  return (
    <Box>
      <Typography variant="h1">Artists</Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        {artists?.items.slice(0, 10).map((artist) => (
          <Grid key={artist.id} size={{ xs: 12, sm: 6, md: 3, lg: 2 }}>
            <ArtistCard key={artist.id} artist={artist} />
          </Grid>
        ))}
      </Box>
    </Box>
  );
};

export default ArtistsBox;
