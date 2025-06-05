import { Typography } from "@mui/material";
import React from "react";
import useGetNewReleases from "../../hooks/useGetNewReleases";

const NewReleases = () => {
  const { data, error, isLoading } = useGetNewReleases();

  console.log("Ddd", data);
  return (
    <div>
      <Typography variant="h1" paddingTop="8px">
        New Released Album
      </Typography>
    </div>
  );
};

export default NewReleases;
