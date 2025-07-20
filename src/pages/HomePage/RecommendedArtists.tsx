import { Box, Grid, Typography } from "@mui/material";
import ErrorMessage from "../../common/components/ErrorMessage";
import LoadingSpinner from "../../common/components/LoadingSpinner";
import useSearchItemsByKeyword from "../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../models/search";
import Card from "../../common/components/Card";
import ArtistCard from "../SearchWithKeywordPage/ArtistCard";

const RecommendedArtists = () => {
  const { data, error, isLoading } = useSearchItemsByKeyword({
    q: "genre: k-pop",
    type: [SEARCH_TYPE.Artist],
    limit: 6,
    market: "KR",
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }

  const artists =
    data?.pages?.flatMap((page) => page.artists?.items || []) ?? [];
  return (
    <div>
      <Typography variant="h1" fontWeight={700} padding="8px">
        Recommended Artists
      </Typography>

      {artists && artists.length > 0 ? (
        <Grid container spacing={2}>
          {artists.map((artist) => (
            <Grid size={{ xs: 6, sm: 4, md: 2 }} key={artist.id}>
              <ArtistCard artist={artist} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No data</Typography>
      )}
    </div>
  );
};

export default RecommendedArtists;
