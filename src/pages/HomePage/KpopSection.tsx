import { Box, Grid, Typography } from "@mui/material";
import ErrorMessage from "../../common/components/ErrorMessage";
import LoadingSpinner from "../../common/components/LoadingSpinner";
import useSearchItemsByKeyword from "../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../models/search";
import Card from "../../common/components/Card";

const KpopSection = () => {
  const { data, error, isLoading } = useSearchItemsByKeyword({
    q: "genre: k-pop",
    type: [SEARCH_TYPE.Album],
    limit: 6,
    market: "KR",
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }

  const albums = data?.pages?.flatMap((page) => page.albums?.items || []) ?? [];

  return (
    <div>
      <Typography variant="h1" fontWeight={700} padding="8px">
        K-POP
      </Typography>

      {albums && albums.length > 0 ? (
        <Grid container spacing={2}>
          {albums.map((album) => (
            <Grid size={{ xs: 6, sm: 4, md: 2 }} key={album.id}>
              <Card
                image={album.images[0].url}
                name={album.name}
                artistName={album.artists[0].name}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No data</Typography>
      )}
    </div>
  );
};

export default KpopSection;
