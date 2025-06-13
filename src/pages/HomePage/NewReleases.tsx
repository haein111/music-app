import { Typography } from "@mui/material";
import React from "react";
import useGetNewReleases from "../../hooks/useGetNewReleases";
import LoadingSpinner from "../../common/components/LoadingSpinner";
import ErrorMessage from "../../common/components/ErrorMessage";
import Grid from "@mui/material/Grid";
import MuiCard from "../../common/components/Card";

const NewReleases = () => {
  const { data, error, isLoading } = useGetNewReleases();

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }

  return (
    <div>
      <Typography variant="h1" fontWeight={700} padding="8px">
        New Released Album
      </Typography>
      {data && data.albums.items.length > 0 ? (
        <Grid container spacing={2}>
          {data.albums.items.map((album) => (
            <Grid size={{ xs: 6, sm: 4, md: 2 }} key={album.id}>
              <MuiCard
                image={album.images[0].url}
                name={album.name}
                artistName={album.artists[0].name}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h2">No Data</Typography>
      )}
    </div>
  );
};

export default NewReleases;
